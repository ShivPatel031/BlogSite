import { X } from "lucide-react";
import { CommentField } from "./CommentField";
import { blogStore } from "../Stores/blogStore";
import { use, useEffect, useState } from "react";
import { NoDataMessage } from "../Common/NoDataMessage";
import { CommentCard } from "../Common/CommentCard";

export function CommentComponent({ setCommentWrapper, level = 1, replyingTo }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const { selectedBlog, getLatestComments, addComment } = blogStore();
  const fetchComments = async () => {
    let data = await getLatestComments({
      blogId: selectedBlog._id,
      commentLevel: level,
      replyingTo,
      page,
    });
    if (data.totalComments) {
      setPage(page + 1);
      setComments([...comments, ...data.comments]);
      setTotalComments(data.totalComments);
    }
  };
  const handleAddComment = async (data) => {
    const newComment = await addComment(data);

    if (newComment) {
      setComments([newComment, ...comments]);
    }
  };
  useEffect(() => {
    if (selectedBlog) {
      fetchComments();
    }
  }, [selectedBlog]);
  return (
    <>
      {level == 1 && (
        <>
          <div className="relative">
            <h1 className="text-xl font-medium">Comments</h1>
            <p className="text-lg mt-2 w-[70%] text-gray-700 line-clamp-1"></p>
            <X
              className="absolute top-0 right-0 flex justify-center items-center w-9 h-9 rounded-full bg-gray-100 cursor-pointer"
              onClick={() => setCommentWrapper(false)}
            />
          </div>

          <hr className="border-gray-200 my-8 w-[120%] -ml-10" />
          <CommentField action="comment" handleAddComment={handleAddComment} />
        </>
      )}

      {/* add pagination in commnets */}

      {comments.length ? (
        comments.map((data) => (
          <CommentCard
            data={data}
            level={level}
            handleAddComment={handleAddComment}
          />
        ))
      ) : (
        <NoDataMessage message="No comments found." />
      )}

      {totalComments > comments?.length && (
        <p className="hover:underline mt-5" onClick={fetchComments}>
          Load More
        </p>
      )}
    </>
  );
}
