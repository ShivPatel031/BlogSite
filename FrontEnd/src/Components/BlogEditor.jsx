import { useContext, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./EditorTools";
import { BlogContext } from "../Pages/EditorPage";
import toast from "react-hot-toast";
import { X } from "lucide-react";
export function BlogEditor() {
  const { blogData, setBlogData, editor, setEditor, setMode } =
    useContext(BlogContext);

  useEffect(() => {
    setEditor(
      new EditorJS({
        holder: "textEditor",
        data: blogData.content,
        tools,
        placeholder: "Let's write an awesome story",
      })
    );
  }, []);

  const onPublishHandler = () => {
    if (!blogData.bannerUrl) {
      return toast.error("Please Upload Banner Image.");
    }

    if (!blogData.title) {
      return toast.error("Please Provide Blog Title.");
    }

    editor
      .save()
      .then((data) => {
        if (data.blocks.length) {
          setBlogData({ ...blogData, content: data });
          setMode("publish");
        } else {
          toast.error("Please enter some info in editor to post blog.");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-screen max-w-[900px] my-5 flex flex-col justify-center">
      <nav className="flex justify-between items-center px-10">
        <p>{blogData?.title || "Blog Title"}</p>
        <div className="flex gap-5">
          <button
            className="bg-black text-white px-5 py-2 rounded-full cursor-pointer"
            onClick={onPublishHandler}
          >
            Publish
          </button>
          <button className="bg-gray-200 text-gray-500 hover:text-gray-800 px-5 py-2 rounded-full cursor-pointer">
            Save Draft
          </button>
        </div>
      </nav>

      <section className="w-full my-5 px-3">
        {/* Banner Image Upload */}
        <div className="aspect-video border-4 border-gray-300 rounded-md flex justify-center items-center">
          <label htmlFor="bannerImage">
            {blogData.bannerUrl ? (
              <img
                src={blogData.bannerUrl}
                alt="banner image"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <p className="text-5xl text-gray-300 font-semibold cursor-pointer">
                Blog Banner
              </p>
            )}
            <input
              type="file"
              id="bannerImage"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => {
                let img = e.target.files[0];
                let imgUrl = URL.createObjectURL(img);
                setBlogData({
                  ...blogData,
                  bannerImage: img,
                  bannerUrl: imgUrl,
                });
              }}
            />
          </label>
        </div>

        {/* Blog Title Input */}
        <textarea
          defaultValue={blogData.title || ""}
          placeholder="Blog Title"
          className="w-full h-20 resize-none mt-10 text-4xl text-center outline-none text-gray-500 placeholder:text-gray-300 rounded-lg leading-tight font-medium"
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault(); // Disable Enter key
          }}
          onBlur={(e) => {
            setBlogData({ ...blogData, title: e.target.value });
          }}
          onChange={(e) => {
            let input = e.target;
            input.style.height = "auto";
            input.style.height = input.scrollHeight + 5 + "px";
          }}
        ></textarea>

        <hr className="text-gray-300 font-bold outline-1 my-2 mb-5" />

        <div id="textEditor" className="w-full my-2"></div>
      </section>
    </div>
  );
}


