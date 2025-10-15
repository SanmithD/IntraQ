"use client";

import axios from "axios";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";

type VotesProp = {
    id: string;
};

interface VoteStats {
    upVotes: number;
    downVotes: number;
}

function Votes({ id }: VotesProp) {
    const [votes, setVotes] = useState<VoteStats>({ upVotes: 0, downVotes: 0 });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchVotes = async () => {
            if (!id) return;
            
            setIsLoading(true);
            try {
                const res = await axios.get(`/api/Votes/${id}`, {
                    withCredentials: true,
                });
                const stats = res.data?.res?.[0] || {};
                setVotes({
                    upVotes: stats.upVotes || 0,
                    downVotes: stats.downVotes || 0,
                });
            } catch (error) {
                console.error("Error fetching votes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVotes();
    }, [id]);

    return (
        <div className="flex items-center gap-4 p-3">
            <div className="flex items-center gap-2 px-3 py-2 transition-colors duration-200">
                <ArrowBigUp className={`w-4 h-4 ${
                    votes.upVotes > 0 ? "text-blue-600" : "text-slate-500"
                }`} />
                <span className={`font-semibold text-sm ${
                    votes.upVotes > 0 ? "text-blue-600" : "text-slate-600"
                }`}>
                    {isLoading ? "..." : votes.upVotes}
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 transition-colors duration-200">
                <ArrowBigDown className={`w-4 h-4 ${
                    votes.downVotes > 0 ? "text-red-600" : "text-slate-500"
                }`} />
                <span className={`font-semibold text-sm ${
                    votes.downVotes > 0 ? "text-red-600" : "text-slate-600"
                }`}>
                    {isLoading ? "..." : votes.downVotes}
                </span>
            </div>
        </div>
    );
}

export default Votes;