import { create } from "zustand";
import { axiosInstance } from "../Utility/axios";
import toast from "react-hot-toast";

export const blogStore = create((set, get) => ({
  blogs: [],
  trendingBlogs: [],
  selectedBlog: null,
  isBlogPublishing: false,
  PublishBlog: async (data) => {
    set({ isBlogPublishing: true });
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        "/posts/manage-posts/create-post",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Blog Published Successfully");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "something went wrong while posting"
      );
    } finally {
      set({ isBlogPublishing: false });
    }
  },
  getLatestBlog: async () => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.get(
        "/posts/manage-posts/get-latest-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        set({ blogs: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getTrendingBlogs: async () => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.get(
        "/posts/manage-posts/get-tranding-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.data.success) {
        set({ trendingBlogs: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
