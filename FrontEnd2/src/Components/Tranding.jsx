import { useEffect } from "react";
import { blogStore } from "../Stores/blogStore";
import { getDay } from "../Utility/date";

export function TrandingBlog() {
  const { trendingBlogs, getTrendingBlogs } = blogStore();
  console.log(trendingBlogs);
  useEffect(() => {
    getTrendingBlogs();
  }, []);
  return (
    <div className="w-full ">
      {trendingBlogs.length &&
        trendingBlogs.map((data, i) => {
          return (
            <div className="flex gap-5 mb-10">
              <h2 className="font-bold text-gray-300 lg:text-4xl">
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
        })}
    </div>
  );
}
