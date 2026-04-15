import React from 'react'

import Image from "next/image";
import team from "../../../../assets/group.png";

export default function Vision() {
  return (
    <section className="bg-[#FAF9F7] pt-15 pb-3">
      <div className="max-w-screen-xl mx-auto px-">

        <div className="grid md:grid-cols-2 gap-15 items-center">


          <div className="relative w-full max-w-md shadow-xl">


            <div className="rounded-2xl overflow-hidden">
              <Image
                src={team}
                alt="team"
                className="w-full h-full object-cover"
              />
            </div>


            <div className="absolute top-80 left-60 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-[260px] shadow-lg">
              <p className="text-sm font-semibold leading-relaxed">
                "Focus isn't about doing more. It's about feeling safe enough
                to do one thing at a time."
              </p>
            </div>

          </div>


          <div>
            <h2 className="text-4xl font-extrabold text-[#091A58] mb-7">
              Born from a shared vision.
            </h2>

            <p className="text-[#1E1E1E] leading-loose mb-4">
              Mentra began as a graduation project by 9 neurodivergent <br /> students
              who were tired of systems that didn’t understand how <br /> their brains worked.
              We didn’t just want to build another tool; we <br /> wanted to create a cognitive
              sanctuary where focus is found <br /> through support, not struggle.
            </p>

            <p className=" text-[#1E1E1E] leading-loose">
              Mentra is that sanctuary—a neuro-inclusive productivity layer that <br /> adapts
              to <br /> your brain, rather than forcing your brain to adapt to the machine.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
