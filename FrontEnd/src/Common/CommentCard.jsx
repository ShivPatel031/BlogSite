import { useState } from "react";
import { getDay } from "../Utility/date";
import { CommentField } from "../Components/CommentField";
import { CommentComponent } from "../Components/CommentComponent";

export function CommentCard({
  level = 1,
  leftVal = 0,
  data,
  handleAddComment,
}) {
  const [wantToReplay, setWantToReplay] = useState(false);
  const [hasReply, setHasReply] = useState(data?.children?.length);
  const [loadReplys, setLoadReplys] = useState(false);

  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-6 rounded-md border border-gray-200">
        <div className="flex gap-3 items-center mb-8">
          <img
            src={data.userId.userImage}
            alt="user imag"
            className="w-6 h-6  rounded-full"
          />
          <p className="line-clamp-1">{data.userId.userName}</p>
          <p className="min-w-fit">{getDay(data.createdAt)}</p>
        </div>
        <p className="text-xl ml-3">{data.comment}</p>

        <div
          className={`flex gap-5 w-full ${
            hasReply ? "justify-between" : "justify-start"
          }items-center  m-5`}
        >
          {level < 3 && (
            <button
              className="hover:underline cursor-pointer capitalize"
              onClick={() => setWantToReplay((curr) => !curr)}
            >
              Reply
            </button>
          )}

          {hasReply ? (
            <button
              className="hover:underline cursor-pointer capitalize"
              onClick={() => setLoadReplys((curr) => !curr)}
            >
              showReply
            </button>
          ) : null}
        </div>

        {wantToReplay && (
          <CommentField
            action="reply"
            level={level + 1}
            replyingTo={data._id}
            handleAddComment={handleAddComment}
          />
        )}

        {loadReplys && (
          <CommentComponent level={level + 1} replyingTo={data._id} />
        )}
      </div>
    </div>
  );
}
