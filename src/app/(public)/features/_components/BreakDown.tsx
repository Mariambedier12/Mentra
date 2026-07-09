
import Image from "next/image";
import Link from "next/link";
import check from '../../../../assets/check.png'
import task from '../../../../assets/Task Breakdown.png'

export default function Breakdown() {
  return (
    <section className="bg-[#FAF9F7] py-3">

      <div className="max-w-screen-xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Break Down the <br className="hidden md:inline" /> Overwhelming
          </h2>

          <p className="text-[#1E1E1E] mt-4 mb-8 leading-relaxed text-sm md:text-base">
            Overwhelm is the enemy of action. Mentra’s Magic Splitter takes a <br className="hidden md:inline" />
            vague task like “Plan Vacation” and automatically generates a <br className="hidden md:inline" />
            checklist of 12 micro-tasks, from “Check passport expiry” to “Book <br className="hidden md:inline" />
            airport shuttle.”
          </p>

          {/* LIST */}
          <div className="mt-6 space-y-3 flex flex-col items-center lg:items-start">

            <div className="flex items-center gap-3">
              <Image src={check} alt="icon" width={20} height={20} />
              <span className="text-[#1E1E1E] text-sm">
                Instant micro-tasking
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image src={check} alt="icon" width={20} height={20} />
              <span className="text-[#1E1E1E] text-sm">
                One-click task estimation
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image src={check} alt="icon" width={20} height={20} />
              <span className="text-[#1E1E1E] text-sm">
                Automatic priority sorting
              </span>
            </div>

          </div>
        </div>

        {/* IMAGE */}
        <div className=" flex justify-center lg:justify-end w-full max-w-lg mx-auto lg:mx-0">

          <div className="relative w-full">

            {/* الخلفية الوهمية */}
            <div className="bg-[#EFEEEC]  rounded-3xl p-3 flex items-center justify-center">

              <div className="translate-y-[9px] w-full">
                {/* الصورة */}
                <Image
                  src={task}
                  alt="workspace"
                  width={500}
                  height={320}
                  className="rounded-3xl object-cover w-full h-auto"
                />
              </div>
            </div>



          </div>

        </div>

      </div>

    </section>
  );
}