import Image from "next/image";
import summaries from '../../../../assets/summaries2.png'
import timer from '../../../../assets/timerdark2.png'
import analysis from '../../../../assets/analysis2.png'
import list from '../../../../assets/check2.png'
import support from '../../../../assets/group2.png'

export default function Think() {
  return (
    <section className="bg-[#EFEEEC] py-20">

      <div className="max-w-screen-xl mx-auto px-6 md:px-8">


        <div className="text-center mb-14">
          <h1 className="text-3xl font-semibold text-gray-900">
            Designed for how you think.
          </h1>
          <p className=" text-[#1E1E1E] mt-2">
            Beyond productivity—pure cognitive harmony.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-[1.7fr_0.7fr_0.9fr] md:grid-rows-2 gap-6">


          <div className="bg-[#E3E2E0] rounded-2xl p-6 flex flex-col justify-end min-h-[180px]">
            <div>
              <Image src={summaries} alt="" width={35} height={35} />
              <h3 className="mt-4 font-bold text-lg">Smart Summaries</h3>
              <p className="text-sm text-[#1E1E1E] mt-2">
                Instant, high-level overviews of complex study materials.
              </p>
            </div>
          </div>


          <div className="md:row-span-2 bg-[#5690D1]/60 text-white rounded-2xl p-6 flex flex-col justify-end md:min-h-[550px] min-h-[250px]">
            <div>
              <Image src={analysis} alt="" width={30} height={30} />
              <h3 className="mt-4 font-semibold text-lg text-[#1E1E1E]">
                Insightful <br className="hidden md:inline" /> Analytics
              </h3>
              <p className="text-sm mt-2 opacity-90 text-[#1E1E1E]">
                Understand your focus  patterns with visual data trends.
              </p>
            </div>
          </div>


          <div className="bg-[#E3E2E0] rounded-2xl p-6 flex flex-col justify-end min-h-[180px]">
            <div>
              <Image src={list} alt="" width={28} height={28} />
              <h3 className="mt-4 font-bold text-lg">To Do List</h3>
              <p className="text-sm text-[#1E1E1E] mt-2">
                Visual task management <br className="hidden md:inline" /> that eliminates <br className="hidden md:inline" /> overwhelm.
              </p>
            </div>
          </div>


          <div className="bg-[#5690D1]/60 text-white rounded-2xl p-6 flex flex-col justify-end min-h-[180px]">
            <div>
              <Image src={timer} alt="" width={28} height={28} />
              <h3 className="mt-4 font-bold text-lg text-[#1E1E1E]">Focus Timer</h3>
              <p className="text-sm mt-2  opacity-90 text-[#1E1E1E]">
                Adaptive intervals designed for hyperfocus and rest.
              </p>
            </div>
          </div>


          <div className="bg-[#E3E2E0] rounded-2xl p-6 flex flex-col justify-end min-h-[180px]">
            <div>
              <Image src={support} alt="" width={33} height={33} />
              <h3 className="mt-4 font-bold text-lg">
                Inclusive Support
              </h3>
              <p className="text-sm text-[#1E1E1E] mt-2">
                Built by and for the <br className="hidden md:inline" /> neurodivergent <br className="hidden md:inline" /> community.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}