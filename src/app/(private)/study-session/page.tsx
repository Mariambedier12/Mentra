"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import { useStudySession } from "./hooks/use-session";
import Timer from "./components/timer";
import TabBar from "./components/tab-bar";
import SessionProgress from "./components/session-progress";
import SummaryTab from "./components/summary-tab";
import HighlightTab from "./components/highlight-tab";
import QuizTab from "./components/quiz-tab";
import ChatBot from "./components/chat-bot";

export default function StudySessionPage() {
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);
  const {
    formattedTime,
    isRunning,
    toggle,
    reset,
    endSession,
    activeTab,
    setActiveTab,
    progress,
    sessionData,
    documentId,
  } = useStudySession();

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F7", padding: "6rem 2rem 2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "1.5rem" }}>
          Study session
        </h1>

        <Timer
          time={formattedTime}
          isRunning={isRunning}
          onToggle={toggle}
          onReset={reset}
          onEnd={async () => { await endSession(); router.push("/upload"); }}
        />

        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <SessionProgress progress={progress} />

        {activeTab === "summary" && <SummaryTab data={sessionData} />}
        {activeTab === "highlight" && <HighlightTab data={sessionData} />}
        {activeTab === "quiz" && <QuizTab data={sessionData} />}

      </div>

      <button
        type="button"
        onClick={() => setShowChat(!showChat)}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "70px",
          width: "62px",
          height: "62px",
          borderRadius: "50%",
          border: "none",
          background: "#0f1f5c",
          color: "#ffffff",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.18)",
          cursor: "pointer",
          zIndex: 50,
        }}
        aria-label="Open chat"
      >
        <MessageCircleMore size={24} />
      </button>

      {showChat && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.35)",
            display: "grid",
            placeItems: "center",
            zIndex: 40,
            padding: "24px",
          }}
          onClick={() => setShowChat(false)}
        >
          <div style={{ width: "100%", maxWidth: "760px" }} onClick={(e) => e.stopPropagation()}>
            <ChatBot onClose={() => setShowChat(false)} documentId={documentId} />
          </div>
        </div>
      )}
    </div>
  );
}