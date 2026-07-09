import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon1 from '../../../../assets/planeicon.png'
import icon2 from '../../../../assets/visionicon.png'



export default function Mission() {
  return (
    <section className="bg-[#FAF9F7] py-18">

      <div className="max-w-screen-xl mx-auto px-6 md:px-8">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">




          <div className="group bg-[#E3E2E0] px-8 py-10 rounded-2xl ">

            <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-lg bg-[#091A58]">


              <Link href="/">
                <Image src={icon1} alt='icon1' />
              </Link>

            </div>

            <h3 className="text-xl font-bold mb-3  text-[#1E1E1E]">
              Our Mission
            </h3>

            <p className="text-sm  text-[#1E1E1E] leading-relaxed">
              To de-stigmatize neurodivergence in professional <br className="hidden md:inline" />
              environments by creating cognitive accessibility tools <br className="hidden md:inline" />
              that empower individuals to leverage their unique mental <br className="hidden md:inline" />
              frameworks.
            </p>

          </div>




          <div className="group bg-[#5690D1]/51 p-8 rounded-xl ">

            <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-lg bg-[#E3E2E0]">

              <Link href="/">
                <Image src={icon2} alt='icon2' />
              </Link>

            </div>

            <h3 className="text-xl font-bold mb-3 text-[#1E1E1E]">
              Our Vision
            </h3>

            <p className="text-sm  text-[#1E1E1E] leading-relaxed">
              A world where the digital landscape is intuitively <br className="hidden md:inline" />
              designed for every cognitive profile, allowing focus to be <br className="hidden md:inline" />
              a universal human right, not a struggle of willpower.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
}