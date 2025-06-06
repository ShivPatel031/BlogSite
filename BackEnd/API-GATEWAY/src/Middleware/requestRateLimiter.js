import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { Redis } from "ioredis";
import { Res } from "../utility/response.js";
import { config } from "dotenv";
import { logger } from "../Utility/logger.js";
config();

const redisClient = new Redis(process.env.REDIS_URL);

const RateLimiter = (maxRequest = 50, time = 10) => {
  return rateLimit({
    max: maxRequest,
    windowMs: time * 60 * 1000,
    // message: "Too many request,please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn(`Sensitive endpoint rate limit exceede for IP : ${req.ip}`);
      res
        .status(429)
        .json(new Res(false, "Too many request,please try again later"));
    },
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),
  });
};

export { RateLimiter };
