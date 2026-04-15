import React from "react";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../../assets/smoke.png";

export default function StudyBanner() {
  return (
    <div className="w-full flex justify-center bg-[#FAF9F7] py-5">

      <div className="relative w-[97%] max-w-7xl h-[380px] md:h-[420px] rounded-4xl overflow-hidden">


        <Link href="/">
          <Image
            src={banner}
            alt="banner"
            fill
            priority
            className="object-cover object-center"
          />
        </Link>


        <div className="absolute inset-0 bg-gradient-to-r from-[#091A5B]/120 to-[#091A5B]/50"></div>




        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-10">

          <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-9 leading-snug">
            Ready To Study In A Different Way?
          </h1>

          <p className="text-white text-sm md:text-lg mb-10 max-w-2xl">
            Join a new way of studying designed for how your brain actually works
          </p>

          <Link href='auth/register'>

            <button className="bg-white text-[#091A5B] font-bold px-9 py-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition">
              Create Your Account
            </button>

          </Link>

        </div>
      </div>
    </div>
  );
}