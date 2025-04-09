import { Comment } from "../Models/Comment.js";
import { Notification } from "../Models/Notification.js";
import { Post } from "../Models/post.model.js";
import { Res } from "../Utility/response.js";

const maxLimit = 5;

export async function addComment(req, res) {
  const { blogId, comment, replyingTo, userId, blogAuthorId, commentLevel } =
    req.body;

  if (!blogId || !comment || !userId || !blogAuthorId || !commentLevel) {
    return res
      .status(404)
      .json(new Res(false, "not all Required fields is present."));
  }
  try {
    let newCommentData = {
      commentLevel,
      blogId,
      blogAuthorId,
      comment,
      userId,
    };
    if (replyingTo) {
      newCommentData.isReply = true;
      newCommentData.parent = replyingTo;
    }

    let newComment = await Comment.create(newCommentData);

    if (replyingTo) {
      const parentComment = await Comment.findById(replyingTo);

      parentComment.children.push(newComment._id);

      await parentComment.save();
    } else {
      const blog = await Post.findByIdAndUpdate(
        blogId,
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );
    }

    const notification = {
      type: replyingTo ? "reply" : "comment",
      blog: blogId,
      notification_for: blogAuthorId,
      user: userId,
      comment: newComment._id,
    };

    const nf = await Notification.create(notification);

    newComment = await Comment.findById(newComment._id).populate(
      "userId",
      "userImage userName"
    );

    return res
      .status(200)
      .json(new Res(true, "Comment add successfully.", newComment));
  } catch (error) {
    return res.status(200).json(new Res(false, error.message));
  }
}

export async function getLatestComments(req, res) {
  const { page = 1, commentLevel = 1, blogId, replyingTo } = req.body;
  const skip = (page - 1) * maxLimit;
  let totalComments = 0;
  let comments = [];
  try {
    let query = { commentLevel, blogId };
    if (replyingTo) {
      query.parent = replyingTo;
    }
    comments = await Comment.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(maxLimit)
      .populate("userId", "userImage userName");

    totalComments = await Comment.countDocuments(query);

    return res
      .status(200)
      .json(new Res(true, "Comment found.", { comments, totalComments }));
  } catch (error) {
    return res.status(500).json(new Res(false, error.message));
  }
}
