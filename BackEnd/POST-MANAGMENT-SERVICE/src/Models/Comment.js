import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    blogAuthorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    children: {
      type: [Schema.Types.ObjectId],
      ref: "Comments",
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    isReply: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    commentLevel: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = model("Comments", commentSchema);
