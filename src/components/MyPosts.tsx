"use client";

import { UseAuthStore } from "@/app/store/UseAuthStore";
import { UseQuestionStore } from "@/app/store/UseQuestionStore";
import { QuestionDetails } from "@/types/QuestionTypes";
import {
    Briefcase,
    Building2,
    Calendar,
    Code2,
    Edit,
    FileText,
    MoreVertical,
    Star,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditQuestion from "./EditQuestion";

function MyPosts() {
  const router = useRouter();
  const myPosts = UseAuthStore((state) => state.myPosts);
  const post = UseAuthStore((state) => state.post);
  const isPostLoading = UseAuthStore((state) => state.isPostLoading);
  const deletePost = UseQuestionStore((state) => state.deleteQuestion);

  const [filteredPosts, setFilteredPosts] = useState<QuestionDetails[]>([]);
  const [limit, setLimit] = useState(6);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<QuestionDetails | null>(null);

  useEffect(() => {
    myPosts(limit);
  }, [myPosts, limit]);

  useEffect(() => {
    if (!post) return;
    setFilteredPosts([...post]);
  }, [post]);

  const getLanguageColor = (language: string) => {
    const colors = [
      "bg-blue-100 text-blue-800 border border-blue-200",
      "bg-green-100 text-green-800 border border-green-200",
      "bg-yellow-100 text-yellow-800 border border-yellow-200",
      "bg-red-100 text-red-800 border border-red-200",
      "bg-purple-100 text-purple-800 border border-purple-200",
      "bg-pink-100 text-pink-800 border border-pink-200",
      "bg-indigo-100 text-indigo-800 border border-indigo-200",
    ];
    return colors[
      Math.abs(language.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) %
        colors.length
    ];
  };

  const handleEdit = (postItem: QuestionDetails) => {
    setEditingPost(postItem);
    setActiveMenu(null);
  };

  const handleDelete = async (postId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      try {
        await deletePost(postId);
        myPosts(limit);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
    setActiveMenu(null);
  };

  const toggleMenu = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === postId ? null : postId);
  };

  const handleUpdateComplete = () => {
    setEditingPost(null);
    myPosts(limit);
  };

  const handleCardClick = (postId: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest(".dropdown") ||
      target.closest(".card-actions")
    ) {
      return;
    }
    router.push(`/pages/Questions/${postId}`);
  };

  if (isPostLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {editingPost && (
        <EditQuestion
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onUpdate={handleUpdateComplete}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                No posts yet
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                You haven&apos;t created any interview questions yet. Start by
                creating your first post!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPosts.map((postItem) => (
                  <div
                    key={postItem._id}
                    onClick={(e) => handleCardClick(postItem._id as string, e)}
                    className="card bg-base-100 bg-gradient-to-br from-gray-500 via-gray-500/20 to-red-800/30 cursor-pointer shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                  >
                    <div className="absolute top-4 right-4">
                      <div className="dropdown dropdown-end">
                        <button
                          onClick={(e) => toggleMenu(postItem._id as string, e)}
                          className="btn btn-ghost btn-sm btn-circle hover:bg-slate-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {activeMenu === postItem._id && (
                          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 border border-slate-200 z-10">
                            <li>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(postItem);
                                }}
                                className="text-slate-700 hover:text-primary hover:bg-primary/10"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(postItem._id as string);
                                }}
                                className="text-slate-700 hover:text-error hover:bg-error/10"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="card-body p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg line-clamp-1 mb-1">
                            {postItem.company}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-slate-500" />
                            <span className="text-white font-medium text-sm">
                              {postItem.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-white line-clamp-3 leading-relaxed">
                          {postItem.question.length > 50 ? postItem.question.substring(0,50) + '...' : postItem.question}
                        </p>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getLanguageColor(
                              postItem.language
                            )}`}
                          >
                            <Code2 className="w-3 h-3 inline mr-1" />
                            {postItem.language}
                          </span>
                          {postItem.solution && (
                            <span className="badge badge-success gap-1 border-0 bg-green-100 text-green-800">
                              <Star className="w-3 h-3" />
                              Solved
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {postItem.createdAt
                            ? new Date(postItem.createdAt).toLocaleDateString()
                            : "Unknown"}
                        </div>
                        {postItem.updatedAt !== postItem.createdAt && (
                          <div className="flex items-center gap-1 text-xs">
                            <Edit className="w-3 h-3" />
                            Edited
                          </div>
                        )}
                      </div>

                      <div className="card-actions justify-between mt-4 pt-4 border-t border-slate-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(postItem);
                          }}
                          className="btn btn-primary btn-sm gap-2 flex-1 mr-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(postItem._id as string);
                          }}
                          className="btn btn-outline btn-error btn-sm gap-2 flex-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {post && post.length >= limit && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setLimit((prev) => prev + 6)}
                    className="btn btn-primary btn-outline gap-2 px-8"
                  >
                    Load More Posts
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyPosts;
