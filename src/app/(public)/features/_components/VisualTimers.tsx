

import Image from "next/image";
import timers from '../../../../assets/Visual Timers.png'

export default function VisualTimers() {
  return (
    <section className="bg-[#FAF9F7] py-6">

      <div className="max-w-screen-xl mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-60 items-center">

        {/* IMAGE */}
        <div className=" flex justify-center lg:justify-end">

          <div className="relative  ">

            {/* الخلفية الوهمية */}
            <div className="bg-[#EFEEEC]  rounded-3xl p-3 flex items-center justify-center">

              <div className="translate-y-[9px]">
                {/* الصورة */}
                <Image
                  src={timers}
                  alt="timers"
                  width={500}
                  height={320}
                  className="rounded-3xl object-cover   "
                />
              </div>
            </div>



          </div>

        </div>

        {/* TEXT */}
        <div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Visual Timers that <br /> Actually Work
          </h2>

          <p className="text-[#1E1E1E] mt-5 leading-relaxed">
            Numbers don’t always compute for neurodivergent brains. Our
            ‘Tidal Timers’ use organic, shifting shapes that visually
            deplete as time runs out, giving you a visceral sense of
            urgency without the panic.
          </p>

          {/* QUOTE BOX */}
          <div className="mt-8 bg-[#F4F3F1] rounded-xl p-5  border-l-4 border-[#00052B] ">
            <p className="text-sm text-[#1E1E1E] ">
              “Finally, a timer that doesn’t just make me anxious,
              but actually helps me pace myself.”
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}