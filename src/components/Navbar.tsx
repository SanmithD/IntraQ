"use client";

import { FileQuestion, Menu, Search, User, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginBtn from "./LoginBtn";

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full shadow-sm bg-gradient-to-br from-gray-300 via-gray-400/20 to-red-400/20 border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div
          onClick={() => router.push("/")}
          className="flex items-center active:animate-ping cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            height={50}
            width={50}
            className="md:w-[70px] md:h-[70px] rounded-md animate-pulse "
          />
          <span className="font-semibold font-mono text-2xl">Intra Q</span>
        </div>

        <div className="hidden md:flex items-center space-x-5">
          <button
            onClick={() => router.push(`/pages/Search`)}
            className="flex items-center space-x-2 hover:bg-gray-400 active:animate-ping cursor-pointer rounded-lg px-3 py-2"
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Search</span>
          </button>
          <button
            onClick={() => router.push(`/pages/Questions/New-Question`)}
            className="flex items-center space-x-2 hover:bg-gray-400 active:animate-ping cursor-pointer rounded-lg px-3 py-2"
          >
            <FileQuestion className="w-5 h-5" />
            <span className="font-medium">Post New</span>
          </button>
          <button
            onClick={() => router.push(`/pages/Client`)}
            className="flex items-center space-x-2 hover:bg-gray-400 active:animate-ping cursor-pointer rounded-lg px-3 py-2"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>

          <button className="flex items-center space-x-2 rounded-lg px-3 py-2">
            <LoginBtn />
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => router.push(`/pages/Search`)}
              className="flex items-center space-x-2 hover:bg-gray-400 active:animate-ping rounded-lg px-3 py-2"
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Search</span>
            </button>
            <button
              onClick={() => router.push(`/pages/Questions/New-Question`)}
              className="flex items-center space-x-2 hover:bg-gray-400 active:animate-ping cursor-pointer rounded-lg px-3 py-2"
            >
              <FileQuestion className="w-5 h-5" />
              <span className="font-medium">Post New</span>
            </button>
            <button
              onClick={() => router.push(`/pages/Client`)}
              className="flex items-center space-x-2 hover:bg-gray-400 active:animate-ping rounded-lg px-3 py-2"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>

            <button className="flex items-center space-x-2 rounded-lg px-3 py-2">
              <LoginBtn />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
