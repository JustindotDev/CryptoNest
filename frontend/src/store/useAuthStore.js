import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { showToast } from "../util/toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error.response?.data?.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      set({ authUser: res.data });
      showToast({
        description: "Account Created Successfully!",
        status: "success",
      });
      navigate("/");
    } catch (error) {
      console.log("Error Message: ", error);
      showToast({
        description: error.response.data.message,
        status: "error",
      });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data, navigate) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      showToast({
        description: "Logged in Succesfully!",
        status: "success",
      });
      navigate("/");
    } catch (error) {
      console.log("Error Message: ", error);
      showToast({
        description: error.response.data.message,
        status: "error",
      });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (navigate) => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      navigate("/login");
      showToast({
        description: "Logged out Succesfully!",
        status: "success",
      });
    } catch (error) {
      console.log("Error Message: ", error);
      showToast({
        description: error.response.data.message,
        status: "error",
      });
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
