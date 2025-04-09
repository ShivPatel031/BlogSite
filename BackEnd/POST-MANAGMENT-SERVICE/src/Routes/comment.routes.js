import { Router } from "express";
import { addComment, getLatestComments } from "../Controllers/comment.controllers.js";

const router = Router();

router.post("/add-comment", addComment);

router.post("/get-latest-comments", getLatestComments);

export default router;
