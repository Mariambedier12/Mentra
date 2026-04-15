import React from "react";
import Image from "next/image";
import Link from "next/link";
import focus from '../../../../assets/sparkle2.png'
import time from '../../../../assets/analysis.png'
import tracking from '../../../../assets/task.png'
import tool from '../../../../assets/icontimer.png'


export default function Choose() {
  return (
    <section className="bg-[#FAF9F7] py-17">

      <div className="max-w-screen-xl mx-auto px-">



        <div className="text-center mb-16">

          <h2 className="text-3xl font-bold text-[#1E1E1E]">
            Engineered for Focus
          </h2>

          <p className="mt-4  max-w-xl mx-auto">
            Features designed to quiet the noise and elevate your work.
          </p>

        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="group bg-[#F4F3F1] p-8 rounded-xl  ">

            <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-3 ">


              <Link href="/">
                <Image src={focus} alt='focus' />
              </Link>

            </div>

            <h3 className="text-lg font-extrabold mb-1 text-[#091A58]  ">
              Smart Summaries
            </h3>

            <p className="text-sm  ">
              AI that distills long <br />
              threads into calm, <br />
              actionable highlights.
            </p>

          </div>

          <div className="group bg-[#E3E2E0] p-8 rounded-xl ">

            <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-3">

              <Link href="/">
                <Image src={time} alt='time' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-1 text-[#091A58] ">
              Analytics
            </h3>

            <p className="text-sm  ">
              AI that distills long <br />
              threads into calm, <br />
              actionable highlights.
            </p>

          </div>





          <div className="group bg-[#F4F3F1] p-8 rounded-xl ">

            <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-3 ">

              <Link href="/">
                <Image src={tracking} alt='tracking' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-1 text-[#091A58] ">
              Task Flow
            </h3>

            <p className="text-sm  ">
              Intelligent chunking for <br />
              projects that feel <br />
              overwhelming.
            </p>

          </div>


          <div className="group bg-[#E3E2E0] p-8 rounded-xl ">

            <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-3">

              <Link href="/">
                <Image src={tool} alt='tool' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2 text-[#091A58] ">
              Focus Timer
            </h3>

            <p className="text-sm  ">
              Visual, non-alarming cues <br />
              to stay within your flow <br />
              state.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
}
