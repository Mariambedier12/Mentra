"use client";

import React, { useState } from "react";
import Image from "next/image";
import imgl from "@/assets/signup.png";

import lock from "@/assets/secure.png";
import eyeOpen from "@/assets/openeye.png";
import eyeClosed from "@/assets/closedeye.png";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ResetPasswordClientProps {
  emailParam: string;
}

export default function ResetPasswordClient({ emailParam }: ResetPasswordClientProps) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!emailParam) {
      toast.error("Missing email, restart process");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://mentraa.runasp.net/api/Auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailParam,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/auth/password-update");
      } else {
        toast.error(data.message || "Request failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#091A58] min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-28">

          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={imgl}
              alt="illustration"
              className="w-[85%] sm:w-[75%] md:w-[65%] lg:w-full max-w-lg object-contain"
            />
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-[#FAF9F7] rounded-4xl shadow-2xl p-8 md:p-12 min-h-[550px] flex flex-col">

              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => router.back()}
                  className="text-2xl font-bold"
                >
                  ←
                </button>

                <h1 className="text-3xl font-bold text-[#1E1E1E]">Reset Password</h1>
              </div>

              <p className="text-lg text-[#404043] text-center mb-6">
                Enter your new password to get <br /> back on track.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-3 text-md font-bold text-[#404043]">
                    New Password
                  </label>
                  <div className="relative">
                    <Image
                      src={lock}
                      alt="icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-10 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#091A58] outline-none"
                      placeholder="Secure Password (8+ characters)"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Image
                        src={showPassword ? eyeOpen : eyeClosed}
                        alt="toggle"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-md font-bold text-[#404043]">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Image
                      src={lock}
                      alt="icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-10 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#091A58] outline-none"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Image
                        src={showConfirm ? eyeOpen : eyeClosed}
                        alt="toggle"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#091A58] text-white py-3.5 rounded-full hover:opacity-90 transition cursor-pointer"
                >
                  {loading ? "Sending..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
