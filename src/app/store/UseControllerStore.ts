import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Controllers{
    isControllerLoading: boolean;
    upVotes: number;
    downVotes: number;

    giveVote: (data: string, id: string) => Promise<void>;
    fetchVotes: () => Promise<void>;
    bookmark: (id: string) => Promise<void>;
}

export const UseControllerStore = create<Controllers>((set) =>({
    isControllerLoading: false,
    upVotes: 0,
    downVotes: 0,

    giveVote: async(data, id) =>{
        set({ isControllerLoading: true });
        try {
            const res = await axios.patch(`/api/Votes/${id}`,{ type: data } ,{ withCredentials: true });
            console.log(res.data)
        } catch (error) {
            console.log(error);
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data.message || "Something went wrong");
            set({ isControllerLoading: false });
        }
    },
    fetchVotes: async() =>{
        
    },
    bookmark: async(id) =>{
        
    },
}))