import { Router } from "express";
import { getPosts ,getSinglePost, updatePost,deletePost, likedPost, disLikePost} from "../controllers/post.controllers.js";
import { varifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { emailVarified } from "../middlewares/emailVarification.middleware.js";

const router = Router();

router.route("/get-posts").get(varifyJWT,getPosts);

router.route("/single-post/:Id").get(varifyJWT,getSinglePost);

router.route("/update-post").post(upload.single("image"),varifyJWT,emailVarified,updatePost);

router.route("/delete-post/:Id").get(varifyJWT,emailVarified,deletePost);

router.route("/like-post").post(varifyJWT,emailVarified,likedPost);

router.post('/dislike',varifyJWT,emailVarified,disLikePost);

export  default router