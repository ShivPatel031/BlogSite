import cors from "cors";
import { config } from "dotenv";
config();

const corsConfiguration = () => {
  return cors({
    // origin -> this will tell that which origin you want user can access your api
    origin: (origin, callback) => {
      const allowedOrigins = [`${process.env.FRONT_END_URL}`];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, // enable cookies/headers support
    preflightContinue: false,
    maxAge: 600, // cache pre flight response for 10 min (600 seconds)-> avoid sending options requests multiple times,
  });
};

export { corsConfiguration };
