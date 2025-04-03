import { Post } from "../Models/post.model.js";
import { User } from "../Models/user.model.js";
import { uploadImage } from "../Utility/cloudinary.js";
import { publishEvnet } from "../Utility/rabbitmq.js";
import { Res } from "../Utility/response.js";
import { validateCreatePost } from "../Utility/validation.js";
import fs from "fs";

export async function createPost(req, res) {
  const { error } = validateCreatePost(req.body);

  if (error) return res.status(404).json({ error: error.message });

  try {
    req.body.is_featured = req.body.is_featured == "true" ? true : false;

    const postImage = await uploadImage(req.file);

    const post = await Post.create({
      userId: req.user.userId,
      ...req.body,
      imageUrl: postImage.secure_url,
      image_publicId: postImage.public_id,
    });

    const event = {
      title: post.title,
      slug: post.slug,
      authorId: req.user.userId,
      postId: post._id,
      authorName: req.user.userName,
      tags: post.tags,
      imageUrl: post.imageUrl,
    };

    publishEvnet("new.post", event);
    publishEvnet("new.postId", {
      userId: req.user.userId,
      businessId: post._id,
    });

    return res
      .status(200)
      .json({ success: true, message: "Post created successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while creating Post",
      error: error.message,
    });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
}

export async function getAllLatestPosts(req, res) {
  try {
    // todo:- add pagination
    const posts = await Post.find({ status: "published" })
      .sort({ createdAt: -1 })
      .populate("userId", "userName userImage")
      .exec();

    return res
      .status(200)
      .json(new Res(true, "Post found", posts.length ? posts : []));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new Res(false, "something went wrong while getting all posts"));
  }
}

export async function getTandingPosts(req, res) {
  try {
    // todo:- add pagination
    const posts = await Post.find({ status: "published" })
      .sort({ createdAt: -1, views: -1 })
      .populate("userId", "userName userImage")
      .exec();

    console.log(posts);

    return res
      .status(200)
      .json(new Res(true, "Post found", posts.length ? posts : []));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new Res(false, "something went wrong while getting all posts"));
  }
}

export async function getSinglePost(req, res) {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(404).json(new Res(true, "No slug found"));
    }

    const post = await Post.find({ slug });

    if (!post) {
      return res.status(500).json(new Res(true, "No post found"));
    }
    console.log(post);
    return res.status(200).json(new Res(true, "found post.", post[0]));
  } catch (error) {
    return res
      .status(500)
      .json(new Res(false, "Something went wrong while getting single post."));
  }
}
