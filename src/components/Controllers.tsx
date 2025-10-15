"use client";

import { UseControllerStore } from "@/app/store/UseControllerStore";
import { ArrowBigDown, ArrowBigUp, Bookmark, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type ControllersProp = {
    id: string
};

function Controllers({ id }: ControllersProp) {

    const giveVote = UseControllerStore((state) => state.giveVote);
    const bookmark = UseControllerStore((state) => state.bookmark);
    const fetchVotes = UseControllerStore((state) => state.fetchVotes);
    const upVote = UseControllerStore((state) => state.upVote);
    const downVote = UseControllerStore((state) => state.downVote);
    const booked = UseControllerStore((state) => state.booked);
    const isControllerLoading = UseControllerStore((state) => state.isControllerLoading);
    
    const [voteLoading, setVoteLoading] = useState<string | null>(null);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);

    const handleVote = async (value: string) => {
        setVoteLoading(value);
        try {
            await giveVote(value, id);
        } finally {
            setVoteLoading(null);
        }
    }

    const handleBookmark = async () => {
        setBookmarkLoading(true);
        try {
            await bookmark(id);
        } finally {
            setBookmarkLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchVotes(id);
        }
    }, [id, fetchVotes]);

    return (
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-slate-100 p-3">
            <button
                onClick={() => handleVote("up")}
                disabled={voteLoading !== null}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors duration-200 group disabled:opacity-50"
            >
                {voteLoading === "up" ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                ) : (
                    <ArrowBigUp className={`w-4 h-4 transition-colors ${
                        upVote && upVote > 0 ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"
                    }`} />
                )}
                <span className={`font-semibold text-sm ${
                    upVote && upVote > 0 ? "text-blue-600" : "text-slate-600"
                }`}>
                    {upVote || 0}
                </span>
            </button>

            <button
                onClick={() => handleVote("down")}
                disabled={voteLoading !== null}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-red-50 transition-colors duration-200 group disabled:opacity-50"
            >
                {voteLoading === "down" ? (
                    <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
                ) : (
                    <ArrowBigDown className={`w-4 h-4 transition-colors ${
                        downVote && downVote > 0 ? "text-red-600" : "text-slate-500 group-hover:text-red-600"
                    }`} />
                )}
                <span className={`font-semibold text-sm ${
                    downVote && downVote > 0 ? "text-red-600" : "text-slate-600"
                }`}>
                    {downVote || 0}
                </span>
            </button>

            <button
                onClick={handleBookmark}
                disabled={bookmarkLoading || isControllerLoading}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-teal-50 transition-colors duration-200 group disabled:opacity-50 ml-auto"
            >
                {bookmarkLoading ? (
                    <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                ) : (
                    <Bookmark className={`w-4 h-4 transition-colors ${
                        booked 
                            ? "text-teal-600 fill-teal-600" 
                            : "text-slate-500 group-hover:text-teal-600"
                    }`} />
                )}
                <span className={`font-semibold text-sm ${
                    booked ? "text-teal-600" : "text-slate-600"
                }`}>
                    {booked ? "Saved" : "Save"}
                </span>
            </button>
        </div>
    );
}

export default Controllers;