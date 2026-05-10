import React from "react";
import Image from "next/image";
import Link from "next/link";
import focus from '../../assets/iconfocus.png'
import time from '../../assets/icontime.png'
import tracking from '../../assets/icontracking.png'
import tool from '../../assets/icontool.png'


export default function Choose() {
  return (
    <section className="bg-[#FAF9F7] py-17 px-8">

      <div className="max-w-screen-xl mx-auto px-">



        <div className="text-center mb-16">

          <h2 className="text-3xl font-bold ">
            Why Choose Mentra?
          </h2>

          <p className="mt-4  max-w-xl mx-auto">
            We turn overwhelming syllabi into bite-sized, manageable wins.
          </p>

        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#135BEC]/12 mb-6 group-hover:bg-white">


              <Link href="/">
                <Image src={focus} alt='focus' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2  group-hover:text-white">
              Focused Learning
            </h3>

            <p className="text-sm  group-hover:text-gray-200">
              Personalized study <br /> sessions designed to <br /> maximize focus and <br /> efficiency.
            </p>

          </div>




          <div className="group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#135BEC]/12 mb-6 group-hover:bg-white">

              <Link href="/">
                <Image src={time} alt='time' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2 text-[#1F1F1F] group-hover:text-white">
              Smart Time Management
            </h3>

            <p className="text-sm  group-hover:text-gray-200">
              Intelligent timers and <br /> reminders to manage your <br /> study schedule effortlessly.
            </p>

          </div>





          <div className="group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#135BEC]/12 mb-6 group-hover:bg-white">

              <Link href="/">
                <Image src={tracking} alt='tracking' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2 text-[#1F1F1F] group-hover:text-white">
              Insightful Progress Tracking
            </h3>

            <p className="text-sm  group-hover:text-gray-200">
              Clear insights into your <br /> study patterns to improve <br /> productivity over time.
            </p>

          </div>


          <div className="group bg-white p-8 rounded-xl transition duration-300 hover:bg-[#091A58]">

            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#135BEC]/20 mb-6 group-hover:bg-white">

              <Link href="/">
                <Image src={tool} alt='tool' />
              </Link>

            </div>

            <h3 className="text-lg font-bold mb-2 text-[#1F1F1F] group-hover:text-white">
              Supportive Tools & Resources
            </h3>

            <p className="text-sm  group-hover:text-gray-200">
              Tools to help summarize, <br /> organize, and retain <br /> knowledge effectively.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
}
