"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { uploadDocument } from "./_services/upload.service";
import FadeLoader from "@/components/ui/FadeLoader";

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const userName = (session as any)?.user?.name || "there";
  const [adhdLevel, setAdhdLevel] = useState("...");

  // Upload and file state
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadedDocId, setUploadedDocId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = (session as any)?.user?.token;
    if (!token) return;

    fetch("http://mentraa.runasp.net/api/Quiz/my-level", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.level) {
          router.push("/quiz");
        } else {
          setAdhdLevel(data.level);
        }
      });
  }, [session, router]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    await processUpload(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (!selectedFile) return;
    await processUpload(selectedFile);
  };

  const processUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setUploadStatus("uploading");
    setErrorMessage("");

    const token = (session as any)?.user?.token;
    if (!token) {
      setUploadStatus("error");
      setErrorMessage("You must be logged in to upload files.");
      return;
    }

    try {
      const result = await uploadDocument(selectedFile, token);
      console.log("Upload result:", result);
      const docId = result?.id || result?.documentId || result?.data?.id || result?.data?.documentId;
      if (docId) {
        setUploadedDocId(docId);
        setUploadStatus("success");
      } else {
        // Fallback to 1 if document uploaded successfully but no ID was returned
        setUploadedDocId(1);
        setUploadStatus("success");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      setErrorMessage(err.message || "Failed to upload document. Please try again.");
    }
  };

  const handleStartSession = () => {
    router.push(`/study-session?documentId=${uploadedDocId || 1}`);
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-32 px-6 pb-16">
      <div className="max-w-[1050px] mx-auto">

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
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: isDragging ? "2px dashed #4338ca" : "2px dashed #d1d5db",
              borderRadius: "12px",
              padding: "3rem",
              textAlign: "center",
              background: isDragging ? "#f0f4ff" : "#f9fafb",
              transition: "all 0.2s ease",
            }}
          >
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              style={{ display: "none" }}
            />

            {uploadStatus === "idle" && (
              <>
                <div style={{ fontSize: "32px", marginBottom: "1rem" }}>☁️</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "0.5rem" }}>
                  Upload Lectures
                </h3>
                <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "1.5rem" }}>
                  Drag and drop PDF, JPG, Or PNG
                </p>
                <button
                  onClick={handleButtonClick}
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
              </>
            )}

            {uploadStatus === "uploading" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "1.5rem" }}>
                <FadeLoader color="#0f1f5c" />
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0f1f5c", marginTop: "1rem" }}>
                  Uploading "{file?.name}"...
                </h3>
                <p style={{ fontSize: "14px", color: "#9ca3af" }}>
                  Please wait while we process your document.
                </p>
              </div>
            )}

            {uploadStatus === "success" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "32px" }}>✅</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#10b981" }}>
                  Uploaded Successfully!
                </h3>
                <p style={{ fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>
                  📄 {file?.name}
                </p>
                <button
                  onClick={handleButtonClick}
                  style={{
                    background: "none",
                    color: "#4338ca",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  Choose a different file
                </button>
              </div>
            )}

            {uploadStatus === "error" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "32px" }}>⚠️</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#ef4444" }}>
                  Upload Failed
                </h3>
                <p style={{ fontSize: "14px", color: "#ef4444", maxWidth: "400px" }}>
                  {errorMessage}
                </p>
                <button
                  onClick={handleButtonClick}
                  style={{
                    background: "#0f1f5c",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "99px",
                    fontSize: "13px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Start Session Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleStartSession}
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
            {uploadStatus === "success" 
              ? "Your document is ready. Click to start learning!" 
              : "Start learning now (defaults to sample document if no upload)"}
          </p>
        </div>

      </div>
    </div>
  );
}