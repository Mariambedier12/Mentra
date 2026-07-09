import Image from "next/image";
import Link from "next/link";
import check from '../../../../assets/check.png'
import focus from '../../../../assets/Focus Mode.png'

export default function FocusModes() {
  return (
    <section className="bg-[#FAF9F7] py-3">

      <div className="max-w-screen-xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
            Focus Modes to Calm <br className="hidden md:inline" /> You
          </h2>

          <p className="text-[#1E1E1E] mt-4 mb-8 leading-relaxed text-sm md:text-base">
            Turn off the world. With one click, your workspace transforms. <br className="hidden md:inline" />
            Distracting sites are blocked, your notification sounds change to <br className="hidden md:inline" />
            soft cues, and your desktop wallpaper blurs to center your attention <br className="hidden md:inline" />
            on the current task.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">

            <div className="bg-[#135BEC]/10 rounded-4xl px-5 py-2 text-sm font-semibold text-[#1E1E1E]">
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
        <div className=" flex justify-center lg:justify-end w-full max-w-lg mx-auto lg:mx-0">

          <div className="relative w-full">

            {/* الخلفية الوهمية */}
            <div className="bg-[#EFEEEC]  rounded-3xl p-3 flex items-center justify-center">

              <div className="translate-y-[9px] w-full">
                {/* الصورة */}
                <Image
                  src={focus}
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