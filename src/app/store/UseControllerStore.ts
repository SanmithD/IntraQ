import { BookmarkDetails } from "@/types/BookmarkTypes";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Controllers {
  isControllerLoading: boolean;
  upVote: number;
  downVote: number;
  booked?: boolean;
  bookedQuestions: BookmarkDetails | null;

  giveVote: (data: string, id: string) => Promise<void>;
  fetchVotes: (id: string) => Promise<void>;
  bookmark: (id: string) => Promise<void>;
  getBookmarked: (limit: number) => Promise<void>;
}

export const UseControllerStore = create<Controllers>((set, get) => ({
  isControllerLoading: false,
  upVote: 0,
  downVote: 0,
  booked: false,
  bookedQuestions: null,

  giveVote: async (data, id) => {
    set({ isControllerLoading: true });
    try {
      await axios.patch(
        `/api/Votes/${id}`,
        { type: data },
        { withCredentials: true }
      );
      await get().fetchVotes(id);
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
      set({ isControllerLoading: false });
    }
  },

  fetchVotes: async (id) => {
    set({ isControllerLoading: true });
    try {
      const res = await axios.get(`/api/Votes/${id}`, {
        withCredentials: true,
      });
      const stats = res.data?.res?.[0] || {};
      set({
        upVote: stats.upVotes || 0,
        downVote: stats.downVotes || 0,
        isControllerLoading: false,
      });
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
      set({ isControllerLoading: false });
    }
  },

  bookmark: async (id) => {
    set({ isControllerLoading: true });
    try {
      const res = await axios.patch(
        `/api/Bookmark/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        set({ booked: false, isControllerLoading: false });
        toast.error("Bookmark Removed");
      } else if (res.status === 201) {
        set({ booked: true, isControllerLoading: false });
        toast.success("Bookmarked");
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
      set({ isControllerLoading: false });
    }
  },

  getBookmarked: async (limit) => {
    set({ isControllerLoading: true });
    try {
      const res = await axios.get(`/api/Bookmark?limit=${limit}`, {
        withCredentials: true,
      });
      set({ isControllerLoading: false, bookedQuestions: res.data.res });
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
      set({ isControllerLoading: false });
    }
  },
}));
