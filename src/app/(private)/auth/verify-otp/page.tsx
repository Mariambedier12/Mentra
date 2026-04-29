"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import imgl from "@/assets/signup.png";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // hide email
  function maskEmail(email: string) {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const masked =
      name.slice(0, 2) + "*****" + name.slice(-1);
    return masked + "@" + domain;
  }

  const email = maskEmail(emailParam);

  // timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // input change
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  // backspace
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  // verify
  const handleSubmit = async () => {
    const code = otp.join("").trim();

    if (code.length < 6) {
      toast.error("Enter full code");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailParam,
          otp: code,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Code verified!");
        localStorage.setItem("otp_code", code);
        router.push(`/auth/verify-success?email=${emailParam}`);
      } else {
        toast.error(data.message || "Invalid code");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  // resend
  const handleResend = async () => {
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailParam,
        }),
      });

      if (res.ok) {
        toast.success("Code resent!");
        setTimeLeft(60);
      } else {
        toast.error("Failed to resend code");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

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

          {/* CARD */}
          <div className="w-full lg:w-1/2 flex justify-center">

            <div className="w-full max-w-md bg-[#FAF9F7] rounded-4xl shadow-2xl p-8 md:p-12 min-h-[550px] flex flex-col justify-between">

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => router.back()}
                  className="text-[#1E1E1E] text-2xl font-bold cursor-pointer"
                >
                  ←
                </button>

                <h1 className="text-3xl font-bold text-[#1E1E1E]">
                  Verification
                </h1>
              </div>

              {/* OTP */}
              <div className="flex justify-center gap-3 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) =>
                      handleChange(e.target.value, index)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-14 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#091A58]"
                  />
                ))}
              </div>

              {/* TEXT */}
              <p className="text-md text-[#1E1E1E] text-center mb-4">
                Please enter the code we sent to
                <br />
                <span className=" text-[#091A58]">
                  {email}
                </span>
              </p>

              {/* TIMER */}
              <p className="text-sm text-[#1E1E1E] text-center mb-2">
                Code expires in 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </p>

              {/* RESEND */}
              <button
                onClick={handleResend}
                className="text-xs  text-gray-400 font-semibold mb-6 block mx-auto cursor-pointer"
              >
                Resend code
              </button>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={!isComplete || loading}
                className={`w-full py-3.5 rounded-full text-white text-lg transition cursor-pointer
                  ${isComplete
                    ? "bg-[#091A58] hover:opacity-90"
                    : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>

            </div>

          </div>

        </div>

      </section>
    </div>
  );
}