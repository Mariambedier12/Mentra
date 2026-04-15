
import Image from "next/image";
import Link from "next/link";
import check from '../../../../assets/check.png'
import task from '../../../../assets/Task Breakdown.png'

export default function Breakdown() {
  return (
    <section className="bg-[#FAF9F7] py-3">

      <div className="max-w-screen-xl mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Break Down the <br /> Overwhelming
          </h2>

          <p className="text-[#1E1E1E] mt-4 mb-8 leading-relaxed ">
            Overwhelm is the enemy of action. Mentra’s Magic Splitter takes a <br />
            vague task like “Plan Vacation” and automatically generates a <br />
            checklist of 12 micro-tasks, from “Check passport expiry” to “Book <br />
            airport shuttle.”
          </p>

          {/* LIST */}
          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">
              <Image src={check} alt="icon" width={20} height={20} />
              <span className="text-[#1E1E1E] text-sm mb-2">
                Instant micro-tasking
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image src={check} alt="icon" width={20} height={20} />
              <span className="text-[#1E1E1E] text-sm mb-2">
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
        <div className=" flex justify-center lg:justify-end">

          <div className="relative  ">

            {/* الخلفية الوهمية */}
            <div className="bg-[#EFEEEC]  rounded-3xl p-3 flex items-center justify-center">

              <div className="translate-y-[9px]">
                {/* الصورة */}
                <Image
                  src={task}
                  alt="workspace"
                  width={500}
                  height={320}
                  className="rounded-3xl object-cover   "
                />
              </div>
            </div>



          </div>

        </div>

      </div>

    </section>
  );
}