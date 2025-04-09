import { useEffect, useState } from "react";
import { blogStore } from "../Stores/blogStore";
import { useParams, Link } from "react-router-dom";
import { getDay } from "../Utility/date";
import { BlogInteraction } from "../Components/BlogInteraction";
import { BlogContent } from "../Components/BlogContent";
import { NoDataMessage } from "../Common/NoDataMessage";
import { CommentComponent } from "../Components/CommentComponent";

export function BlogPage() {
  const { slug } = useParams();
  const { selectedBlog, getSelectedBlog } = blogStore();
  const [commentWrapper, setCommentWrapper] = useState(false);
  useEffect(() => {
    getSelectedBlog(slug);
  }, [slug]);

  if (!selectedBlog) {
    return <NoDataMessage message={"No blog found"} />;
  }
  return (
    <div className="flex-1 flex justify-center relative">
      {commentWrapper && (
        <div className="max-sm:w-full fixed top-0 right-0 duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-7 overflow-y-auto overflow-x-hidden">
          <CommentComponent
            setCommentWrapper={setCommentWrapper}
            commentWrapper={commentWrapper}
          />
        </div>
      )}

      <section className="max-w-[900px] center py-10 max-lg:px-[5vw]">
        <img src={selectedBlog?.imageUrl} alt="banner image" />
        <div className="mt-12">
          <h1>{selectedBlog.title}</h1>
          <div className="flex max-sm:flex-col justify-between my-8">
            <div className="flex gap-5 items-start">
              <img
                src={selectedBlog.userId.userImage}
                alt="user image"
                className="w-12 h-12 rounded-full"
              />
              <p className="capitalize ">
                {selectedBlog.userId.userName} {/* fullname */}
                <br />
                <Link to={`/user/${selectedBlog.userId.userName}`}>
                  @{selectedBlog.userId.userName}
                </Link>
              </p>
            </div>
            <p className="text-gray-400 opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
              Published on {getDay(selectedBlog.createdAt)}
            </p>
          </div>
          <BlogInteraction
            data={selectedBlog}
            setCommentWrapper={setCommentWrapper}
          />
          <div className="my-12 ">
            {JSON.parse(selectedBlog.content).blocks.map((block, i) => {
              return (
                <div key={i} className="my-4 md:my-8">
                  <BlogContent block={block} />
                </div>
              );
            })}
          </div>

          {/* add relevent blogs based on tags */}
        </div>
      </section>
    </div>
  );
}
