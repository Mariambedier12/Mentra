"use client";

import { useState } from "react";
import Image from "next/image";
import { SessionData } from "../types/session";
import fullnotesIcon from "@/assets/fullnotes.png";
import chunkIcon from "@/assets/chunk.png";

interface Props {
  data: SessionData;
}

export default function SummaryTab({ data }: Props) {
  const [viewMode, setViewMode] = useState<"full" | "chunks">("full");
  const [currentChunk, setCurrentChunk] = useState(0);

  // Helper to parse double asterisks for bolding, and single asterisks for italics
  const parseBoldText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} style={{ fontWeight: 700, color: "#111827" }}>{part}</strong>;
      }
      const subParts = part.split(/\*(.*?)\*/g);
      return subParts.map((sub, j) => {
        if (j % 2 === 1) {
          return <em key={j} style={{ fontStyle: "italic", color: "#4b5563" }}>{sub}</em>;
        }
        return sub;
      });
    });
  };

  // Basic Markdown line-by-line renderer
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} style={{ height: "0.75rem" }} />;

      // Header 3
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
            {parseBoldText(trimmed.slice(4))}
          </h4>
        );
      }
      // Header 2
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} style={{ fontSize: "18px", fontWeight: 700, color: "#1f2937", marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            {parseBoldText(trimmed.slice(3))}
          </h3>
        );
      }
      // Header 1
      if (trimmed.startsWith("# ")) {
        return (
          <h2 key={idx} style={{ fontSize: "20px", fontWeight: 800, color: "#0f1f5c", marginTop: "1.75rem", marginBottom: "1rem", borderBottom: "1.5px solid #f3f4f6", paddingBottom: "0.5rem" }}>
            {parseBoldText(trimmed.slice(2))}
          </h2>
        );
      }

      // Bullet points
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <div key={idx} style={{ display: "flex", gap: "10px", paddingLeft: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-start" }}>
            <span style={{ color: "#4338ca", fontSize: "14px", marginTop: "2px" }}>•</span>
            <span style={{ fontSize: "15px", color: "#374151", lineHeight: 1.6 }}>
              {parseBoldText(trimmed.slice(2))}
            </span>
          </div>
        );
      }

      // Numbered lists
      const numberMatch = trimmed.match(/^(\d+)\.\s(.*)/);
      if (numberMatch) {
        return (
          <div key={idx} style={{ display: "flex", gap: "10px", paddingLeft: "0.5rem", marginBottom: "0.5rem", alignItems: "flex-start" }}>
            <span style={{ color: "#4338ca", fontWeight: 600, fontSize: "14px", marginTop: "2px" }}>{numberMatch[1]}.</span>
            <span style={{ fontSize: "15px", color: "#374151", lineHeight: 1.6 }}>
              {parseBoldText(numberMatch[2])}
            </span>
          </div>
        );
      }

      // Default paragraph
      return (
        <p key={idx} style={{ fontSize: "15px", color: "#374151", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          {parseBoldText(trimmed)}
        </p>
      );
    });
  };

  // Compile chunks: either use API chunks or default/fallback based on legacy summary points
  const chunks = data.chunks && data.chunks.length > 0
    ? data.chunks
    : data.summary.points.map((pt) => ({
        summary: `### ${pt.heading}\n${pt.text}`,
        highlights: [pt.text],
      }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* ADHD Tip Card */}
      {data.adhdLevel && (
        <div style={{
          background: "linear-gradient(135deg, #e0e7ff 0%, #e8eaf6 100%)",
          borderRadius: "16px",
          padding: "1.25rem 1.5rem",
          borderLeft: "5px solid #091A58",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: 700, color: "#1e1b4b" }}>
            <span>💡 ADHD Study Strategy ({data.adhdLevel} Level)</span>
          </div>
          {data.studyRecommendation ? (
            <p style={{ fontSize: "14px", color: "#312e81", margin: 0, lineHeight: 1.6 }}>
              {data.studyRecommendation}
            </p>
          ) : (
            <p style={{ fontSize: "14px", color: "#312e81", margin: 0, lineHeight: 1.6 }}>
              We have structured your study session with a custom timer. Take regular short breaks, focus on one chunk at a time, and test yourself with the Quiz tab!
            </p>
          )}
        </div>
      )}

      {/* Main Container */}
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        {/* Header & Toggle Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid #f3f4f6", paddingBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1f2937" }}>
              {viewMode === "full" ? "Summary" : `Summary - Segment ${currentChunk + 1} of ${chunks.length}`}
            </h2>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "2px" }}>
              {viewMode === "full" ? "Read full summary of your uploaded lecture" : "Focus on small, structured sections to stay engaged"}
            </p>
          </div>

          {/* Toggle View Mode */}
          {chunks.length > 0 && (
            <div style={{ display: "flex", gap: "4px", background: "#f3f4f6", padding: "4px", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
              <button
                onClick={() => setViewMode("full")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: viewMode === "full" ? "white" : "transparent",
                  color: viewMode === "full" ? "#0f1f5c" : "#6b7280",
                  boxShadow: viewMode === "full" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Image src={fullnotesIcon} alt="Full Notes" width={16} height={16} style={{ objectFit: "contain" }} />
                <span>Full Notes</span>
              </button>
              <button
                onClick={() => setViewMode("chunks")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: viewMode === "chunks" ? "white" : "transparent",
                  color: viewMode === "chunks" ? "#0f1f5c" : "#6b7280",
                  boxShadow: viewMode === "chunks" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Image src={chunkIcon} alt="Chunk-by-Chunk" width={16} height={16} style={{ objectFit: "contain" }} />
                <span>Chunk-by-Chunk</span>
              </button>
            </div>
          )}
        </div>

        {/* View Mode Content */}
        {viewMode === "full" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {data.finalSummary ? (
              <div>{renderMarkdown(data.finalSummary)}</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {data.summary.points.map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9ca3af", marginTop: "8px", flexShrink: 0 }} />
                    <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.7 }}>
                      <strong style={{ color: "#111827" }}>{point.heading}:</strong> {point.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Active Chunk Content */}
            <div style={{ minHeight: "180px" }}>
              {renderMarkdown(chunks[currentChunk].summary)}
            </div>

            {/* Chunk Highlights (if any) */}
            {chunks[currentChunk].highlights && chunks[currentChunk].highlights.length > 0 && (
              <div style={{
                marginTop: "2rem",
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "1.25rem",
                border: "1px solid #e2e8f0",
              }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#334155", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>🎯 Key Takeaways:</span>
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {chunks[currentChunk].highlights.map((hl, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span>
                      <p style={{ fontSize: "14px", color: "#475569", margin: 0, lineHeight: 1.5 }}>{hl}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chunk Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2.5rem", borderTop: "1px solid #f3f4f6", paddingTop: "1.5rem" }}>
              <button
                disabled={currentChunk === 0}
                onClick={() => setCurrentChunk(c => c - 1)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1.5px solid #e5e7eb",
                  background: currentChunk === 0 ? "#f9fafb" : "white",
                  color: currentChunk === 0 ? "#d1d5db" : "#374151",
                  cursor: currentChunk === 0 ? "default" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                ← Prev Section
              </button>

              {/* Progress dots or numbers */}
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#4b5563" }}>
                {currentChunk + 1} / {chunks.length}
              </span>

              <button
                disabled={currentChunk === chunks.length - 1}
                onClick={() => setCurrentChunk(c => c + 1)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  background: currentChunk === chunks.length - 1 ? "#f3f4f6" : "#0f1f5c",
                  color: currentChunk === chunks.length - 1 ? "#9ca3af" : "white",
                  cursor: currentChunk === chunks.length - 1 ? "default" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Next Section →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}