import { Router } from "express";
import {
  addLike,
  createPost,
  getAllLatestPosts,
  getSinglePost,
  getTandingPosts,
  removeLike,
  searchPosts,
} from "../Controllers/posts.controllers.js";
import { upload } from "../Middleware/multerConfig.js";

const router = Router();

router.post("/create-post", upload.single("image"), createPost);

router.post("/get-latest-posts", getAllLatestPosts);

router.get("/get-tranding-posts", getTandingPosts);

router.get("/get-single-posts/:slug", getSinglePost);

router.post("/get-search-posts", searchPosts);

router.post("/add-like", addLike);
router.post("/remove-like", removeLike);

export default router;
