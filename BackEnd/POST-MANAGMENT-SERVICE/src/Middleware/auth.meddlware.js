import { logger } from "../Utility/logger.js";
import { Res } from "../Utility/response.js";

const authenticateRequest = (req, res, next) => {
  const userId = req.headers["x-user-id"];
  const userName = req.headers["x-user-name"]

  if (!userId || !userName) {
    logger.warn(`Access attempted without user ID`);

    return res
      .status(404)
      .json(new Res(false, "Access attempted without user ID"));
  }

  req.user = { userId ,userName};

  next();
};

export { authenticateRequest };
