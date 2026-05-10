import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon1 from '../../assets/iconbook.png'
import icon2 from '../../assets/icontimer.png'
import icon3 from '../../assets/iconquestion.png'


export default function Focus() {
  return (
    <section className="bg-[#FAF9F7] py-18">

      <div className="max-w-screen-xl mx-auto px-8">



        <div className="text-center mb-16">

          <h2 className="text-3xl font-bold ">
            Struggling to Stay Focused?
          </h2>

          <p className="mt-4  max-w-xl mx-auto">
            We turn overwhelming syllabi into bite-sized, manageable wins.
          </p>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">




          <div className="group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#135BEC]/12 mb-6 group-hover:bg-white">


              <Link href="/">
                <Image src={icon1} alt='icon1' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2  group-hover:text-white">
              End Overwhelm
            </h3>

            <p className="text-sm  group-hover:text-gray-200">
              We simplify your workflow and guide <br /> you step by step to stay focused.
            </p>

          </div>




          <div className="group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#135BEC]/12 mb-6 group-hover:bg-white">

              <Link href="/">
                <Image src={icon2} alt='icon2' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2 text-[#1F1F1F] group-hover:text-white">
              Smart Focus
            </h3>

            <p className="text-sm  group-hover:text-gray-200">
              Smart timers that adapt to your energy <br /> levels to keep you in the
              zone without <br /> burnout.
            </p>

          </div>





          <div className="group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#135BEC]/12 mb-6 group-hover:bg-white">

              <Link href="/">
                <Image src={icon3} alt='icon3' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2 text-[#1F1F1F] group-hover:text-white">
              Better Retention
            </h3>

            <p className="text-sm  group-hover:text-gray-200">
              Interactive quizzes generated <br /> automatically from your <br /> materials.
              It helps you check your <br /> understanding and stay on track.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
}