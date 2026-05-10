"use client";

import React, { useState } from "react";
import Image from "next/image";
import imgl from "@/assets/signup.png";
import emailIcon from "@/assets/msg.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://mentraa.runasp.net/api/Auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      console.log("FORGOT PASSWORD RESPONSE:", data);

      if (res.ok) {
        toast.success("Reset code sent successfully!");

        // ✅ هنا التعديل المهم
        router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(data.message || "Invalid email or request failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#091A58] min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-28">

          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={imgl}
              alt="illustration"
              className="w-[85%] sm:w-[75%] md:w-[65%] lg:w-full max-w-lg object-contain"
            />
          </div>

          {/* FORM */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-[#FAF9F7] rounded-4xl shadow-2xl p-8 md:p-12 min-h-[550px] flex flex-col">

              {/* HEADER */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => {
                      if (window.history.length > 1) {
                        router.back();
                      } else {
                        router.push("/");
                      }
                    }}
                    className="text-[#1E1E1E] cursor-pointer text-2xl font-bold"
                  >
                    ←
                  </button>

                  <h1 className="text-3xl font-bold text-[#1E1E1E]">
                    Forget Password
                  </h1>
                </div>

                <p className="text-lg text-[#404043] text-center mb-5">
                  Enter your email and we'll send <br />
                  you a code to reset your password
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="block mb-3 text-md font-bold text-[#404043]">
                    Email
                  </label>

                  <div className="relative">
                    <Image
                      src={emailIcon}
                      alt="icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#091A58] outline-none"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#091A58] text-xl text-white py-3.5 rounded-full hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send"}
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}