import { Schema, model, mongo } from "mongoose";

const notificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["like", "comment", "reply"],
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    notification_for: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    reply: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    replied_on_comment: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = model("notification", notificationSchema);
