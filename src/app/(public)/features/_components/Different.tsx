import React from "react";

const data = [
  {
    standard: "Rigid vertical lists",
    mentra: "Dynamic visual blocks",
  },
  {
    standard: "Distracting notifications",
    mentra: "Context-aware focus modes",
  },
  {
    standard: "Guilt-inducing overdue red tags",
    mentra: "Gentle Today rescheduling",
  },
  {
    standard: "Linear thinking requirement",
    mentra: "Non-linear brain friendly",
  },
];

export default function Different() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <h2 className="text-center text-[#091A58] text-3xl md:text-5xl font-bold mb-10">
        Why Mentra is different.
      </h2>

      <div className="max-w-5xl mx-auto text-center rounded-2xl overflow-hidden shadow-xl bg-white">

        {/* Headers */}
        <div className="grid grid-cols-2 ">
          <div className="bg-[#E9E8E6] text-[#091A58] font-semibold text-center p-8">
            Standard Tools
          </div>
          <div className="bg-[#091A58] text-white font-semibold text-center p-8">
            The Mentra Way
          </div>
        </div>

        {/* Rows */}
        {data.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-2 border-t-4 border-[#C6C5D1]/10 divide-x-4 divide-[#C6C5D1]/10 "
          >
            <div className="p-7 text-md font-medium text-[#1E1E1E]">
              {row.standard}
            </div>
            <div className="p-7 text-md font-semibold text-[#0d1b4c]">
              {row.mentra}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}