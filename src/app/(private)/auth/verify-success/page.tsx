"use client";

import React from "react";
import Image from "next/image";
import successIcon from "@/assets/successicon.png";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifySuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const handleContinue = () => {
    router.push(`/auth/reset-password?email=${email}`);
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen flex items-center justify-center px-6 py-8">

      {/* CARD */}
      <div className="w-full max-w-4xl min-h-[75vh] bg-[#FAF9F7] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.18)] flex flex-col items-center justify-center text-center px-16 py-20">

        {/* ICON */}
        <div className="mb-5">
          <Image
            src={successIcon}
            alt="success"
            className="w-40 h-40 object-contain "
          />
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-[#1E1E1E] mb-8">
          Email Verified
        </h1>

        {/* TEXT */}
        <p className="text-[#1E1E1E] text-lg mb-13">
          You can now continue to reset your password
        </p>

        {/* BUTTON */}
        <button
          onClick={handleContinue}
          className="w-full max-w-sm bg-[#091A58] text-white py-4 rounded-full text-lg hover:opacity-90 transition cursor-pointer"
        >
          Continue
        </button>

      </div>
    </div>
  );
}