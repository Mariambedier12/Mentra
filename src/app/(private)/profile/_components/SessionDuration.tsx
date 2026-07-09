"use client";

import { useState, useEffect } from "react";
import { Timer, Coffee, RotateCcw, Save } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SessionDuration() {
  const { data: session } = useSession();
  const token = (session as any)?.user?.token;

  const [studyTime, setStudyTime] = useState<number>(25); // Default study 25 mins
  const [breakTime, setBreakTime] = useState<number>(5);  // Default break 5 mins
  const [adhdLevel, setAdhdLevel] = useState<string>("");
  
  const [isSaved, setIsSaved] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Load initial settings on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check account email mismatch to clear old localStorage values
    const userEmail = session?.user?.email;
    if (userEmail) {
      const storedEmail = localStorage.getItem("mentra-user-email");
      if (storedEmail !== userEmail) {
        localStorage.removeItem("mentra-custom-study-time");
        localStorage.removeItem("mentra-custom-break-time");
        localStorage.setItem("mentra-user-email", userEmail);
      }
    }

    const customStudy = localStorage.getItem("mentra-custom-study-time");
    const customBreak = localStorage.getItem("mentra-custom-break-time");
    
    if (customStudy) {
      setStudyTime(Number(customStudy));
    }
    if (customBreak) {
      setBreakTime(Number(customBreak));
    }

    if (token) {
      fetch("http://mentraa.runasp.net/api/Quiz/my-level", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.level) {
            setAdhdLevel(data.level);
            if (!customStudy) {
              const lvl = data.level.toLowerCase();
              if (lvl.includes("mild")) {
                setStudyTime(25);
              } else if (lvl.includes("moderate")) {
                setStudyTime(15);
              } else if (lvl.includes("severe") || lvl.includes("high")) {
                setStudyTime(10);
              }
            }
          }
        })
        .catch((err) => console.error("Error fetching my-level in profile settings:", err));
    }
  }, [token]);

  const handleSave = () => {
    localStorage.setItem("mentra-custom-study-time", studyTime.toString());
    localStorage.setItem("mentra-custom-break-time", breakTime.toString());
    
    setIsSaved(true);
    setIsReset(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem("mentra-custom-study-time");
    localStorage.removeItem("mentra-custom-break-time");
    
    let defaultStudy = 25;
    if (adhdLevel) {
      const lvl = adhdLevel.toLowerCase();
      if (lvl.includes("mild")) defaultStudy = 25;
      else if (lvl.includes("moderate")) defaultStudy = 15;
      else if (lvl.includes("severe") || lvl.includes("high")) defaultStudy = 10;
    }
    
    setStudyTime(defaultStudy);
    setBreakTime(5);
    
    setIsReset(true);
    setIsSaved(false);
    setTimeout(() => setIsReset(false), 3000);
  };

  const adjustStudy = (amount: number) => {
    setStudyTime((prev) => Math.max(1, Math.min(180, prev + amount)));
  };

  const adjustBreak = (amount: number) => {
    setBreakTime((prev) => Math.max(1, Math.min(60, prev + amount)));
  };

  return (
    <div className="space-y-6 w-full">
      {/* HEADER CARD */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#F1F1F1]">
        <h2 className="text-xl font-bold text-[#091A58] mb-1">Session Duration</h2>
        <p className="text-[#6B7280] text-sm">
          Customize default Pomodoro timers to match your learning workflow.
        </p>
      </div>

      {/* CONTROLS CARD */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#F1F1F1] space-y-8">
        {/* STUDY TIME CONTROL */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#091A58]">
            <Timer size={20} />
            <h3 className="font-bold text-md">Study Duration</h3>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl justify-between">
            <button
              onClick={() => adjustStudy(-1)}
              className="w-10 h-10 rounded-lg bg-[#091A58]/10 text-[#091A58] font-bold text-lg hover:bg-[#091A58]/20 transition shrink-0 cursor-pointer"
            >
              -
            </button>
            <div className="text-center">
              <span className="text-3xl font-extrabold text-[#091A58]">
                {studyTime}
              </span>
              <span className="text-gray-500 font-semibold ml-1">minutes</span>
            </div>
            <button
              onClick={() => adjustStudy(1)}
              className="w-10 h-10 rounded-lg bg-[#091A58]/10 text-[#091A58] font-bold text-lg hover:bg-[#091A58]/20 transition shrink-0 cursor-pointer"
            >
              +
            </button>
          </div>
          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[10, 15, 25, 45, 60].map((preset) => (
              <button
                key={preset}
                onClick={() => setStudyTime(preset)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                  studyTime === preset
                    ? "bg-[#091A58] text-white border-[#091A58]"
                    : "text-gray-600 border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                {preset}m {preset === 10 ? "(Severe)" : preset === 15 ? "(Moderate)" : preset === 25 ? "(Mild)" : ""}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-[#F1F1F1]" />

        {/* BREAK TIME CONTROL */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#5690D1]">
            <Coffee size={20} />
            <h3 className="font-bold text-md">Break Duration</h3>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl justify-between">
            <button
              onClick={() => adjustBreak(-1)}
              className="w-10 h-10 rounded-lg bg-[#5690D1]/10 text-[#5690D1] font-bold text-lg hover:bg-[#5690D1]/20 transition shrink-0 cursor-pointer"
            >
              -
            </button>
            <div className="text-center">
              <span className="text-3xl font-extrabold text-[#5690D1]">
                {breakTime}
              </span>
              <span className="text-gray-500 font-semibold ml-1">minutes</span>
            </div>
            <button
              onClick={() => adjustBreak(1)}
              className="w-10 h-10 rounded-lg bg-[#5690D1]/10 text-[#5690D1] font-bold text-lg hover:bg-[#5690D1]/20 transition shrink-0 cursor-pointer"
            >
              +
            </button>
          </div>
          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[3, 5, 10, 15, 20].map((preset) => (
              <button
                key={preset}
                onClick={() => setBreakTime(preset)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                  breakTime === preset
                    ? "bg-[#5690D1] text-white border-[#5690D1]"
                    : "text-gray-600 border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                {preset}m {preset === 5 ? "(Default)" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* FEEDBACK STATUS */}
        {isSaved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-semibold text-center animate-fade-in">
            ✓ Customized durations saved successfully!
          </div>
        )}
        {isReset && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm font-semibold text-center animate-fade-in">
            ↺ Reset settings to defaults. Custom rules cleared.
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="border-t border-[#F1F1F1] pt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl text-sm font-bold transition cursor-pointer"
          >
            <RotateCcw size={16} />
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-[#091A58] hover:opacity-90 text-white px-7 py-3 rounded-xl text-sm font-bold transition cursor-pointer shadow-md"
          >
            <Save size={16} />
            Save Timer Settings
          </button>
        </div>
      </div>
    </div>
  );
}
