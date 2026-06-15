"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadDocument } from "./_services/upload.service";
import FadeLoader from "@/components/ui/FadeLoader";

// Figma Assets
import calenderupload from "@/assets/calenderupload.png";
import uploadlectures from "@/assets/uploadlectures.png";
import startsession from "@/assets/startsession.png";

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

  // Local Storage document history
  const [history, setHistory] = useState<{ id: number; name: string; date: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("mentra_upload_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (id: number, name: string) => {
    const newItem = {
      id,
      name,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
    };
    setHistory((prev) => {
      const updated = [newItem, ...prev.filter(item => item.id !== id)].slice(0, 5);
      localStorage.setItem("mentra_upload_history", JSON.stringify(updated));
      return updated;
    });
  };

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
        saveToHistory(docId, selectedFile.name);
      } else {
        // Fallback to 1 if document uploaded successfully but no ID was returned
        setUploadedDocId(1);
        setUploadStatus("success");
        saveToHistory(1, selectedFile.name);
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
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "32px" }}>✅</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#10b981" }}>
                  Uploaded Successfully!
                </h3>
                <p style={{ fontSize: "14px", color: "black", fontWeight: 500 }}>
                  📄 {file?.name}
                </p>
                <button
                  onClick={handleButtonClick}
                  style={{
                    background: "none",
                    color: "#091A58",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 700,
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
                    background: "#091A58",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "99px",
                    fontSize: "13px",
                    fontWeight: 700,
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
              background: "#091A58",
              color: "white",
              padding: "1rem 3.5rem",
              borderRadius: "99px",
              fontSize: "16px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 6px 15px rgba(9, 26, 88, 0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#132770")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#091A58")}
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

        {/* Upload History Card */}
        <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem 2.5rem", marginTop: "2rem", boxShadow: "0 6px 20px rgba(0, 0, 0, 0.02)" }}>
          <p style={{ fontSize: "13px", fontWeight: 800, color: "#091A58", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            📚 Lecture History
          </p>
          {history.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#9ca3af", textAlign: "center", margin: "1rem 0" }}>
              No lectures uploaded yet. Your history will appear here once you upload a file.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {history.map((item, index) => (
                <div 
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.875rem 1.25rem",
                    background: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid #f3f4f6",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.borderColor = "#f3f4f6";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", maxWidth: "70%" }}>
                    <span style={{ fontSize: "18px" }}>📄</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                        Uploaded on {item.date}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/study-session?documentId=${item.id}`)}
                    style={{
                      background: "#091A58",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1.25rem",
                      borderRadius: "99px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#132770"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#091A58"}
                  >
                    Study ➔
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}