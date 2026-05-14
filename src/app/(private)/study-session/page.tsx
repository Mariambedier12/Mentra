"use client";

import { useRouter } from "next/navigation";
import { useStudySession } from "./hooks/use-session";
import Timer from "./components/timer";
import TabBar from "./components/tab-bar";
import SessionProgress from "./components/session-progress";
import SummaryTab from "./components/summary-tab";

export default function StudySessionPage() {
  const router = useRouter();
  const {
    formattedTime,
    isRunning,
    toggle,
    reset,
    activeTab,
    setActiveTab,
    progress,
    sessionData,
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
          onEnd={() => router.push("/upload")}
        />

        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <SessionProgress progress={progress} />

        {activeTab === "summary" && <SummaryTab data={sessionData} />}
        {activeTab === "highlight" && (
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", textAlign: "center", color: "#9ca3af" }}>
            Highlight coming soon...
          </div>
        )}
        {activeTab === "quiz" && (
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", textAlign: "center", color: "#9ca3af" }}>
            Quiz Me coming soon...
          </div>
        )}

      </div>
    </div>
  );
}