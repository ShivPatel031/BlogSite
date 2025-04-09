import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authStore } from "../Stores/authStore";
import { blogStore } from "../Stores/blogStore";
import { BlogPostCard } from "../Common/BlogPostCard";
import { NoDataMessage } from "../Common/NoDataMessage";
import { axiosInstance } from "../Utility/axios";
import { getDay } from "../Utility/date";

export function SearchPage() {
  const { query } = useParams();
  const { getSearchingBlogs, searchBlogs } = blogStore();
  const [searchAccounts, setSearchAccounts] = useState([]);
  const fetchAccount = async () => {
    const response = await axiosInstance.post("/auth/search-accouts", {
      search: query,
    });
    console.log(response);
    if (response?.data?.success) {
      setSearchAccounts(response.data.data);
    }
  };
  useEffect(() => {
    if (query) {
      getSearchingBlogs({ search: query });
      fetchAccount();
    }
  }, [query]);
  return (
    <div className="flex-1 px-10 flex justify-center">
      <section className="w-full max-w-[1224px] flex gap-10">
        <div className="w-3/4">
          <div className="w-full not-visited:mb-8 bg-white border-b border-gray-200 flex flex-nowrap overflow-x-auto mt-5">
            <button className="px-5 py-3 capitalize mr-4  text-black border-b">
              search results from "{query}"
            </button>
          </div>
          {searchBlogs.length ? (
            searchBlogs.map((data, i) => <BlogPostCard data={data} key={i} />)
          ) : (
            <NoDataMessage message="No Blogs Found" />
          )}
        </div>
        <div className="w-1/4">
          <div className="w-full not-visited:mb-8 bg-white border-b border-gray-200 flex flex-nowrap overflow-x-auto mt-5">
            <button className="px-5 py-3 capitalize mr-4  text-black border-b">
              search accounts
            </button>
          </div>
          {searchAccounts.length ? (
            searchAccounts.map((data, i) => (
              <div className="flex gap-2 items-center mb-7" key={i}>
                <img
                  src={data.userImage}
                  alt="user image"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">@{data.userName}</p>
                <p className="min-w-fit">{getDay(data.createdAt)}</p>
              </div>
            ))
          ) : (
            <NoDataMessage message="No Accounts Found." />
          )}
        </div>
      </section>
    </div>
  );
}
