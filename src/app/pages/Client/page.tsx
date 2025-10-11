"use client";

import { UseAuthStore } from "@/app/store/UseAuthStore";
import LoginBtn from "@/components/LoginBtn";
import { Edit, Mail, Trash2, User } from "lucide-react";
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

  if(!session?.user?.email){
    return <LoginBtn/>
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <p>No profile found 😢</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 justify-center bg-base-200 p-6">
      <div className="card bg-base-100 h-fit shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            Profile
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-gray-500" />
              <span>{auth.username}</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{auth.email}</span>
            </div>
            <div className="text-sm text-gray-500">
              <p>
                Joined:{" "}
                {auth.createdAt
                  ? new Date(auth.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary btn-sm flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Update
            </button>
            <button className="btn btn-error btn-sm flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
