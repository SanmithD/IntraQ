"use client";

import { UseQuestionStore } from "@/app/store/UseQuestionStore";
import { QuestionDetails } from "@/types/QuestionTypes";
import { Building2, Calendar, Code2, MessageSquare, User } from "lucide-react";
import { useEffect, useState } from "react";

function Home() {
  const [limit, setLimit] = useState(10);
  const questions = UseQuestionStore((state) => state.questions);
  const isQuestionLoading = UseQuestionStore(
    (state) => state.isQuestionLoading
  );
  const getAllQuestions = UseQuestionStore((state) => state.getAllQuestions);

  useEffect(() => {
    getAllQuestions(limit);
  }, [getAllQuestions, limit]);

  const safeQuestions: QuestionDetails[] = questions || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Community Questions
          </h1>
          <p className="text-lg text-slate-800 max-w-2xl mx-auto">
            Browse through coding challenges shared by the developer community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
          {safeQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-sky-100 hover:bg-sky-50 active:animate-ping rounded-2xl shadow-lg border cursor-pointer border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {question.company || "Unknown Company"}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {question.role || "No role specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5" >
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    <Code2 className="w-4 h-4" />
                    {question.language || "Unknown"}
                  </span>
                  {question.solution && (
                    <span className="text-sm font-medium border-green-600 text-green-800">
                      Solution Included
                    </span>
                  )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className={`text-slate-700 leading-relaxed`}>
                    {question.question.length > 30
                      ? question.question.substring(0, 30) + "..."
                      : question.question}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {question.userId?.username || "Anonymous"}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {question.createdAt
                          ? new Date(question.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {safeQuestions.length >= limit && (
          <div className="text-center">
            <button
              onClick={() => setLimit((prev) => prev + 10)}
              disabled={isQuestionLoading}
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {isQuestionLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>Load More Questions</>
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {safeQuestions.length === 0 && !isQuestionLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No Questions Yet
            </h3>
            <p className="text-slate-500">
              Be the first to share a coding challenge with the community!
            </p>
          </div>
        )}

        {/* Loading State */}
        {isQuestionLoading && safeQuestions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading questions...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
