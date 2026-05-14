"use client";

import { useEffect, useState } from "react";

import ProfileCard from "./_components/profileCard";
import ProfileForm from "./_components/profileForm";

import {
  getProfile,
  uploadPhoto,
} from "./_services/profile.service";

export default function ProfilePage() {

  const [profile, setProfile] = useState<any>(null);

  async function fetchProfile() {
    try {

      const data = await getProfile();

      console.log("PROFILE:", data);

      setProfile(data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  async function handleUpload(file: File) {
    try {

      await uploadPhoto(file);

      await fetchProfile();

    } catch (err) {
      console.log(err);
    }
  }

  console.log(profile);

  if (!profile) {
    return (
      <div className="bg-[#FAF9F7] min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-32 pb-16 px-6">

      <div className="max-w-[1050px] mx-auto">

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
            adhdLevel={profile.adhdLevel || "Severe ADHD"}
            onImageChange={handleUpload}
          />

          {/* RIGHT */}
          <ProfileForm
            name={profile.displayName || profile.name}
            email={profile.email}
          />

        </div>

      </div>

    </div>
  );
}