"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { uploadDocument } from "./_services/upload.service";
import FadeLoader from "@/components/ui/FadeLoader";

interface HistoryItem {
  id: number;
  fileName: string;
  uploadedAt: string;
}

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [adhdLevel, setAdhdLevel] = useState("...");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const fetchHistory = (token: string) => {
    fetch("http://mentraa.runasp.net/api/Document/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setHistory(Array.isArray(data) ? data : []));
  };

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
        if (!data.level) window.location.href = "/quiz";
        else setAdhdLevel(data.level);
      });

    fetchHistory(token);
  }, [session]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

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
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F7", padding: "6rem 4rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "0.25rem" }}>
          Hello, {userName}!
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "2rem" }}>
          Your ADHD Level : <span style={{ color: "#4338ca", fontWeight: 600 }}>{adhdLevel}</span>
        </p>

        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#4338ca", marginBottom: "1.5rem" }}>
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
                    fetchHistory(token);
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
                style={{ background: "#0f1f5c", color: "white", padding: "0.75rem 2rem", borderRadius: "99px", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1a3a8f")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#0f1f5c")}
              >
                Upload Content
              </button>
            )}

            {uploadedFile && (
              <button
                onClick={() => { setUploadedFile(null); setDocumentId(null); }}
                style={{ background: "transparent", color: "#ef4444", padding: "0.5rem 1rem", borderRadius: "99px", fontSize: "13px", border: "1px solid #ef4444", cursor: "pointer" }}
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={handleStartSession}
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
            {uploadStatus === "success" 
              ? "Your document is ready. Click to start learning!" 
              : "Start learning now (defaults to sample document if no upload)"}
          </p>
        </div>

        {history.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "1rem" }}>
              Previous Sessions
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/study-session?documentId=${item.id}`)}
                  style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "border-color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4338ca")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>📄</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>{item.fileName}</p>
                      <p style={{ fontSize: "12px", color: "#9ca3af" }}>{formatDate(item.uploadedAt)}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "14px", color: "#4338ca", fontWeight: 500 }}>Continue →</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}