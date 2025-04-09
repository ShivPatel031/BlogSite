import { Post } from "../Models/post.model.js";
import { User } from "../Models/user.model.js";
import { uploadImage } from "../Utility/cloudinary.js";
import { publishEvnet } from "../Utility/rabbitmq.js";
import { Res } from "../Utility/response.js";
import { validateCreatePost } from "../Utility/validation.js";
import fs from "fs";
const maxLimit = 5;

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
  const { page, tag } = req.body;
  const skip = ((page || 1) - 1) * maxLimit;
  let documentCount = 0;

  try {
    // todo:- add pagination
    let posts;

    if (tag) {
      posts = await Post.find({
        status: "published",
        tags: { $in: tag },
      })
        .sort({ createdAt: -1 })
        .populate("userId", "userName userImage")
        .exec();

      documentCount = await Post.countDocuments({
        status: "published",
        tags: { $in: tag },
      });
    } else {
      posts = await Post.find({ status: "published" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(maxLimit)
        .populate("userId", "userName userImage")
        .exec();

      documentCount = await Post.countDocuments({
        status: "published",
      });
    }

    console.log(documentCount);

    return res.status(200).json(
      new Res(true, "Post found", {
        posts: posts.length ? posts : [],
        documentCount,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(new Res(false, "something went wrong while getting all posts"));
  }
}

export async function getTandingPosts(req, res) {
  try {
    // todo:- add pagination
    const posts = await Post.find({ status: "published" })
      .limit(maxLimit)
      .sort({ createdAt: -1, views: -1 })
      .populate("userId", "userName userImage")
      .exec();

    return res
      .status(200)
      .json(new Res(true, "Post found", posts.length ? posts : []));
  } catch (error) {
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

    // todo :- increase view count on that post

    const post = await Post.find({ slug })
      .populate("userId", "userName userImage")
      .exec();

    if (!post) {
      return res.status(500).json(new Res(true, "No post found"));
    }
    return res.status(200).json(new Res(true, "found post.", post[0]));
  } catch (error) {
    return res
      .status(500)
      .json(new Res(false, "Something went wrong while getting single post."));
  }
}

export async function searchPosts(req, res) {
  const searchQuery = req.body.search;

  if (!searchQuery)
    return res.status(404).json(new Res(false, "Search key word is missing."));
  try {
    const blogs = await Post.find({
      title: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
    })
      .populate("userId", "userName userImage")
      .exec();

    return res
      .status(200)
      .json(new Res(true, "Fond blogs", blogs.length ? blogs : []));
  } catch (error) {
    return res.status(500).json(new Res(false, "Error in seraching blog."));
  }
}

export async function addLike(req, res) {
  try {
    const { userId, blogId } = req.body;

    if (!userId || !blogId)
      return res.status(404).json(new Res(false, "Require data not found."));

    const blog = await Post.findById(blogId);

    if (!blog) {
      return res.status(500).json(new Res(false, "Blog not found."));
    }

    blog.likes.push(userId);

    await blog.save();

    return res.status(200).json(new Res(true, "Blog liked successfully."));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new Res(false, error.message));
  }
}

export async function removeLike(req, res) {
  try {
    const { userId, blogId } = req.body;
    if (!userId || !blogId)
      return res.status(404).json(new Res(false, "Require data not found."));

    const blog = await Post.findById(blogId);

    if (!blog) {
      return res.status(500).json(new Res(false, "Blog not found."));
    }

    blog.likes.pull(userId);

    await blog.save();

    return res.status(200).json(new Res(true, "Blog liked successfully."));
  } catch (error) {
    return res.status(500).json(new Res(false, error.message));
  }
}
