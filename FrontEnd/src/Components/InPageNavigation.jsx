import { useEffect, useState } from "react";
import { blogStore } from "../Stores/blogStore";
import { BlogPostCard } from "../Common/BlogPostCard";
import { TrandingBlog } from "./Tranding";
import { authStore } from "../Stores/authStore";
import { NoDataMessage } from "../Common/NoDataMessage";

export function InPageNavigation({ routes }) {
  const { blogs, getLatestBlog, documentCount } = blogStore();
  const { isLogin } = authStore();
  const [activeOption, setActiveOption] = useState(routes[0]);
  const fetchBlogs = () => {
    if (isLogin) {
      if (activeOption === "home") {
        getLatestBlog({});
      } else {
        getLatestBlog({ tag: activeOption });
      }
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, [isLogin, activeOption]);

  useEffect(() => {
    setActiveOption(routes[0]);
  }, [routes]);
  return (
    <>
      <div className="w-full not-visited:mb-8 bg-white border-b border-gray-200 flex flex-nowrap overflow-x-auto mt-5">
        {routes.map((route, index) => {
          return (
            <button
              key={index}
              className={`px-5 py-3 capitalize mr-4 ${
                activeOption === route ? "text-black border-b" : "text-gray-400"
              }`}
              onClick={() => {
                if (activeOption != route) {
                  setActiveOption(route);
                }
              }}
            >
              {route}
            </button>
          );
        })}
      </div>
      {activeOption === routes[0] ? (
        blogs.length > 0 ? (
          blogs.map((data, i) => <BlogPostCard data={data} key={i} />)
        ) : (
          <NoDataMessage message="No Blogs Found" />
        )
      ) : (
        <TrandingBlog />
      )}

      {documentCount > blogs.length && (
        <p
          className="hover:underline text-lg mt-5 cursor-pointer text-center"
          onClick={fetchBlogs}
        >
          Load More
        </p>
      )}
    </>
  );
}
