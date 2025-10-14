"use client";

import { UseAuthStore } from "@/app/store/UseAuthStore";
import Bookmarks from "@/components/Bookmarks";
import LoginBtn from "@/components/LoginBtn";
import { Bookmark, Calendar, Edit, Mail, Trash2, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Profile() {
  const { data: session } = useSession();
  const isLoading = UseAuthStore((state) => state.isLoading);
  const auth = UseAuthStore((state) => state.auth);
  const fetchProfile = UseAuthStore((state) => state.profile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-8">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {auth.username}
                  </h2>
                  <p className="text-slate-600">{auth.email}</p>
                </div>

                {/* Profile Details */}
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
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Edit className="w-4 h-4" />
                    Update Profile
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-500/20 via-gray-300/20 to-gray-600 rounded-2xl shadow-xl border border-slate-200 p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
