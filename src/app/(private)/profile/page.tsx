"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import ProfileCard from "./_components/profileCard";
import ProfileForm from "./_components/profileForm";
import FocusSounds from "./_components/FocusSounds";
import SessionDuration from "./_components/SessionDuration";
import PrivacyPolicy from "./_components/PrivacyPolicy";
import FadeLoader from "@/components/ui/FadeLoader";

import {
  getProfile,
  uploadPhoto,
  getAdhdLevel,
} from "./_services/profile.service";

export default function ProfilePage() {

  const { data: session, status } = useSession();
  const token = (session?.user as any)?.token;

  const [profile, setProfile] = useState<any>(null);
  const [adhdLevel, setAdhdLevel] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "sounds" | "duration" | "privacy">("personal");

  async function fetchProfile() {
    try {

      console.log("TOKEN:", token); // ← زود السطر ده
      console.log("STATUS:", status); // ← والسطر

      setError(null);
      const data = await getProfile(token);

      console.log("PROFILE:", data);
      setProfile(data);

      try {
        const level = await getAdhdLevel(token);
        setAdhdLevel(level ? (level.toLowerCase().includes("adhd") ? level : `${level} ADHD`) : "Not Tested");
      } catch (levelErr) {
        console.error("Error fetching ADHD level:", levelErr);
        setAdhdLevel("Not Tested");
      }

    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err?.message || "Failed to load profile");
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  async function handleUpload(file: File) {
    try {
      await uploadPhoto(file, token);
      await fetchProfile();
    } catch (err) {
      console.log(err);
    }
  }

  if (status === "loading") {
    return (
      <div className="bg-[#FAF9F7] min-h-screen flex items-center justify-center">
        <FadeLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FAF9F7] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-semibold text-lg">Error: {error}</p>
        <button
          onClick={fetchProfile}
          className="bg-[#091A58] text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-95 transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-[#FAF9F7] min-h-screen flex items-center justify-center">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

          {/* LEFT */}
          <ProfileCard
            name={profile.displayName || profile.name}
            email={profile.email}
            image={
              profile.profilePicturePath
                ? `http://mentraa.runasp.net${profile.profilePicturePath}`
                : undefined
            }
            adhdLevel={adhdLevel}
            onImageChange={handleUpload}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* RIGHT */}
          <div>
            {activeTab === "personal" && (
              <ProfileForm
                name={profile.displayName || profile.name}
                email={profile.email}
              />
            )}
            {activeTab === "sounds" && (
              <FocusSounds />
            )}
            {activeTab === "duration" && (
              <SessionDuration />
            )}
            {activeTab === "privacy" && (
              <PrivacyPolicy />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}