"use client";

import { UseSearchStore } from "@/app/store/UseSearchStore";
import { ChevronDown, Clock, Loader2, Search, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function History() {

    const router = useRouter();
  const [limit, setLimit] = useState(10);
  const deleteAllRecentHistory = UseSearchStore(
    (state) => state.deleteAllRecentHistory
  );
  const recentSearches = UseSearchStore((state) => state.recentSearches);
  const getRecentSearches = UseSearchStore((state) => state.getRecentSearches);
  const isHistoryLoading = UseSearchStore((state) => state.isHistoryLoading);
  const deleteRecentById = UseSearchStore((state) => state.deleteRecentById);

  useEffect(() => {
    getRecentSearches(limit);
  }, [getRecentSearches, limit]);

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all search history?")) {
      deleteAllRecentHistory();
    }
  };

  const handleDeleteItem = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this search history?")
    ) {
      deleteRecentById(id);
    }
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  const safeRecentSearches = Array.isArray(recentSearches)
    ? recentSearches
    : [];

  if (isHistoryLoading && safeRecentSearches.length === 0) {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
        <p className="text-slate-500 text-sm">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-700">Recent Searches</h4>
        {safeRecentSearches.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {safeRecentSearches.length > 0 ? (
        <div className="space-y-3">
          {safeRecentSearches.map((item) => (
            <div
              key={item._id}
              className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 text-primary" />
                </div>
                <div onClick={()=>router.push(`/pages/Questions/${item.questionId._id}`)} className="flex-1 cursor-pointer min-w-0">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span className="text-sm font-semibold text-slate-600" >
                      {item?.questionId?.question
                        ? item.questionId.question.length > 50
                          ? item.questionId.question.substring(0, 50) + "..."
                          : item.questionId.question
                        : "No question found"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteItem(item._id as string)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-all duration-200 ml-2 flex-shrink-0"
                title="Delete this search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Load More Button */}
          {safeRecentSearches.length >= limit && (
            <div className="pt-2">
              <button
                onClick={handleLoadMore}
                disabled={isHistoryLoading}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors border border-slate-200 hover:border-slate-300 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50"
              >
                {isHistoryLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Load More
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">No search history yet</p>
          <p className="text-slate-400 text-xs mt-1">
            Your recent searches will appear here
          </p>
        </div>
      )}
    </div>
  );
}

export default History;
