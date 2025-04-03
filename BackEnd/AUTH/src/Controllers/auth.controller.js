import { User } from "../Models/user.model.js";
import { generateAccessAndRefreshTokens } from "../Utility/generateToken.js";
import { logger } from "../Utility/logger.js";
import { Res } from "../Utility/response.js";
import { validateLogin, validateRegistration } from "../Utility/validation.js";
import jwt from "jsonwebtoken";

export async function userRegister(req, res) {
  logger.info(`Register End Point Hit by IP : ${req.ip}`);

  const { error } = validateRegistration(req.body);

  if (error) {
    logger.warn(`Registeration Validation Error : ${error}`);

    return res
      .status(404)
      .json(new Res(false, `Registeration Validation Error : ${error}`));
  }

  try {
    const { userName, email, password } = req.body;

    const exsitedUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (exsitedUser) {
      logger.warn("User already exist");

      return res.status(404).json(new Res(false, `User already exist`));
    }

    const user = await User.create({ userName, email, password });

    if (!user) {
      logger.warn("Something went wrong while creating user");

      return res
        .status(500)
        .json(new Res(false, `Something went wrong while creating user`));
    }

    // todo :- send email varification

    return res
      .status(200)
      .json(new Res(true, "User Created Successfully", user));
  } catch (error) {
    logger.error(`Error in user login ${error.message}`);
    return res
      .status(500)
      .json(new Res(false, "Error in user login", error.message));
  }
}

export async function userLogin(req, res) {
  logger.info(`Login end point hit by IP : ${req.ip}`);

  const { error } = validateLogin(req.body);

  if (error) {
    logger.warn(`Login Validation Error : ${error}`);

    return res
      .status(404)
      .json(new Res(false, `Login Validation Error : ${error}`));
  }

  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      logger.error(`user not found`);

      return res.status(404).json(new Res(false, "User not found"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      logger.error(`Password not matched`);

      return res.status(404).json(new Res(false, "Password not matched"));
    }

    const tokens = await generateAccessAndRefreshTokens(user);

    if (!tokens) {
      logger.warn("Something went wrong while generating token");

      return res
        .status(500)
        .json(new Res(false, "Something went wrong while generating token"));
    }

    user.password = null;
    user.refreshToken = null;

    const { accessToken, refreshToken } = tokens;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res
      .status(200)
      .json(
        new Res(true, "User Logged in successfully", { user, accessToken })
      );
  } catch (error) {
    logger.error(`Error in user registeration ${error.message}`);

    return res
      .status(500)
      .json(new Res(false, "Error in user registeration", error.message));
  }
}

export async function userLogout(req, res) {
  logger.info("Logout end point hit");
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(404)
      .json(new Res(true, "Token not found, user is already logout"));
  }

  try {
    const decode = await jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (!decode) {
      return res
        .status(404)
        .json(new Res(false, "Token is expired, user is already logout"));
    }

    const user = await User.findById(decode._id);

    if (!user) {
      logger.error(`user not found`);

      return res.status(404).json(new Res(false, "User not found"));
    }

    user.refreshToken = null;

    await user.save();

    return res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .status(200)
      .json(new Res(true, "Logout successfull"));
  } catch (error) {
    logger.error(`Error while logout ${error.message}`);

    return res
      .status(500)
      .json(new Res(false, `Error while logout ${error.message}`));
  }
}

export async function refreshAccessToken(req, res) {

  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(404)
      .json(new Res(true, "Token not found, user is already logout"));
  }

  try {
    const decode = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );

    if (!decode) {
      return res
        .status(404)
        .json(new Res(false, "Token is expired, user is already logout"));
    }

    const user = await User.findById(decode._id);

    if (!user) {
      logger.error(`user not found`);

      return res.status(404).json(new Res(false, "User not found"));
    }

    const tokens = await generateAccessAndRefreshTokens(user);

    if (!tokens) {
      logger.warn("Something went wrong while generating token");

      return res
        .status(500)
        .json(new Res(false, "Something went wrong while generating token"));
    }

    user.password = null;
    user.refreshToken = null;

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json(
      new Res(true, "Access Token refreshed successfully", {
        user,
        accessToken: tokens.accessToken,
      })
    );
  } catch (error) {
    logger.error(`Error in refresh AccessToken ${error.message}`);

    return res
      .status(500)
      .json(new Res(false, "Error in refresh AccessToken", error.message));
  }
}
