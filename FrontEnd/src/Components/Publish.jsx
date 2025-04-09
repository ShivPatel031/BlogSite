import { X } from "lucide-react";
import { BlogContext } from "../Pages/EditorPage";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { blogStore } from "../Stores/blogStore";
import { useNavigate } from "react-router-dom";

export function Publish() {
  const navigate = useNavigate();
  const { setMode, blogData } = useContext(BlogContext);
  const { isBlogPublishing, PublishBlog } = blogStore();

  const handlePublish = async () => {
    if (isBlogPublishing) return;

    if (blogData.tags.length < 2) {
      toast.error("Please provide at least two topics.");
      return;
    }

    if (!blogData.description) {
      toast.error("Please provide description of blog.");
      return;
    }

    const formData = new FormData();

    formData.append("title", blogData?.title);
    formData.append("content", JSON.stringify(blogData.content));
    blogData.tags.forEach((element) => {
      formData.append("tags", element);
    });

    formData.append("status", "published");
    formData.append("slug", blogData.title.replaceAll(" ", "-"));
    formData.append("is_featured", true);
    formData.append("image", blogData.bannerImage);
    formData.append("description", blogData.description);
    if (await PublishBlog(formData)) {
      navigate("/");
    }
  };

  return (
    <div className="w-screen max-w-[90vw] my-5 flex flex-col items-center justify-center relative">
      <button
        className="absolute top-0 right-0 bg-black text-white px-5 py-2 rounded-full"
        onClick={() => setMode("edit")}
      >
        Go Back to Edit
      </button>
      <section className="w-full h-full mt-15 px-3 flex max-xl:flex-col max-xl:items-center gap-5 ">
        <div className="xl:w-1/2 w-full">
          <div className="aspect-video border-4 border-gray-300 rounded-md flex justify-center items-center my-2">
            {blogData.bannerUrl && (
              <img src={blogData.bannerUrl} alt="banner-image" />
            )}
          </div>
          <h1 className="text-center text-4xl text-black/70 my-4">
            Title : {blogData.title}
          </h1>
        </div>

        <div className="xl:w-1/2 w-full">
          <p>Sort description about blog </p>
          <DescriptionTextArea />
          <p className="mt-5">
            Topics - (Helps in searching and ranking your blog post)
          </p>
          <AddTage />
        </div>
      </section>

      <button
        className="bg-black px-5 py-2 rounded-full text-white w-30"
        onClick={handlePublish}
      >
        {isBlogPublishing ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}
function AddTage() {
  let topicLimits = 6;
  const { blogData, setBlogData } = useContext(BlogContext);
  const [tags, setTags] = useState(blogData.tags);
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.length == 6) {
      toast.error("Topics limit is over.");
      return;
    }
    if (tags.includes(text)) {
      toast.error("Topics already exist.");
      return;
    }

    if (text.length) {
      setTags([...tags, text]);
      setText("");
    }
  };
  return (
    <>
      <div
        className="w-full bg-gray-200 py-2 rounded-xl my-4"
        onMouseLeave={() => setBlogData({ ...blogData, tags })}
      >
        <form onSubmit={handleSubmit} className="px-5">
          <input
            placeholder="Topic"
            type="text"
            value={text}
            className="w-full my-2 outline-purple-400 bg-white rounded-lg h-10 px-3"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button></button>
        </form>
        {tags.length > 0 && (
          <div className="flex px-5 my-2 gap-2 w-full flex-wrap">
            {tags.map((data) => {
              return (
                <div
                  className="flex px-5 py-2 rounded-full bg-white gap-1"
                  key={data}
                >
                  <span>{data}</span>
                  <X
                    onClick={() => setTags(tags.filter((d) => d != data))}
                    className="cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <p className="text-right">{topicLimits - tags.length} Topics left</p>
    </>
  );
}

function DescriptionTextArea() {
  let characterLimit = 200;
  const { blogData, setBlogData } = useContext(BlogContext);
  const [text, setText] = useState(blogData.description);
  return (
    <>
      <textarea
        maxLength={characterLimit}
        defaultValue={text}
        placeholder="Enter Blog Description"
        className="h-40 resize-none leading-7 bg-gray-100 focus:bg-gray-50 ring-offset-purple-400 rounded-2xl my-2 p-4 w-full"
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) =>
          setBlogData({ ...blogData, description: e.target.value })
        }
      ></textarea>
      <p className="text-right">
        {characterLimit - text.length} character left
      </p>
    </>
  );
}
