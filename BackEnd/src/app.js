import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js'
import postRouter from "./routes/post.routes.js"
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/posts",postRouter);

export {app}