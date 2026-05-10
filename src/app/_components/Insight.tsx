import React from "react";
import Image from "next/image";
import progressImg from "../../assets/insights.png";

import insight from "../../assets/iconinsights.png";
import cup from "../../assets/iconscup.png";

export default function Insight() {
  return (
    <section className="bg-[#F1F5F9] py-24">

      <div className="max-w-screen-xl mx-auto px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">



          <div>

            <h2 className="text-3xl font-bold  mb-6">
              See your study progress .
            </h2>

            <p className="text-lg mb-10 max-w-md">
              Track how long you studied, what subjects you focused on, and
              watch your progress grow over time.
            </p>



            <div className="flex items-start gap-4 mb-6">

              <div className="w-10 h-10 rounded-full bg-[#135BEC]/20 flex items-center justify-center">
                <Image src={insight} alt="icon" className="w-4 h-4" />
              </div>

              <div>
                <h3 className="font-bold">
                  Study pattern insights
                </h3>
                <p className="text-sm ">
                  Discover when you focus.
                </p>
              </div>

            </div>




            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-[#135BEC]/20 flex items-center justify-center">
                <Image src={cup} alt="icon" className="w-4 h-4" />
              </div>

              <div>
                <h3 className="font-bold">
                  Consistent study tracking
                </h3>
                <p className="text-sm ">
                  Monitor your study streaks and stay motivated by seeing your
                  progress build day after day.
                </p>
              </div>

            </div>

          </div>


          <div className="flex justify-center lg:justify-end">

            <Image
              src={progressImg}
              alt="progress"
              className="w-full max-w-lg rounded-xl "
            />

          </div>

        </div>

      </div>

    </section>
  );
}