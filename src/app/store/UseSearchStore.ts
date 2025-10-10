import { HistoryDetails } from "@/types/HistoryTypes";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Search {
  isSearchLoading: boolean;
  recentSearches: HistoryDetails[] | null;

  saveHistory: (id: string) => Promise<void>;
  getRecentSearches: (limit: number) => Promise<void>;
  search: (query: string, limit: number) => Promise<void>;
  deleteAllRecentHistory: () => Promise<void>;
  deleteRecentById: (id: string) => Promise<void>;
  getSearchById: (id: string) => Promise<void>;
}

export const UseSearchStore = create<Search>((set, get) => ({
  isSearchLoading: false,
  recentSearches: null,

  saveHistory: async (id) => {
    set({ isSearchLoading: true });
    try {
      await axios.post(`/api/search/saveHistory/${id}`, {}, { withCredentials: true });
      toast.success("Search history saved");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
    } finally {
      set({ isSearchLoading: false });
    }
  },

  getSearchById : async (id) => {
    set({ isSearchLoading: true });
    try {
      await axios.delete(`/api/search/saveHistory/${id}`, { withCredentials: true });
      await get().saveHistory(id)
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to delete history");
    } finally {
      set({ isSearchLoading: false });
    }
  },

  getRecentSearches: async (limit) => {
    set({ isSearchLoading: true });
    try {
      const res = await axios.get(`/api/search/recent?limit=${limit}`, { withCredentials: true });
      set({ recentSearches: res.data.data });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Unable to fetch recent searches");
    } finally {
      set({ isSearchLoading: false });
    }
  },

  search: async (query, limit) => {
    set({ isSearchLoading: true });
    try {
      const res = await axios.get(`/api/search?query=${query}&limit=${limit}`, { withCredentials: true });
      set({ recentSearches: res.data.data });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Search failed");
    } finally {
      set({ isSearchLoading: false });
    }
  },

  deleteAllRecentHistory: async () => {
    set({ isSearchLoading: true });
    try {
      await axios.delete(`/api/search/recent`, { withCredentials: true });
      toast.success("All search history deleted");
      set({ recentSearches: [] });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to delete history");
    } finally {
      set({ isSearchLoading: false });
    }
  },

  deleteRecentById: async (id) => {
    set({ isSearchLoading: true });
    try {
      await axios.delete(`/api/search/recent/${id}`, { withCredentials: true });
      toast.success("History deleted");
      set((state) => ({
        recentSearches: state.recentSearches?.filter((item) => item.id !== id) || null,
      }));
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to delete history");
    } finally {
      set({ isSearchLoading: false });
    }
  },
}));
