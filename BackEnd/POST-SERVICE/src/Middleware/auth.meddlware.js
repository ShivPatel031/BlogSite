import { logger } from "../Utility/logger.js";
import { Res } from "../Utility/response.js";

const authenticateRequest = (req, res, next) => {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    logger.warn(`Access attempted without user ID`);

    return res
      .status(404)
      .json(new Res(false, "Access attempted without user ID"));
  }

  req.user = { userId };

  next();
};

export { authenticateRequest };
