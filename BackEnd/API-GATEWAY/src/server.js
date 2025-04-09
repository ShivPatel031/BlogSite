import { config } from "dotenv";
config();
import express from "express";
import helmet from "helmet";

import { logger } from "./Utility/logger.js";
import { errorHandler } from "./Middleware/errorHandler.js";
import { corsConfiguration } from "./Middleware/corsConfiguration.js";
import { RateLimiter } from "./Middleware/requestRateLimiter.js";
import { urlVersioning } from "./Middleware/apiVersioning.js";
import { authProxy, postMangemnetProxy } from "./Middleware/proxyHandler.js";
import { validatetoken } from "./Middleware/auth.middleware.js";

const app = express();

const PORT = process.env.PORT || 3000;

// log every comming request
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url} by ${req.ip}`);
  next();
});

// add some importent headers for security
app.use(helmet());

// cors configuration
app.use(corsConfiguration());

// put request limiting per ip (50 req in 15 min for per ip/user)
// app.use(RateLimiter(50, 15));

// app.use(express.json());

// api version checking
app.use(urlVersioning("v1"));


// app.use(express.urlencoded({ extended: true }));

// auth servise proxy
app.use("/api/v1/auth", authProxy());

app.use("/api/v1/posts",validatetoken,postMangemnetProxy());

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`API GateWay is running on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejectio at ${promise} reason: ${reason}`);
});
