"use client";

import { UseQuestionStore } from "@/app/store/UseQuestionStore";
import Controllers from "@/components/Controllers";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Code2,
  Copy,
  MessageSquare,
  Share2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type QuestionProp = {
  params: Promise<{ id: string }>;
};

function OneQuestion({ params }: QuestionProp) {
  const { id } = React.use(params);

  const router = useRouter();
  const getQuestionById = UseQuestionStore((state) => state.getQuestionById);
  const isQuestionLoading = UseQuestionStore(
    (state) => state.isQuestionLoading
  );
  const questions = UseQuestionStore((state) => state.questions);

  useEffect(() => {
    if (id) {
      getQuestionById(id);
    }
  }, [getQuestionById, id]);

  const question = questions?.find((q) => q._id === id);

  if (isQuestionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading question...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-600 mb-2">
              Question Not Found
            </h3>
            <p className="text-slate-500 mb-6">
              The question you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Link href="/" className="btn btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Questions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div onClick={() => router.back()} className="mb-6 cursor-pointer ">
          <span
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 mb-2">
                    {question.company || "Unknown Company"}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {question.role || "No role specified"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {question.createdAt
                        ? new Date(question.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  <Code2 className="w-4 h-4" />
                  {question.language || "Unknown"}
                </span>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                Problem Statement
              </h2>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                  {question.question}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Solution
              </h2>

              {question.solution ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-lg font-medium text-green-800">
                        Provided Solution
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          question.solution as string
                        );
                        toast.success("Copied");
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                  <pre className="text-green-700 whitespace-pre-wrap font-mono text-sm bg-white/50 p-4 rounded-lg border border-green-100">
                    {question.solution}
                  </pre>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">
                    No Solution Provided
                  </h3>
                  <p className="text-slate-500">
                    The author hasn&apos;t shared a solution yet. Be the first
                    to contribute!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center " >
            <Controllers id={question._id as string} />
          </div>
   
          <div className="p-8 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {question.userId?.username || "Anonymous"}
                  </h3>
                  <p className="text-slate-600 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {question.createdAt
                      ? new Date(question.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneQuestion;
