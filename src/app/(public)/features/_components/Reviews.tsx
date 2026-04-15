import Image from "next/image";

import user1 from "../../../../assets/User 1.png";
import user2 from "../../../../assets/User 2.png";
import user3 from "../../../../assets/User 3.png";

export default function Reviews() {
  return (
    <section className=" py-20 bg-[#FAF9F7]  text-center">

      {/* Title */}
      <h2 className=" text-3xl md:text-5xl font-bold mb-12">
        Loved by thousands of focused minds.
      </h2>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-6 px-4">

        {/* Card 1 */}
        <div className="bg-[#F4F3F1] p-10 rounded-2xl  max-w-sm text-left">
          <p className="text-[#1E1E1E] mb-6">
            "I've tried every planner out there. <br />
            Mentra is the first one that doesn't <br />
            make me feel like I'm failing at being <br />
            organized."
          </p>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image src={user1} alt="user" fill className="rounded-2xl object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1E1E1E]">Elena Rodriguez</span>
              <span className="text-sm text-[#1E1E1E]">Content Creator</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F4F3F1] p-10 rounded-2xl  max-w-sm text-left">
          <p className="text-[#1E1E1E] mb-6">
            "The body doubling rooms are a <br />
            lifesaver. Knowing someone else is <br />
            working 'with' me keeps my brain in <br />
            gear."
          </p>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image src={user2} alt="user" fill className="rounded-2xl object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1E1E1E]">Marcus Chen</span>
              <span className="text-sm text-[#1E1E1E]">Software Engineer</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F4F3F1] p-10 rounded-2xl  max-w-sm text-left">
          <p className="text-[#1E1E1E] mb-6">
            "Visual timers were the missing piece <br />
            of my productivity puzzle. I can <br />
            actually 'see' my afternoon now." <br />
          </p>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image src={user3} alt="user" fill className="rounded-2xl object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1E1E1E]">Amara Okafor</span>
              <span className="text-sm text-[#1E1E1E]">Freelance Writer</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}