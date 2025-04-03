import { asynchandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { verifyEmail } from "../utils/NodeMailer.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    if (!userId)
      throw new ApiError(500, "Did not get user id to genrate tokens");

    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating user tokens"
    );
  }
};

const verifyUserEmail = async (req, res) => {
  const { token } = req.params;

  try {
    if (!token) {
      return res.status(400).json({
        message: "Token not available",
      });
    }

    let verified_token;

    try {
      verified_token = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({
        message: "Token not valid",
      });
    }

    const email = verified_token.data?.email;
    const Id = verified_token.data?.Id;

    if (!email) {
      return res.status(400).json({
        message: "Token does not contain a valid email",
      });
    }

    const user = await User.findById(Id);

    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "User not found" });

    if (user.emailVarification)
      return res
        .status(404)
        .json({ success: false, message: "Email is already varified." });

    user.emailVarification = true;

    await user.save();

    // Redirect to login page at frontend
    return res.status(200).json({success:true,message:"message varified successfully."});
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const registerUser = asynchandler(async (req, res) => {
  const { name, password, email } = req.body;

  const userName = name;

  if (!userName || !password || !email)
    throw new ApiError(401, "all user field are required");

  const exsitedUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (exsitedUser)
    throw new ApiError(401, "User Name and email is already exist");

  const user = await User.create({
    userName: userName,
    password,
    email,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(500, "somethig went wrong while creating user");

  verifyEmail({
    email: createdUser.email,
    Id: createdUser._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User regestred successfully"));
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(401, "User name and password are required");

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "user does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(400, "invalid user password");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expiresIn: "6h",
  };

  return res
    .status(200)
    .cookie("accessToken", JSON.stringify(accessToken), option)
    .cookie("refreshToken", JSON.stringify(refreshToken), option)
    .json(
      new ApiResponse(200, { user: loggedInUser }, "User logged in succesfully")
    );
});

const logoutUser = asynchandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const authUser = asynchandler(async (req, res) => {
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    req.user._id
  );

  const option = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", JSON.stringify(accessToken), option)
    .cookie("refreshToken", JSON.stringify(refreshToken), option)
    .json(new ApiResponse(200, req.user, "User logged in succesfully"));
});

const addUserPost = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken -email -userName"
  );

  if (!user) throw new ApiError(400, "User Not found whilt adding post");

  const { title, slug, content, status, image } = await req.body;

  if (!title || !slug || !content || !status)
    throw ApiError(400, "All fields are required");

  const coverImagePath = await req.file?.path;

  if (!coverImagePath) throw new ApiError(400, "No image found");

  const coverImageUrl = await uploadOnCloudinary(coverImagePath);

  if (!coverImageUrl)
    throw new ApiError(
      500,
      "something went wrong while  uploading image in cloudinary"
    );

  const post = await Post.create({
    user: user._id,
    content: content,
    coverImage: coverImageUrl?.url,
    title: title,
    slug: slug,
    status: status == "active",
    cloudinaryId: coverImageUrl.public_id,
  });

  const postData = await Post.findById(post._id);


  if (!postData)
    throw new ApiError(500, "some thing went wrong while adding post");

  user.post.push(postData._id);

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, postData, "Post is added successfully"));
});

const resendEmailVarification = async (req,res)=>{
    try {
        verifyEmail({
            email: req.user.email,
            Id: req.user._id,
          });

          return res.status(200).json({success:true,message:"varification email sent successfully."});
    } catch (error) {
        return res.status(500).json({success:false,message:"Something went wrong while sending varification email"})
    }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  authUser,
  addUserPost,
  verifyUserEmail,
  resendEmailVarification
};
