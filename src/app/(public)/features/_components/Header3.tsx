import React from 'react'
import Image from "next/image";
import imghead from '../../../../assets/student (2).png'
import Link from 'next/link';

export default function Header() {

  return (
    <section
      className="w-full mt-20 pt-13 pb-13 bg-[#FAF9F7]  "

    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">


        <div className="max-w-xl flex flex-col items-center lg:items-start">

          <h1 className="text-4xl md:text-5xl text-[#1E1E1E] font-extrabold leading-tight drop-shadow-[0_3px_4px_rgba(19,91,236,0.25)]  ">
            Productivity designed for the <span className='text-[#091A58]'>neurodivergent</span> brain.
          </h1>

          <p className=" text-[#454650] mt-6 text-sm md:text-md leading-relaxed">
            Traditional methods fight against your brain. <br className="hidden md:inline" />
            Mentra works with it.
          </p>
          <p className=" text-[#454650] text-sm md:text-md leading-relaxed">

            Break tasks down, visualizes time, and build momentum <br className="hidden md:inline" /> without the overwhelm.
          </p>

          <Link href="/auth/register">

            <button className="mt-9 px-12 py-3 bg-[#091A58] drop-shadow-[0_2px_4px_rgba(19,91,236,0.5)] font-semibold cursor-pointer text-white rounded-3xl shadow-lg flex items-center gap-2 hover:opacity-90 transition">

              Try Mentra

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


