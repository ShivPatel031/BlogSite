import { Router } from "express";
import { getPosts ,getSinglePost, updatePost,deletePost, likedPost, getLikes, disLikePost} from "../controllers/post.controllers.js";
import { varifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/get-posts").get(getPosts);

router.route("/single-post/:Id").get(getSinglePost);

router.route("/update-post").post(upload.single("image"),updatePost);

router.route("/delete-post/:Id").get(deletePost);

router.route("/like-post").post(likedPost);

router.post('/get-likes',getLikes);

router.get('/dislike/:id',disLikePost);

export  default router