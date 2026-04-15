import React from 'react'
import Image from "next/image";
import imghead from '../../../../assets/student (2).png'
import Link from 'next/link';

export default function Header() {

  return (
    <section
      className="w-full mt-20 pt-13 pb-13 bg-[#FAF9F7]  "

    >
      <div className="max-w-screen-xl mx-auto px- flex items-center justify-between">


        <div className="max-w-xl">

          <h1 className="text-5xl text-[#1E1E1E] font-extrabold leading-tight drop-shadow-[0_3px_4px_rgba(19,91,236,0.25)]  ">
            Productivity
            designed for the
          </h1>
          <br />
          <h1 className="text-5xl text-[#1E1E1E] font-extrabold leading-tight drop-shadow-[0_3px_4px_rgba(19,91,236,0.25)]  ">
            <span className='text-[#091A58]'>
              neurodivergent
            </span>
            <br />

            brain.
          </h1>

          <p className=" text-[#454650] mt-6  text-md leading-relaxed">
            Traditional methods fight against your brain. <br />
            Mentra works with it.
          </p>
          <p className=" text-[#454650] text-md leading-relaxed">

            Break tasks down, visualizes time, and build momentum <br /> without the overwhelm.
          </p>
          
          <Link href="/auth/register">

            <button className="mt-9 px-12 py-3 bg-[#091A58] drop-shadow-[0_2px_4px_rgba(19,91,236,0.5)] font-semibold cursor-pointer text-white rounded-3xl shadow-lg flex items-center gap-2 hover:opacity-90 transition">

              Try Mentra



            </button>

          </Link>




        </div>



        <div className="flex justify-center lg:justify-end  h-full ">


          <Link href="/" >
            <Image src={imghead} alt='img'

              className="w-full max-w-lg object-contain " />
          </Link>



        </div>

      </div>
    </section>
  );
}


