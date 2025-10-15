"use client";

import { AlertTriangle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/10 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full border border-slate-200">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Page Not Found</h1>
        <p className="text-slate-500 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="btn btn-primary gap-2"
        >
          <Home className="w-4 h-4" />
          Go Home
        </button>
      </div>
      <p className="text-slate-400 text-sm mt-6">
        © {new Date().getFullYear()} Sanmith Devadiga
      </p>
    </div>
  );
}
