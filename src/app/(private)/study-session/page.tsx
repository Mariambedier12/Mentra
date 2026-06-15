"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudySession } from "./hooks/use-session";
import Timer from "./components/timer";
import TabBar from "./components/tab-bar";
import SessionProgress from "./components/session-progress";
import SummaryTab from "./components/summary-tab";
import HighlightTab from "./components/highlight-tab";
import QuizTab from "./components/quiz-tab";
import FadeLoader from "@/components/ui/FadeLoader";

export default function StudySessionPage() {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    formattedTime,
    isRunning,
    mode,
    toggle,
    reset,
    endSession,
    activeTab,
    setActiveTab,
    progress,
    sessionData,
    isLoading,
  } = useStudySession();

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-32 px-6 pb-16">
      <div className="max-w-[1050px] mx-auto">

        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "1.5rem" }}>
          Study session
        </h1>

        <Timer
          time={formattedTime}
          isRunning={isRunning}
          mode={mode}
          onToggle={toggle}
          onReset={reset}
          onEnd={async () => {
            setShowConfirmModal(true);
          }}
        />

        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <SessionProgress progress={progress} />

        {activeTab === "summary" && (
          isLoading ? (
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <FadeLoader color="#0f1f5c" />
              <p style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>Analyzing document and generating summary...</p>
            </div>
          ) : (
            <SummaryTab data={sessionData} />
          )
        )}

        {activeTab === "highlight" && (
          isLoading ? (
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <FadeLoader color="#0f1f5c" />
              <p style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>Extracting key takeaways...</p>
            </div>
          ) : (
            <HighlightTab data={sessionData} />
          )
        )}

        {activeTab === "quiz" && (
          isLoading ? (
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
              <FadeLoader color="#0f1f5c" />
              <p style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>Generating interactive quiz questions...</p>
            </div>
          ) : (
            <QuizTab data={sessionData} />
          )
        )}

      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(9, 26, 88, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "2.5rem 2rem",
            maxWidth: "440px",
            width: "90%",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            border: "1px solid #e5e7eb",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            animation: "modalFadeIn 0.25s ease-out"
          }}>
            <div style={{ fontSize: "44px" }}>⚠️</div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>
                Are you sure you want to end your session?
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>
                You will lose your progress.
              </p>
            </div>
             <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "0.5rem" }}>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                }}
                className="modal-btn-keep"
                style={{
                  flex: 1,
                  padding: "0.75rem 1.5rem",
                  borderRadius: "99px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                No, Keep Studying
              </button>
              <button
                onClick={async () => {
                  setShowConfirmModal(false);
                  await endSession();
                  router.push("/upload");
                }}
                className="modal-btn-end"
                style={{
                  flex: 1,
                  padding: "0.75rem 1.5rem",
                  borderRadius: "99px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Yes, End Session
              </button>
            </div>
          </div>
          <style>{`
            @keyframes modalFadeIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .modal-btn-keep {
              background: #091A58 !important;
              color: white !important;
              box-shadow: 0 4px 10px rgba(9, 26, 88, 0.2) !important;
              transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            .modal-btn-keep:hover {
              background: #132770 !important;
              transform: translateY(-1px);
              box-shadow: 0 6px 14px rgba(9, 26, 88, 0.35) !important;
            }
            .modal-btn-keep:active {
              transform: translateY(0);
            }
            .modal-btn-end {
              background: white !important;
              color: #ef4444 !important;
              border: 1.5px solid #ef4444 !important;
              transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            .modal-btn-end:hover {
              background: #ef4444 !important;
              color: white !important;
              transform: translateY(-1px);
              box-shadow: 0 6px 14px rgba(239, 68, 68, 0.25) !important;
            }
            .modal-btn-end:active {
              transform: translateY(0);
            }
          `}</style>
        </div>
      )}
    </div>
  );
}