import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export type AuthDetails = {
    userId?: string;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface User {
  isLoading: boolean;
  auth: AuthDetails | null;
  profile: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateAccount: (username: string) => Promise<void>;
}

export const UseAuthStore = create<User>((set, get) => ({
  isLoading: false,
  auth: null,

  profile: async () => {
    set({ isLoading: true });
    try {
        const res = await axios.get(`/api/User`,{ withCredentials: true });
        set({ isLoading: false, auth: res.data?.profile });
    } catch (error) {
        console.log(error);
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || "Something went wrong");
        set({ isLoading: false });
    }
  },

  deleteAccount: async () => {
    set({ isLoading: true });
    try {
        await axios.delete(`/api/User`,{ withCredentials: true });
        set({ isLoading: false });
    } catch (error) {
        console.log(error);
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || "Something went wrong");
        set({ isLoading: false });
    }
  },

  updateAccount: async (username: string) => {
    set({ isLoading: true });
    try {
        await axios.put(`/api/User`,username,{ withCredentials: true });
        set({ isLoading: false });
        await get().profile();
    } catch (error) {
        console.log(error);
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || "Something went wrong");
        set({ isLoading: false });
    }
  },
}));
