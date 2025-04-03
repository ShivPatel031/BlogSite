import { createContext, useState } from "react";
import { BlogEditor } from "../Components/BlogEditor";
import { Publish } from "../Components/Publish";

export const BlogContext = createContext();

const blogInfo = {
  bannerImage: "",
  bannerUrl: "",
  title: "",
  content: "",
  description: "",
  tags: [],
};

export function EditorPage() {
  const [mode, setMode] = useState("edit");
  const [blogData, setBlogData] = useState(blogInfo);
  const [editor, setEditor] = useState(null);
  return (
    <BlogContext.Provider
      value={{ blogData, setBlogData, editor, setEditor, setMode }}
    >
      <div className="flex-1 flex justify-center">
        {mode === "edit" ? <BlogEditor /> : <Publish />}
      </div>
    </BlogContext.Provider>
  );
}
