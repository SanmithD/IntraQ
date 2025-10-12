import { QuestionDetails } from "@/types/QuestionTypes";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Question {
  isQuestionLoading: boolean;
  questions: QuestionDetails[] | null;
  postQuestion: (data: QuestionDetails) => Promise<void>;
  updateQuestion: (id: string, data: QuestionDetails) => Promise<void>;
  getAllQuestions: (limit: number) => Promise<void>;
  getQuestionById: (id: string) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
}

export const UseQuestionStore = create<Question>((set) => ({
  isQuestionLoading: false,
  questions: null,

  postQuestion: async (data) => {
    set({ isQuestionLoading: true });
    try {
      await axios.post(`/api/Questions`, data, {
        withCredentials: true,
      });
      toast.success("Question posted successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
    } finally {
      set({ isQuestionLoading: false });
    }
  },

  updateQuestion: async (id, data) => {
    set({ isQuestionLoading: true });
    try {
      await axios.patch(`/api/Questions/${id}`, data, {
        withCredentials: true,
      });
      toast.success("Question updated successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Something went wrong");
    } finally {
      set({ isQuestionLoading: false });
    }
  },

  getAllQuestions: async (limit) => {
    set({ isQuestionLoading: true });
    try {
      const res = await axios.get(`/api/Questions?limit=${limit}`, {
        withCredentials: true,
      });
      set({ questions: res.data.res });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to fetch questions");
    } finally {
      set({ isQuestionLoading: false });
    }
  },

  getQuestionById: async (id) => {
    set({ isQuestionLoading: true });
    try {
      const res = await axios.get(`/api/Questions/${id}`, {
        withCredentials: true,
      });
      set({ questions: [res.data.res] }); 
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Question not found");
    } finally {
      set({ isQuestionLoading: false });
    }
  },

  deleteQuestion: async (id) => {
    set({ isQuestionLoading: true });
    try {
      await axios.delete(`/api/Questions/${id}`, {
        withCredentials: true,
      });
      toast.success("Question deleted successfully");
      set((state) => ({
        questions: state.questions?.filter((q) => q._id !== id) || null,
      }));
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Delete failed");
    } finally {
      set({ isQuestionLoading: false });
    }
  },
}));
