const BASE_URL = "http://mentraa.runasp.net/api/User";

/**
 * GET PROFILE
 */
export async function getProfile(token: string) {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    console.error("getProfile error res:", res.status, errorText);
    throw new Error(`Failed to get profile (Status: ${res.status})`);
  }

  return res.json();
}

/**
 * UPLOAD PHOTO
 */
export async function uploadPhoto(file: File, token: string) {
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

/**
 * GET ADHD LEVEL
 */
export async function getAdhdLevel(token: string) {
  if (!token) return null;

  const res = await fetch("http://mentraa.runasp.net/api/Quiz/my-level", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.level;
}