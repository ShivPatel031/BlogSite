import { useEffect } from "react";
import { blogStore } from "../Stores/blogStore";
import { getDay } from "../Utility/date";
import { Link } from "react-router-dom";
import { NoDataMessage } from "../Common/NoDataMessage";

export function TrandingBlog() {
  const { trendingBlogs, getTrendingBlogs } = blogStore();
  useEffect(() => {
    getTrendingBlogs();
  }, []);
  return (
    <div className="w-full">
      {trendingBlogs.length ? (
        trendingBlogs.map((data, i) => {
          return (
            <div className="flex gap-3 mb-10" key={i}>
              <h2 className="font-bold text-gray-200/75 text-6xl">
                {"0" + (i + 1)}
              </h2>
              <div className="w-full" key={i}>
                <div className="flex gap-2 items-center mb-6">
                  <img
                    src={data.userId.userImage}
                    alt="user image"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="line-clamp-1">@{data.userId.userName}</p>
                  <p className="min-w-fit">{getDay(data.createdAt)}</p>
                </div>

                <h1 className="text-2xl  font-semibold line-clamp-1">
                  {data.title}
                </h1>
              </div>
            </div>
          );
        })
      ) : (
        <NoDataMessage message="No Tranding Blogs." />
      )}
    </div>
  );
}
