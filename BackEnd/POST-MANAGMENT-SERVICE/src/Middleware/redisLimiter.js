import { RateLimiterRedis } from "rate-limiter-flexible";
import { logger } from "../Utility/logger.js";
import { Res } from "../Utility/response.js";

export function DDoSProtection(redisClient, points = 20, duration = 5) {
  return (req, res, next) => {
    const rateLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "middleware",
      points,
      duration,
    });

    rateLimiter.consume(req.ip).then(()=>next()).catch(()=>{
        logger.warn(`Rate limit exceede for IP : ${req.ip}`);
        res.status(429).json(new Res(false,"Too many Request"))
    })
  };
}
