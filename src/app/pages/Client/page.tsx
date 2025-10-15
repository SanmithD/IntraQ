"use client";

import { UseAuthStore } from "@/app/store/UseAuthStore";
import Bookmarks from "@/components/Bookmarks";
import LoginBtn from "@/components/LoginBtn";
import MyPosts from "@/components/MyPosts";
import { Bookmark, Calendar, FileText, Mail, Trash2, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const { data: session } = useSession();
  const isLoading = UseAuthStore((state) => state.isLoading);
  const auth = UseAuthStore((state) => state.auth);
  const fetchProfile = UseAuthStore((state) => state.profile);
  const deleteAccount = UseAuthStore((state) => state.deleteAccount);

  const [isEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<"bookmarks" | "posts">("bookmarks");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (auth) {
      setUsername(auth.username || "")
    }
  }, [auth]);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = () => {
    toast.custom(
      (t) => (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto border border-red-200">
          <div className="text-center mb-4">
            <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Delete Account?
            </h3>
            <p className="text-slate-600 text-sm">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDeleteAccount();
                toast.dismiss(t.id);
              }}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      ),
      { duration: Infinity } 
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  if (!session?.user?.email) {
    return <LoginBtn />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 flex justify-center items-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-600 mb-2">
            No profile found
          </h3>
          <p className="text-slate-500">
            We couldn&apos;t find your profile information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border text-black border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Username"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        {auth.username}
                      </h2>
                      <p className="text-slate-600">{auth.email}</p>
                    </>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium text-slate-800">{auth.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-600">Member since</p>
                      <p className="font-medium text-slate-800">
                        {auth.createdAt
                          ? new Date(auth.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("bookmarks")}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 font-semibold transition-all duration-200 ${
                      activeTab === "bookmarks"
                        ? "bg-primary/5 text-primary border-b-2 border-primary"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                    Bookmarks
                  </button>
                  <button
                    onClick={() => setActiveTab("posts")}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 font-semibold transition-all duration-200 ${
                      activeTab === "posts"
                        ? "bg-primary/5 text-primary border-b-2 border-primary"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    My Posts
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === "bookmarks" ? (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Bookmark className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          My Bookmarks
                        </h2>
                        <p className="text-slate-600">
                          Your saved questions and challenges
                        </p>
                      </div>
                    </div>
                    <Bookmarks />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          My Posts
                        </h2>
                        <p className="text-slate-600">
                          Your created questions and solutions
                        </p>
                      </div>
                    </div>
                    <MyPosts />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;