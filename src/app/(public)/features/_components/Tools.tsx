import React from "react";
import Image from "next/image";
import Link from "next/link";

import icon1 from '../../../../assets/icontimer.png'
import icon2 from '../../../../assets/Modes.png'
import icon3 from '../../../../assets/AI.png'



export default function Tools() {
  return (
    <section className="bg-[#FAF9F7] py-14">

      <div className="max-w-screen-xl mx-auto px-6 md:px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold ">
            Tools for your executive function.
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className=" shadow-lg group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#135BEC]/12 mb-4 group-hover:bg-white">


              <Link href="/">
                <Image src={icon1} alt='icon1' />
              </Link>

            </div>

            <h3 className="text-xl text-[#1E1E1E]  font-bold mb-3  group-hover:text-white">
              Visual Timers
            </h3>

            <p className="text-sm text-[#1E1E1E]  group-hover:text-gray-200">
              Stop 'Time Blindness'. <br />
              shrinking visual blocks that help you feel <br />
              the passage of time.
            </p>

          </div>




          <div className="shadow-lg group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#135BEC]/12 mb-4 group-hover:bg-white">

              <Link href="/">
                <Image src={icon2} alt='icon2' />
              </Link>

            </div>

            <h3 className="text-xl text-[#1E1E1E]  font-extrabold mb-3  group-hover:text-white">
              Focus Modes
            </h3>

            <p className="text-sm text-[#1E1E1E]   group-hover:text-gray-200">
              Dynamic environments that block distractions  to help <br />
              you find your flow state.
            </p>

          </div>





          <div className=" group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#135BEC]/12 mb-4 group-hover:bg-white">

              <Link href="/">
                <Image src={icon3} alt='icon3' />
              </Link>

            </div>

            <h3 className="text-xl text-[#1E1E1E]  font-bold mb-3  group-hover:text-white">
              AI
            </h3>

            <p className="text-sm text-[#1E1E1E]   group-hover:text-gray-200">
              Our AI intelligently <br />
              breaks large, scary projects into tiny and <br /> doable steps.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
}