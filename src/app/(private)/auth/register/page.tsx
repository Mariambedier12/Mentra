"use client";

import React from 'react'
import Image from "next/image";
import img from '../../../../assets/signup.png'
import person from '../../../../assets/person.png'
import email from '../../../../assets/msg.png'
import lock from '../../../../assets/secure.png'
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();

  return (
    <div className='bg-[#091A58] min-h-screen flex flex-col'>

      {/* SECTION */}
      <section className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-28">

          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={img}
              alt="illustration"
              className="w-[85%] sm:w-[75%] md:w-[65%] lg:w-full max-w-lg object-contain"
            />
          </div>

          {/* FORM */}
          <div className="w-full lg:w-1/2 flex justify-center">

            <div className="w-full max-w-md bg-[#FAF9F7] rounded-4xl shadow-2xl p-8 md:p-12 min-h-[550px] flex flex-col justify-between">

              {/* HEADER + BACK BUTTON */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => {
                    if (window.history.length > 1) {
                      router.back();
                    } else {
                      router.push("/");
                    }
                  }}
                  className="text-[#1E1E1E] cursor-pointer text-2xl font-bold hover:opacity-70 transition"
                >
                  ←
                </button>

                <h1 className="text-3xl font-bold text-[#1E1E1E]">
                  Sign up
                </h1>
              </div>

              <form className="space-y-6">

                {/* NAME */}
                <div>
                  <label className="block mb-2 text-md font-semibold text-[#404043]">
                    Name
                  </label>

                  <div className="relative">
                    <Image src={person} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="text"
                      className="w-full pl-11 p-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#091A58]"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-2 text-md font-bold text-[#404043]">
                    Email
                  </label>

                  <div className="relative">
                    <Image src={email} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="email"
                      className="w-full pl-11 p-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#091A58]"
                      placeholder="your email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block mb-2 text-md font-bold text-[#404043]">
                    Password
                  </label>

                  <div className="relative">
                    <Image src={lock} alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                      type="password"
                      className="w-full pl-11 p-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#091A58]"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* CHECKBOX */}
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 w-4 h-4" required />
                  <p className="text-sm text-[#404043] leading-relaxed">
                    I agree to the{" "}
                    <span className="text-[#5690D1] font-semibold cursor-pointer">
                      Terms and Conditions
                    </span>
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-[#091A58] text-xl text-white py-3.5 rounded-full hover:opacity-90 transition"
                >
                  Sign Up
                </button>

                {/* LOGIN */}
                <p className="text-sm text-[#404043] text-center pt-2">
                  Already a member?{" "}
                  <Link href="/auth/login" className="text-[#091A58] font-semibold cursor-pointer">
                    Log In
                  </Link>
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}