import { Heart, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { blogStore } from "../Stores/blogStore";
import { authStore } from "../Stores/authStore";

export function BlogInteraction({ data, setCommentWrapper }) {
  const { selectedBlog, addLike, removeLike } = blogStore();
  const { user } = authStore();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (selectedBlog) {
      setIsLiked(selectedBlog.likes.includes(user._id));
    }
  }, [selectedBlog?.likes]);

  const handleLike = () => {
    let data = { userId: user._id, blogId: selectedBlog._id };
    if (isLiked) {
      removeLike(data);
    } else {
      addLike(data);
    }
  };
  return (
    <>
      <hr className="border-gray-100 my-2" />
      <div className="flex gap-6">
        <div className="flex gap-3 items-center" onClick={handleLike}>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
            <Heart className={`${isLiked ?"text-red-600":""}`}/>
          </button>
          <p className="text-xl text-gray-700 ">{data?.likes?.length || 0}</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100"
            onClick={() => setCommentWrapper((curr) => !curr)}
          >
            <MessageSquareText />
          </button>
          <p className="text-xl text-gray-700 ">{data?.comments?.length}</p>
        </div>
      </div>
      <hr className="border-gray-100 my-2" />
    </>
  );
}
