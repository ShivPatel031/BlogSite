import { create } from "zustand";
import { axiosInstance } from "../Utility/axios";
import toast from "react-hot-toast";

const routes = {
  login: "/auth/login",
  logout: "/auth/logout",
  signup: "/auth/register",
  loginOnRefresh: "/auth/refreshAccessToken",
  updateProfileImage: "/auth/update-profile-image",
  updateProfileData: "/auth/update-profile-data",
};

export const authStore = create((set) => ({
  user: null,
  isLogin: false,
  isLogging: false,
  isSigning: false,

  login: async (data) => {
    set({ isLogging: true });
    try {
      const response = await axiosInstance.post(routes.login, data);
      if (response?.data?.success) {
        set({ user: response.data.data.user });
        sessionStorage.setItem(
          "blog_site_auth_token",
          response.data.data.accessToken
        );
        set({ isLogin: true });
        toast.success("SignIn Successfull");
        return true;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLogging: false });
    }
    return false;
  },

  signup: async (data) => {
    set({ isSigning: true });
    try {
      const response = await axiosInstance.post(routes.signup, data);
      if (response?.data?.success) {
        toast.success("Sign Up Successfull.");
        return true;
      }
    } catch (error) {
      toast.error("Error in Sign Up");
    } finally {
      set({ isSigning: false });
    }
    return false;
  },

  logout: async () => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.get(routes.logout, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success) {
        sessionStorage.removeItem("blog_site_auth_token");
        set({ user: null });
        set({ isLogin: false });
        toast.success("Logout Successfull.");
        return true;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    return false;
  },

  refreshTokenAndLogin: async () => {
    try {
      const response = await axiosInstance.get(routes.loginOnRefresh);
      if (response?.data?.success) {
        set({ user: response.data.data.user });
        sessionStorage.setItem(
          "blog_site_auth_token",
          response.data.data.accessToken
        );
        set({ isLogin: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  updateProfileImage: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        routes.updateProfileImage,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Prifile image updated successfully.");
        set((state) => ({
          user: { ...state.user, userImage: response.data.data.userImage },
        }));
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Error in update profile image."
      );
    }
  },

  updateProfileData: async (data) => {
    try {
      const token = sessionStorage.getItem("blog_site_auth_token");
      const response = await axiosInstance.post(
        routes.updateProfileData,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Prifile data updated successfully.");
        set((state) => ({
          user: { ...state.user, ...response.data.data },
        }));
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Error in update profile data."
      );
    }
  },
}));
