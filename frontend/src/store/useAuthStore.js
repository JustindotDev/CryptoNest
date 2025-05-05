import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

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
}));
