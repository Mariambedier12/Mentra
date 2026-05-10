import React from 'react'
import Image from "next/image";
import img from '../../assets/header.png'
import Link from 'next/link';

export default function Header() {

  return (
    <section
      className="w-full mt-15 pt-32 pb-0  min-h-[400px] "
      style={{
        background:
          "linear-gradient(150deg, #FAF9F7 40%, #8C94B1 100%, #091A58 100%)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between">


        <div className="max-w-xl">

          <h1 className="text-5xl font-bold leading-tight drop-shadow-[0_3px_4px_rgba(19,91,236,0.25)]  ">
            Study in a Way Your <br />
            Brain <span className="text-[#091A58] drop-shadow-[0_2px_4px_rgba(19,91,236,0.25)] font-bold">Understands.</span>
          </h1>

          <p className="[text-shadow:0_3px_4px_rgba(128,128,128,0.5)] mt-6  text-lg leading-relaxed">
            Transform overwhelming study materials into clear, <br />
            structured, and distraction-free content designed
            <br />specifically for ADHD learners.
          </p>

          <Link href='auth/register'>
            <button className="mt-8 px-12 py-3 bg-[#091A58] drop-shadow-[0_2px_4px_rgba(19,91,236,0.5)] font-semibold cursor-pointer text-white rounded-3xl shadow-lg flex items-center gap-2 hover:opacity-90 transition">

              Get Started

              <span className="text-lg">→</span>

            </button>
          </Link>

          <div className="flex items-center gap-3 mt-6 pb-5">


            <div className="flex -space-x-2">
              <div className="w-7 h-7 bg-orange-300 rounded-full border-2 border-white"></div>
              <div className="w-7 h-7 bg-yellow-300 rounded-full border-2 border-white"></div>
              <div className="w-7 h-7 bg-orange-200 rounded-full border-2 border-white"></div>
            </div>

            <p className=" [text-shadow:0_3px_4px_rgba(128,128,128,0.5)] text-sm font-bold text-[#8C8C8C] ">
              Joined by{" "}
              <span className="text-[#135BEC] font-semibold">
                10,000+
              </span>{" "}
              students this month
            </p>

          </div>


        </div>



        <div className="flex justify-center lg:justify-end items-end h-full ">


          <Link href="/" >
            <Image src={img} alt='img'

              className="w-full max-w-lg object-contain self-end" />
          </Link>



        </div>

      </div>
    </section>
  );
}


