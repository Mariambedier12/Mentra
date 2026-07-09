import React from 'react'
import Image from "next/image";
import imghead from '../../../../assets/header2.png'
import Link from 'next/link';

export default function Header() {

  return (
    <section
      className="w-full mt-15 pt-13 pb-13  "
      style={{
        background:
          "linear-gradient(300deg, #FAF9F7 40%, #8C94B1 140%, #091A58 150%)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">


        <div className="max-w-xl flex flex-col items-center lg:items-start">

          <h1 className="text-5xl md:text-7xl text-[#091A58] font-extrabold leading-tight drop-shadow-[0_3px_4px_rgba(19,91,236,0.25)]  ">
            Mentra
          </h1>

          <p className="[text-shadow:0_3px_4px_rgba(128,128,128,0.5)] mt-6  text-lg md:text-xl leading-relaxed">
            Transform overwhelming study materials <br className="hidden md:inline" /> into clear,
            structured, and distraction-free <br className="hidden md:inline" /> content designed
            specifically for ADHD <br className="hidden md:inline" /> learners.
          </p>

          <Link href="/auth/register">

            <button className="mt-9 px-12 py-3 bg-[#091A58] drop-shadow-[0_2px_4px_rgba(19,91,236,0.5)] font-semibold cursor-pointer text-white rounded-3xl shadow-lg flex items-center gap-2 hover:opacity-90 transition">

              Get Started

              <span className="text-lg">→</span>

            </button>

          </Link>




        </div>



        <div className="flex justify-center lg:justify-end items-center h-full w-full max-w-md lg:max-w-lg">


          <Link href="/" className="w-full">
            <Image src={imghead} alt='img'

              className="w-full h-auto object-contain " />
          </Link>



        </div>

      </div>
    </section>
  );
}


