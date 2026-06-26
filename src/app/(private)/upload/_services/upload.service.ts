const BASE_URL = "http://mentraa.runasp.net/api/Document";

export async function uploadDocument(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    console.error("uploadDocument error:", res.status, errorText);
    throw new Error(`Failed to upload document (Status: ${res.status})`);
  }

  return res.json();
}
