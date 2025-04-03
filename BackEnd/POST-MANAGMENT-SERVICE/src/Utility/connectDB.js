import mongoose from "mongoose";
import { config } from "dotenv";
import { logger } from "./logger.js";
config();

const connectDB = async () => {
  try {
    const host = await mongoose.connect(`${process.env.MONGOODB_URL}`);

    logger.info("Connected to MangooDB");
  } catch (error) {
    logger.error(`Mongo connection error ${error}`);
  }
};

export { connectDB };
