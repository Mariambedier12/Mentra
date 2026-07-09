import React from 'react'

import Image from "next/image";
import team from "../../../../assets/group.png";

export default function Vision() {
  return (
    <section className="bg-[#FAF9F7] pt-15 pb-3">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center">


          <div className="relative w-full max-w-md shadow-xl mx-auto md:mx-0">


            <div className="rounded-2xl overflow-hidden">
              <Image
                src={team}
                alt="team"
                className="w-full h-auto object-cover"
              />
            </div>


            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-[260px]">
              <p className="text-xs sm:text-sm font-semibold leading-relaxed text-[#1E1E1E]">
                "Focus isn't about doing more. It's about feeling safe enough
                to do one thing at a time."
              </p>
            </div>

          </div>


          <div className="text-center md:text-left mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#091A58] mb-7">
              Born from a shared vision.
            </h2>

            <p className="text-[#1E1E1E] leading-loose mb-4 text-sm md:text-base">
              Mentra began as a graduation project by 9 neurodivergent <br className="hidden md:inline" /> students
              who were tired of systems that didn’t understand how <br className="hidden md:inline" /> their brains worked.
              We didn’t just want to build another tool; we <br className="hidden md:inline" /> wanted to create a cognitive
              sanctuary where focus is found <br className="hidden md:inline" /> through support, not struggle.
            </p>

            <p className=" text-[#1E1E1E] leading-loose text-sm md:text-base">
              Mentra is that sanctuary—a neuro-inclusive productivity layer that <br className="hidden md:inline" /> adapts
              to <br className="hidden md:inline" /> your brain, rather than forcing your brain to adapt to the machine.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
