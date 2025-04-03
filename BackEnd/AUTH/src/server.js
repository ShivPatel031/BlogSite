import { config } from "dotenv";
config();
import express from "express";
import helmet from "helmet";
import Redis from "ioredis";

import { logger } from "./Utility/logger.js";
import { corsConfiguration } from "./Middleware/corsConfiguration.js";
import { DDoSProtection } from "./Middleware/redisLimiter.js";
import {
  LoginRateLimiter,
  RegisterRateLimiter,
} from "./Middleware/requestRateLimiter.js";
import { connectDB } from "./Utility/connectDB.js";
import authRouter from "./Routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { connectToRabbitMQ, consumeEvent } from "./Utility/rabbitmq.js";
import { addPostIdtoUserData } from "./EventHandler/PostCreated.js";

const app = express();
const PORT = process.env.PORT || 3001;

const redisClient = new Redis(process.env.REDIS_URL);

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url} by ${req.ip}`);
  next();
});

app.use(helmet());
app.use(corsConfiguration());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DDoS protection 20 points in 10 sec
app.use(DDoSProtection(redisClient, 50, 10));

// limit request on express register route by 5 req per 30 min per id
// app.use("/api/auth/register", RegisterRateLimiter(redisClient, 5, 30));

// limit request on express register route by 10 req per 30 min per id
// for test it is 20 req
// app.use("/api/auth/login", LoginRateLimiter(redisClient, 20, 30));

app.use("/api/auth", authRouter);

(async () => {
  try {
    await connectToRabbitMQ();
    connectDB();

    await consumeEvent("new.postId",addPostIdtoUserData);

    app.listen(PORT, () => {
      logger.info(`Post search service is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(
      "Something  went wrong while connecting to RabbitMQ and starting or server."
    );
  }
})();

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejectio at ${promise} reason: ${reason}`);
});
