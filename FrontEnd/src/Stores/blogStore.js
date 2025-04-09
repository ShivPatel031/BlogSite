import { create } from "zustand";
import { axiosInstance } from "../Utility/axios";
import toast from "react-hot-toast";

export const blogStore = create((set, get) => ({
  blogs: [],
  page: 1,
  documentCount: 0,
  trendingBlogs: [],
  searchBlogs: [],
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
        return true;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "something went wrong while posting"
      );
    } finally {
      set({ isBlogPublishing: false });
    }
    return false;
  },
  getLatestBlog: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      data.page = blogStore.getState().page;
      const response = await axiosInstance.post(
        "/posts/manage-posts/get-latest-posts",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        set((state) => ({
          blogs: [...state.blogs, ...response.data.data.posts],
        }));
        set({ documentCount: response.data.data.documentCount });
        set((state) => ({ page: state.page + 1 }));
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

      if (response.data.success) {
        set({ trendingBlogs: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getSearchingBlogs: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        "/posts/manage-posts/get-search-posts",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        set({ searchBlogs: response.data.data });
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethings went wrong while serrach blogs.");
    }
  },
  getSelectedBlog: async (params) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.get(
        `/posts/manage-posts/get-single-posts/${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        set({ selectedBlog: response.data.data });
      }
    } catch (error) {
      toast.error("Can not find this Blog.");
    }
  },

  addLike: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        "/posts/manage-posts/add-like",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Blog Liked.");
        set((state) => ({
          selectedBlog: {
            ...state.selectedBlog,
            likes: [...state.selectedBlog.likes, data.userId],
          },
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error in like.");
    }
  },
  removeLike: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        "/posts/manage-posts/remove-like",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Liked removed.");
        set((state) => ({
          selectedBlog: {
            ...state.selectedBlog,
            likes: state.selectedBlog.likes.filter((d) => d != data.userId),
          },
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error in like.");
    }
  },

  addComment: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        "/posts/comments/add-comment",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success("Comment added.");
        return response.data.data;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error in comment.");
    }
  },
  getLatestComments: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        "/posts/comments/get-latest-comments",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
