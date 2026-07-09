"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import editIcon from "@/assets/edit.png";
import logoutIcon from "@/assets/logout.png";
import personalInfoIcon from "@/assets/personal-information.png";
import focusSoundsIcon from "@/assets/focus-sound.png";
import sessionDurationIcon from "@/assets/icontimer.png";
import privacyPolicyIcon from "@/assets/privacy-policy.png";

interface Props {
  name: string;
  email: string;
  image?: string;
  adhdLevel?: string;
  onImageChange: (file: File) => void;
  activeTab: "personal" | "sounds" | "duration" | "privacy";
  setActiveTab: (tab: "personal" | "sounds" | "duration" | "privacy") => void;
}

export default function ProfileCard({
  name,
  email,
  image,
  adhdLevel,
  onImageChange,
  activeTab,
  setActiveTab,
}: Props) {
  const router = useRouter();

  const profileImage =
    image && image.trim() !== ""
      ? image
      : `https://ui-avatars.com/api/?name=${name}`;

  const getBadgeStyle = (level?: string) => {
    const lvl = (level || "").toLowerCase();

    // Default: Moderate (yellow)
    let baseColor = "245, 158, 11"; // F59E0B
    let hexColor = "#F59E0B";

    if (lvl.includes("severe") || lvl.includes("high")) {
      baseColor = "239, 68, 68"; // EF4444
      hexColor = "#EF4444";
    } else if (lvl.includes("mild")) {
      baseColor = "16, 185, 129"; // 10B981
      hexColor = "#10B981";
    }

    return {
      backgroundColor: `rgba(${baseColor}, 0.5)`,
      border: `1px solid rgba(${baseColor}, 0.2)`,
      color: hexColor,
    };
  };

  const menuItems = [
    {
      id: "personal",
      label: "Personal Information",
      icon: personalInfoIcon,
    },
    {
      id: "sounds",
      label: "Focus Sounds",
      icon: focusSoundsIcon,
    },
    {
      id: "duration",
      label: "Session Duration",
      icon: sessionDurationIcon,
    },
    {
      id: "privacy",
      label: "Privacy & Policy",
      icon: privacyPolicyIcon,
    },
  ] as const;

  return (
    <div className="flex flex-col items-center text-center w-full">

      {/* IMAGE */}
      <div className="relative mb-6">
        <img
          src={profileImage}
          alt="profile"
          className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-md"
        />

        {/* EDIT */}
        <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#091A58] flex items-center justify-center cursor-pointer">
          <Image
            src={editIcon}
            alt="edit"
            className="w-3 h-3"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              onImageChange(file);
            }}
          />
        </label>
      </div>

      {/* NAME */}
      <h2 className="text-[30px] font-bold text-[#1E1E1E] leading-none mb-3">
        {name}
      </h2>

      {/* EMAIL */}
      <p className="text-[#1E1E1E] text-[15px] mb-5 font-medium">
        {email}
      </p>

      {/* ADHD LEVEL */}
      <div
        style={getBadgeStyle(adhdLevel)}
        className="px-5 py-2 rounded-full text-sm font-bold mb-8 transition-colors duration-300"
      >
        {adhdLevel || "Moderate ADHD"}
      </div>

      {/* NAVIGATION TABS */}
      <div className="w-full space-y-3 mb-8">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "privacy") {
                  router.push("/privacy-policy");
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center justify-between p-3 rounded-[12px] transition-all duration-200 cursor-pointer text-left ${isActive ? "bg-[rgba(140,140,140,0.14)]" : "bg-transparent hover:bg-gray-100/50"
                }`}
            >
              <div className="flex items-center gap-3">
                {/* Icon Wrapper */}
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(0,0,60,0.05)] flex items-center justify-center shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    className="w-5 h-5 object-contain"
                  />
                </div>

                {/* Text Label */}
                <span className={`text-[15px] font-semibold text-[#1E1E1E] ${isActive ? "font-bold text-[#091A58]" : ""
                  }`}>
                  {item.label}
                </span>
              </div>

              {/* Right Chevron */}
              <ChevronRight
                size={18}
                className={`transition-colors duration-200 ${isActive ? "text-[#091A58]" : "text-gray-400"
                  }`}
              />
            </button>
          );
        })}
      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("mentra-custom-study-time");
          localStorage.removeItem("mentra-custom-break-time");
          sessionStorage.removeItem("reminder_dismissed_messages");
          signOut({ callbackUrl: "/auth/login" });
        }}
        className="flex items-center gap-2 text-red-500 text-[15px] font-bold hover:opacity-75 transition cursor-pointer"
      >
        <Image
          src={logoutIcon}
          alt="logout"
          className="w-4 h-4"
        />
        Log Out
      </button>

    </div>
  );
}