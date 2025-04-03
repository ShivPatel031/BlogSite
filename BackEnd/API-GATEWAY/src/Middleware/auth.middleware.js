import { logger } from "../Utility/logger.js";
import { Res } from "../Utility/response.js";
import jwt from "jsonwebtoken";

const validatetoken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    logger.warn(`Access attempted without token`);

    return res
      .status(404)
      .json(new Res(false, `Access attempted without token`));
  }


  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn("invalid token!");
      return res.status(429).json(new Res(false, "Invalid token!"));
    }
    req.user = user;
    next();
  });
};

export { validatetoken };
