

import Image from "next/image";
import timers from '../../../../assets/Visual Timers.png'

export default function VisualTimers() {
  return (
    <section className="bg-[#FAF9F7] py-6">

      <div className="max-w-screen-xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* IMAGE */}
        <div className=" flex justify-center lg:justify-start w-full max-w-lg mx-auto lg:mx-0">

          <div className="relative w-full">

            {/* الخلفية الوهمية */}
            <div className="bg-[#EFEEEC]  rounded-3xl p-3 flex items-center justify-center">

              <div className="translate-y-[9px] w-full">
                {/* الصورة */}
                <Image
                  src={timers}
                  alt="timers"
                  width={500}
                  height={320}
                  className="rounded-3xl object-cover w-full h-auto"
                />
              </div>
            </div>



          </div>

        </div>

        {/* TEXT */}
        <div className="text-center lg:text-left">

          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Visual Timers that <br className="hidden md:inline" /> Actually Work
          </h2>

          <p className="text-[#1E1E1E] mt-5 leading-relaxed text-sm md:text-base">
            Numbers don’t always compute for neurodivergent brains. Our
            ‘Tidal Timers’ use organic, shifting shapes that visually
            deplete as time runs out, giving you a visceral sense of
            urgency without the panic.
          </p>

          {/* QUOTE BOX */}
          <div className="mt-8 bg-[#F4F3F1] rounded-xl p-5 border-l-4 border-[#00052B] text-left">
            <p className="text-sm text-[#1E1E1E]">
              “Finally, a timer that doesn’t just make me anxious,
              but actually helps me pace myself.”
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}