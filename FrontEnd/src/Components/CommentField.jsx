import { useState } from "react";
import toast from "react-hot-toast";
import { blogStore } from "../Stores/blogStore";
import { authStore } from "../Stores/authStore";

export function CommentField({
  action,
  level = 1,
  replyingTo,
  handleAddComment,
}) {
  const [comment, setComment] = useState("");
  const { selectedBlog } = blogStore();
  const { user } = authStore();
  const handleComment = () => {
    if (!comment) {
      toast.error("Please leave a comment first.");
      return;
    }

    const data = {
      blogId: selectedBlog._id,
      comment,
      userId: user._id,
      blogAuthorId: selectedBlog.userId._id,
      commentLevel: level,
      replyingTo,
    };

    handleAddComment(data);
    setComment("");
  };

  return (
    <>
      <div className="flex flex-col items-start">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="w-full rounded-lg pt-5 px-5 placeholder:text-gray-700  resize-none h-[150px] overflow-auto bg-gray-200 outline-purple-300 focus:bg-gray-100"
        ></textarea>
        <button
          className="bg-black text-white rounded-full px-5 py-2 mt-5 capitalize cursor-pointer"
          onClick={handleComment}
        >
          {action}
        </button>
      </div>
    </>
  );
}
