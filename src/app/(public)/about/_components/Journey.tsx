import React from "react";
import Image from "next/image";
import icon4 from '../../../../assets/overwhelm.png'
import icon5 from '../../../../assets/sparkles.png'
import icon6 from '../../../../assets/scan2.png'
import Link from "next/link";

export default function Works() {
  return (
    <section className="bg-[#FAF9F7] py-18">

      <div className="max-w-screen-xl mx-auto px-6 md:px-8">



        <div className="text-center mb-15">

          <h2 className="text-3xl font-extrabold text-[#1E1E1E]">
            Your Journey to Focus
          </h2>



        </div>




        <div className="relative">


          <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-[#E9E8E6]/30"></div>




          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">




            <div>

              <div className="flex justify-center mb-6 relative z-10">

                <Link href="/">
                  <div className="w-16 h-16 rounded-full bg-[#E9E8E6] flex items-center justify-center border-2 border-[#FAF9F7] shadow-lg">
                    <Image
                      src={icon4}
                      alt="upload"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </Link>

              </div>

              <h3 className="font-extrabold mb-3 text-lg   ">
                The Overwhelm
              </h3>

              <p className="text-md">
                Disjointed tasks and a noisy digital <br />
                environment cluttering your mind.
              </p>

            </div>




            <div>

              <div className="flex justify-center mb-6 relative z-10">

                <Link href="/">
                  <div className="w-16 h-16 rounded-full bg-[#135BEC]/10 flex items-center justify-center shadow-lg">
                    <Image
                      src={icon5}
                      alt="upload"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </Link>

              </div>

              <h3 className="font-bold mb-3 text-lg">
                Mentra
              </h3>

              <p className="text-md">
                AI-driven prioritization based <br /> on your energy levels.
              </p>

            </div>


            <div>

              <div className="flex justify-center mb-6 relative z-10">

                <Link href="/">
                  <div className="w-16 h-16 rounded-full bg-[#5690D1]/60 flex items-center justify-center shadow-lg">
                    <Image
                      src={icon6}
                      alt="upload"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </Link>

              </div>

              <h3 className="font-bold mb-3 text-lg">
                Focused Study
              </h3>

              <p className="text-md">
                Flow state achieved through guided <br /> focus blocks.
              </p>

            </div>


          </div>

        </div>

      </div>

    </section>
  );
}