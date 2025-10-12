import { HistoryDetails, SearchHistory } from "@/types/HistoryTypes";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Search {
  isSearchLoading: boolean;
  isDeleteLoading: boolean;
  isHistoryLoading: boolean;
  recentSearches: HistoryDetails[] | null;
  searchResult: SearchHistory[] | null;

  saveHistory: (id: string) => Promise<void>;
  getRecentSearches: (limit: number) => Promise<void>;
  search: (query: string, limit: number) => Promise<void>;
  deleteAllRecentHistory: () => Promise<void>;
  deleteRecentById: (id: string) => Promise<void>;
  getSearchById: (id: string) => Promise<void>;
}

export const UseSearchStore = create<Search>((set, get) => ({
  isSearchLoading: false,
  isDeleteLoading: false,
  isHistoryLoading: false,
  recentSearches: null,
  searchResult: null,

  saveHistory: async (id) => {
    set({ isSearchLoading: true });
    try {
      await axios.post(`/api/search/saveHistory/${id}`, {}, { withCredentials: true });
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
    set({ isHistoryLoading: true });
    try {
      const res = await axios.get(`/api/search/history?limit=${limit}`, { withCredentials: true });
      set({ recentSearches: res.data.res, isHistoryLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Unable to fetch recent searches");
    } finally {
      set({ isHistoryLoading: false });
    }
  },

  search: async (query, limit) => {
    set({ isSearchLoading: true });
    try {
      const res = await axios.get(`/api/search?query=${query}&limit=${limit}`, { withCredentials: true });
      set({ searchResult: res.data.questionRes, isSearchLoading: false });
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
      await axios.delete(`/api/search`, { withCredentials: true });
      set({ recentSearches: [], isSearchLoading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to delete history");
    } finally {
      set({ isSearchLoading: false });
    }
  },

  deleteRecentById: async (id) => {
    set({ isDeleteLoading: true });
    try {
      await axios.delete(`/api/search/saveHistory/${id}`, { withCredentials: true });
      set((state) => ({
        recentSearches: state.recentSearches?.filter((item) => item._id !== id) || null,
        isDeleteLoading: false
      }));
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to delete history");
    } finally {
      set({ isDeleteLoading: false });
    }
  },
}));
