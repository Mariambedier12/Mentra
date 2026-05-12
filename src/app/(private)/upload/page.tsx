"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function UploadPage() {
  const { data: session } = useSession();
  const userName = (session as any)?.user?.name || "there";
  const [adhdLevel, setAdhdLevel] = useState("...");

useEffect(() => {
  const token = (session as any)?.user?.token;
  if (!token) return;

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

        {/* Greeting */}
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "0.25rem" }}>
          Hello, {userName}!
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "2rem" }}>
          Your ADHD Level : <span style={{ color: "#4338ca", fontWeight: 600 }}>{adhdLevel}</span>
        </p>

        {/* Card */}
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#4338ca", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
            📅 TODAY'S PLAN
          </p>

          {/* Upload Area */}
          <div style={{
            border: "2px dashed #d1d5db",
            borderRadius: "12px",
            padding: "3rem",
            textAlign: "center",
            background: "#f9fafb",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "1rem" }}>☁️</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "0.5rem" }}>
              Upload Lectures
            </h3>
            <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "1.5rem" }}>
              Drag and drop PDF, JPG, Or PNG
            </p>
            <button
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
          </div>
        </div>

        {/* Start Session Button */}
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              background: "#0f1f5c",
              color: "white",
              padding: "1rem 3rem",
              borderRadius: "99px",
              fontSize: "16px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1a3a8f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0f1f5c")}
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