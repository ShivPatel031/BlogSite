import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {varifyJWT} from "../middlewares/auth.middlewares.js";
import { loginUser,logoutUser,registerUser,authUser ,addUserPost} from "../controllers/user.controllers.js";
import multer from "multer";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(varifyJWT,logoutUser);

router.route("/authUser").post(varifyJWT,authUser);

router.route("/add-post").post(
    upload.single("image"),
    varifyJWT,
    addUserPost
);



export  default router