import Image from "next/image";
import Link from "next/link";
import check from '../../../../assets/check.png'
import focus from '../../../../assets/Focus Mode.png'

export default function FocusModes() {
  return (
    <section className="bg-[#FAF9F7] py-3">

      <div className="max-w-screen-xl mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Focus Modes to Calm <br /> You
          </h2>

          <p className="text-[#1E1E1E] mt-4 mb-8 leading-relaxed ">
            Turn off the world. With one click, your workspace transforms. <br />
            Distracting sites are blocked, your notification sounds change to <br />
            soft cues, and your desktop wallpaper blurs to center your attention <br />
            on the current task.
          </p>

          <div className="flex gap-4 mt-6">

            <div className="bg-[#135BEC]/10 rounded-4xl px-5 py-2 text-sm font-semibold
       text-[#1E1E1E]">
              Deep Work Mode
            </div>

            <div className="bg-[#135BEC]/10 rounded-4xl px-5 py-2 text-sm font-semibold text-[#1E1E1E]">
              Creative Flow
            </div>

            <div className="bg-[#135BEC]/10 rounded-4xl px-5 py-2 text-sm font-semibold text-[#1E1E1E]">
              Quick Blitz
            </div>

          </div>

          {/* LIST */}

        </div>

        {/* IMAGE */}
        <div className=" flex justify-center lg:justify-end">

          <div className="relative  ">

            {/* الخلفية الوهمية */}
            <div className="bg-[#EFEEEC]  rounded-3xl p-3 flex items-center justify-center">

              <div className="translate-y-[9px]">
                {/* الصورة */}
                <Image
                  src={focus}
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