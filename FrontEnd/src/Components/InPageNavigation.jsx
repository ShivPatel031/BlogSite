import { useEffect, useState } from "react";
import { blogStore } from "../Stores/blogStore";
import { BlogPostCard } from "../Common/BlogPostCard";
import { TrandingBlog } from "./Tranding";

export function InPageNavigation({ routes }) {
  const { blogs, getLatestBlog } = blogStore();
  const [activeOption, setActiveOption] = useState(routes[0]);
  useEffect(() => {
    getLatestBlog();
  }, []);
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
      {activeOption === "latest" ? (
        blogs.length > 0 &&
        blogs.map((data, i) => <BlogPostCard data={data} key={i} />)
      ) : (
        <TrandingBlog />
      )}
    </>
  );
}
