import React from "react";
import Image from "next/image";
import icon4 from '../../assets/uploaddark.png'
import icon5 from '../../assets/breakdark.png'
import icon6 from '../../assets/timerdark.png'
import Link from "next/link";

export default function Works() {
  return (
    <section className="bg-[#FAF9F7] py-18">

      <div className="max-w-screen-xl mx-auto px-">



        <div className="text-center mb-15">

          <h2 className="text-3xl font-bold text-[#1F1F1F]">
            How Mentra works for you
          </h2>

          <p className="mt-4  max-w-xl mx-auto">
            We turn overwhelming syllabi into bite-sized, manageable wins.
          </p>

        </div>




        <div className="relative">


          <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gray-300"></div>




          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">




            <div>

              <div className="flex justify-center mb-6 relative z-10">

                <Link href="/">
                  <div className="w-15 h-15 rounded-full bg-[#5690D1]/51 flex items-center justify-center">
                    <Image
                      src={icon4}
                      alt="upload"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </Link>

              </div>

              <h3 className="font-bold mb-3">
                1. Start with material
              </h3>

              <p className="text-md">
                Upload your file.
              </p>

            </div>




            <div>

              <div className="flex justify-center mb-6 relative z-10">

                <Link href="/">
                  <div className="w-15 h-15 rounded-full bg-[#5690D1]/51 flex items-center justify-center">
                    <Image
                      src={icon5}
                      alt="upload"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </Link>

              </div>

              <h3 className="font-bold mb-3">
                2. AI Break Down
              </h3>

              <p className="text-md">
                Mentra turns it into clear summaries <br /> and focused highlights
                designed for <br />your brain.
              </p>

            </div>



            <div>

              <div className="flex justify-center mb-6 relative z-10">

                <Link href="/">
                  <div className="w-15 h-15 rounded-full bg-[#5690D1]/51 flex items-center justify-center">
                    <Image
                      src={icon6}
                      alt="upload"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </Link>

              </div>

              <h3 className="font-bold mb-3">
                3. Focused Study
              </h3>

              <p className="text-md">
                Use simple study timers to stay <br /> focused and avoid distractions.
              </p>

            </div>


          </div>

        </div>

      </div>

    </section>
  );
}