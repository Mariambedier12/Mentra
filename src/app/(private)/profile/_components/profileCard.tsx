"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import editIcon from "@/assets/edit.png";
import logoutIcon from "@/assets/logout.png";

interface Props {
  name: string;
  email: string;
  image?: string;
  adhdLevel?: string;
  onImageChange: (file: File) => void;
}

export default function ProfileCard({
  name,
  email,
  image,
  adhdLevel,
  onImageChange,
}: Props) {

  const profileImage =
    image && image.trim() !== ""
      ? image
      : `https://ui-avatars.com/api/?name=${name}`;

  return (
    <div className="flex flex-col items-center text-center w-full">

      {/* IMAGE */}
      <div className="relative mb-6">

        <img
          src={profileImage}
          alt="profile"
          className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-md"
        />

        {/* EDIT */}
        <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#091A58] flex items-center justify-center cursor-pointer">

          <Image
            src={editIcon}
            alt="edit"
            className="w-3 h-3"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              onImageChange(file);
            }}
          />

        </label>

      </div>

      {/* NAME */}
      <h2 className="text-[30px] font-bold text-[#1E1E1E] leading-none mb-3">
        {name}
      </h2>

      {/* EMAIL */}
      <p className="text-[#1E1E1E] text-[15px] mb-5">
        {email}
      </p>

      {/* ADHD LEVEL */}
      <div className="bg-[#E3E2E0] text-[#091A58] px-5 py-2 rounded-full text-sm font-semibold mb-6">
        {adhdLevel || "Severe ADHD"}
      </div>

      {/* INSIGHTS */}
      <Link
        href="/insights"
        className="flex items-center gap-2 text-[#1E1E1E] text-sm mb-8 hover:opacity-70 transition"
      >
        View detailed learning insights
        <span className="text-[#091A58] font-bold text-lg">→</span>
      </Link>

      {/* LOGOUT */}
      <button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="flex items-center gap-2 text-red-500 text-sm font-medium cursor-pointer"
      >
        <Image
          src={logoutIcon}
          alt="logout"
          className="w-4 h-4"
        />

        Log Out
      </button>

    </div>
  );
}