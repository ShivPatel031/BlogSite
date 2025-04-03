import mongoose from "mongoose";
import { logger } from "../Utility/logger.js";
import { User } from "../Models/user.model.js";

export const addPostIdtoUserData = async (Ids) => {
  logger.info("Post created after work endpoint hit..");
  try {
    if (
      !mongoose.isValidObjectId(Ids.userId) ||
      !mongoose.isValidObjectId(Ids.businessId)
    ) {
      logger.error(`error because of getting incorrect data`);
      return;
    }

    const user = await User.findById(Ids.userId);

    if (!user) {
      logger.error("user not found");
    }

    user.posts.push(Ids.businessId);

    await user.save();
  } catch (error) {
    logger.error(`Something went wrong while handle event ${error.message}`);
  }
};
