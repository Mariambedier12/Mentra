"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [adhdLevel, setAdhdLevel] = useState("...");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<number | null>(null);

  useEffect(() => {
    const token = (session as any)?.user?.token;
    if (!token) return;

    fetch("http://mentraa.runasp.net/api/User/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.displayName || data.userName || "");
      })
      .catch(() => {
        setUserName((session as any)?.user?.name || "");
      });

    fetch("http://mentraa.runasp.net/api/Quiz/my-level", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.level) {
          window.location.href = "/quiz";
        } else {
          setAdhdLevel(data.level);
        }
      });
  }, [session]);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F7", padding: "6rem 2rem 2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "0.25rem" }}>
          Hello, {userName}!
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "2rem" }}>
          Your ADHD Level : <span style={{ color: "#4338ca", fontWeight: 600 }}>{adhdLevel}</span>
        </p>

        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#4338ca", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
            📅 TODAY'S PLAN
          </p>

          <div style={{
            border: uploadedFile ? "2px solid #4338ca" : "2px dashed #d1d5db",
            borderRadius: "12px",
            padding: "3rem",
            textAlign: "center",
            background: uploadedFile ? "#eef2ff" : "#f9fafb",
            transition: "all 0.3s ease",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "1rem" }}>
              {uploadedFile ? "✅" : "☁️"}
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "0.5rem" }}>
              {uploadedFile ? uploadedFile : "Upload Lectures"}
            </h3>
            <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "1.5rem" }}>
              {uploadedFile ? "File uploaded successfully" : "Drag and drop PDF, JPG, Or PNG"}
            </p>

            <input
              type="file"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const token = (session as any)?.user?.token;
                const formData = new FormData();
                formData.append("file", file);

                try {
                  const res = await fetch("http://mentraa.runasp.net/api/Document/upload", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  });

                  if (res.ok) {
                    const data = await res.json();
                    setUploadedFile(file.name);
                    setDocumentId(data.id || data.documentId || 1);
                  } else {
                    alert("Upload failed, please try again.");
                  }
                } catch {
                  alert("Something went wrong.");
                }
              }}
            />

            {!uploadedFile && (
              <button
                onClick={() => document.getElementById("file-upload")?.click()}
                style={{
                  background: "#0f1f5c",
                  color: "white",
                  padding: "0.75rem 2rem",
                  borderRadius: "99px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1a3a8f")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0f1f5c")}
              >
                Upload Content
              </button>
            )}

            {uploadedFile && (
              <button
                onClick={() => { setUploadedFile(null); setDocumentId(null); }}
                style={{
                  background: "transparent",
                  color: "#ef4444",
                  padding: "0.5rem 1rem",
                  borderRadius: "99px",
                  fontSize: "13px",
                  border: "1px solid #ef4444",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            disabled={!uploadedFile}
            onClick={() => router.push(`/study-session?documentId=${documentId}`)}
            style={{
              background: uploadedFile ? "#0f1f5c" : "#9ca3af",
              color: "white",
              padding: "1rem 3rem",
              borderRadius: "99px",
              fontSize: "16px",
              fontWeight: 500,
              border: "none",
              cursor: uploadedFile ? "pointer" : "not-allowed",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => { if (uploadedFile) e.currentTarget.style.background = "#1a3a8f"; }}
            onMouseLeave={(e) => { if (uploadedFile) e.currentTarget.style.background = "#0f1f5c"; }}
          >
            Start Session ▶
          </button>
          <p style={{ fontSize: "14px", color: "#9ca3af", marginTop: "0.75rem" }}>
            Start learning now
          </p>
        </div>

      </div>
    </div>
  );
}