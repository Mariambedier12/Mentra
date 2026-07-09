"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadDocument } from "./_services/upload.service";
import FadeLoader from "@/components/ui/FadeLoader";
import { CheckCircle2, FileCheck, AlertCircle } from "lucide-react";

// Figma Assets
import calenderupload from "@/assets/calenderupload.png";
import uploadlectures from "@/assets/uploadlectures.png";
import startsession from "@/assets/startsession.png";

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("");
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

    fetch("http://mentraa.runasp.net/api/User/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUserName(data.displayName || data.userName || ""))
      .catch(() => setUserName((session as any)?.user?.name || ""));

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
    <div className="pt-32 px-6 pb-16">
      <div className="max-w-[1100px] mx-auto">
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "0.25rem" }}>
          Hello, {userName}!
        </h1>
        <p style={{ fontSize: "15px", color: "black", marginBottom: "2rem" }}>
          Your ADHD Level : <span style={{ color: "#091A58", fontWeight: 700 }}>{adhdLevel}</span>
        </p>

        {/* Card */}
        <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "3rem 2.5rem 3.5rem 2.5rem", marginBottom: "2rem", boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)" }}>
          <p style={{ fontSize: "13px", fontWeight: 800, color: "#091A58", marginTop: "0.5rem", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            <Image src={calenderupload} alt="Calendar" width={14} height={14} /> TODAY'S PLAN
          </p>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: isDragging ? "2px dashed #091A58" : "1.5px dashed #CCC3D8",
              borderRadius: "12px",
              padding: "2.25rem 2rem",
              textAlign: "center",
              background: isDragging ? "#f0f4ff" : "#EEEEED",
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
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#E1E3E4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem auto" }}>
                  <Image src={uploadlectures} alt="Upload Icon" width={24} height={24} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "black", marginBottom: "0.5rem" }}>
                  Upload Lectures
                </h3>
                <p style={{ fontSize: "14px", color: "black", marginBottom: "1.5rem" }}>
                  Drag and drop PDF, JPG, Or PNG
                </p>
                <button
                  onClick={handleButtonClick}
                  style={{
                    background: "#091A58",
                    color: "white",
                    padding: "0.75rem 2.5rem",
                    borderRadius: "99px",
                    fontSize: "14px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(9, 26, 88, 0.15)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#132770")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#091A58")}
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
                <p style={{ fontSize: "14px", color: "black" }}>
                  Please wait while we process your document.
                </p>
              </div>
            )}

            {uploadStatus === "success" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", animation: "fadeIn 0.3s ease-in-out" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#e6f4ea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 16px rgba(16, 185, 129, 0.12)",
                  marginBottom: "4px"
                }}>
                  <CheckCircle2 size={32} color="#10b981" style={{ strokeWidth: 2.2 }} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f1f5c" }}>
                  Uploaded Successfully!
                </h3>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "white",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
                  maxWidth: "90%",
                }}>
                  <FileCheck size={16} color="#0f1f5c" />
                  <span style={{ fontSize: "13px", color: "#334155", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
                    {file?.name}
                  </span>
                </div>
                <button
                  onClick={handleButtonClick}
                  style={{
                    background: "none",
                    color: "#64748b",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginTop: "4px",
                  }}
                >
                  Choose a different file
                </button>
              </div>
            )}

            {uploadStatus === "error" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", animation: "fadeIn 0.3s ease-in-out" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#fdf2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 16px rgba(239, 68, 68, 0.12)",
                  marginBottom: "4px"
                }}>
                  <AlertCircle size={32} color="#ef4444" style={{ strokeWidth: 2.2 }} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ef4444" }}>
                  Upload Failed
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", maxWidth: "320px", lineHeight: 1.5, margin: 0 }}>
                  {errorMessage}
                </p>
                <button
                  onClick={handleButtonClick}
                  style={{
                    background: "#091A58",
                    color: "white",
                    padding: "0.6rem 2rem",
                    borderRadius: "99px",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    marginTop: "4px",
                    boxShadow: "0 4px 6px rgba(9, 26, 88, 0.15)",
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={handleStartSession}
            disabled={uploadStatus !== "success"}
            style={{
              background: "#091A58",
              color: "white",
              padding: "1rem 3.5rem",
              borderRadius: "99px",
              fontSize: "16px",
              fontWeight: 700,
              border: "none",
              cursor: uploadStatus === "success" ? "pointer" : "not-allowed",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 6px 15px rgba(9, 26, 88, 0.2)",
              opacity: uploadStatus === "success" ? 1 : 0.6,
            }}
            onMouseEnter={(e) => {
              if (uploadStatus === "success") e.currentTarget.style.background = "#132770";
            }}
            onMouseLeave={(e) => {
              if (uploadStatus === "success") e.currentTarget.style.background = "#091A58";
            }}
          >
            Start Session
            <Image src={startsession} alt="Start Icon" width={18} height={18} />
          </button>
          <p style={{ fontSize: "14px", color: "black", marginTop: "0.75rem", fontWeight: 500 }}>
            {uploadStatus === "success"
              ? "Your document is ready. Click to start learning!"
              : "Start learning now"}
          </p>
        </div>



      </div>
    </div>
  );
}