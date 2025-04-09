import { Res } from "../Utility/response.js";
import Proxy from "express-http-proxy";
import { config } from "dotenv";
import { logger } from "../Utility/logger.js";
config();

const comonProxyOption = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace("api/v1", "api");
  },
  proxyErrorHandler: (err, res, next) => {
    logger.error(`Proxy error: ${err.message}`);

    res.status(500).json(new Res(false, "Proxy Error"));
  },
};

// auth service proxy setup
export function authProxy() {
  return Proxy(process.env.AUTH_SERVICE_URL, {
    ...comonProxyOption,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // proxyReqOpts.headers["Content-Type"] = "application/json";

      return proxyReqOpts;
    },
    // Ensure the request body is forwarded as a stream
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      return bodyContent; // Pass the raw body through unchanged
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Auth service : ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  });
}

export function postMangemnetProxy() {
  return Proxy(process.env.POST_MANAGMENT_SERVICE_URL, {
    ...comonProxyOption,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // proxyReqOpts.headers["Content-Type"] = "multipart/form-data";
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      proxyReqOpts.headers["x-user-name"] = srcReq.user.userName

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from post management service: ${proxyRes.statusCode} `
      );
      return proxyResData;
    },
  });
}
