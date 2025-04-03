import { Router } from "express";
import {
  createPost,
  getAllLatestPosts,
  getSinglePost,
  getTandingPosts,
} from "../Controllers/posts.controllers.js";
import { upload } from "../Middleware/multerConfig.js";

const router = Router();

router.post("/create-post", upload.single("image"), createPost);

router.get("/get-latest-posts", getAllLatestPosts);

router.get("/get-tranding-posts", getTandingPosts);

router.get("/get-single-post/:slug", getSinglePost);

export default router;
