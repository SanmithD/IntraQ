"use client";

import { UseControllerStore } from "@/app/store/UseControllerStore";
import {
    Bookmark,
    Building2,
    Calendar,
    ChevronDown,
    Code2,
    Loader2,
    MessageSquare,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Bookmarks() {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const getBookmarked = UseControllerStore((state) => state.getBookmarked);
  const bookedQuestions = UseControllerStore((state) => state.bookedQuestions);
  const isControllerLoading = UseControllerStore(
    (state) => state.isControllerLoading
  );

  useEffect(() => {
    getBookmarked(limit);
  }, [getBookmarked, limit]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const safeBookedQuestions = Array.isArray(bookedQuestions)
    ? bookedQuestions
    : [];

  return (
    <div className="min-h-screen overflow-y-scroll py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {isControllerLoading && safeBookedQuestions.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-slate-600">Loading bookmarks...</p>
            </div>
          ) : safeBookedQuestions.length > 0 ? (
            safeBookedQuestions.map((bookmark) => (
              <div
                key={bookmark._id}
                onClick={() =>
                  router.push(`/pages/Questions/${bookmark?.questionId?._id}`)
                }
                className="bg-white rounded-2xl cursor-pointer shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-lg">
                          {bookmark.questionId?.company || "Unknown Company"}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {bookmark.questionId?.role || "No role specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                        <Code2 className="w-4 h-4" />
                        {bookmark.questionId?.language || "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-slate-700 line-clamp-3 leading-relaxed">
                      {bookmark.questionId?.question || "No question content"}
                    </p>
                  </div>

                  {bookmark.questionId?.solution && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-green-800">
                          Solution Included
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {bookmark.userId?.username || "Anonymous"}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {bookmark.questionId?.createdAt
                            ? formatDate(bookmark.questionId.createdAt)
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Bookmarked</p>
                      <p className="text-xs text-slate-500">
                        {formatDate(bookmark.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-slate-500 mb-6">
                Start bookmarking questions to see them here!
              </p>
            </div>
          )}
        </div>

        {safeBookedQuestions.length >= limit && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isControllerLoading}
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {isControllerLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Load More Bookmarks
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
