import { getSession } from "next-auth/react";

const BASE_URL = "http://mentraa.runasp.net/api/User";

async function getToken() {
  const session = await getSession();
  return (session?.user as any)?.token;
}

/**
 * GET PROFILE
 */
export async function getProfile() {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get profile");
  }

  return res.json();
}

/**
 * UPLOAD PHOTO
 */
export async function uploadPhoto(file: File) {
  const token = await getToken();

  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload-photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
}