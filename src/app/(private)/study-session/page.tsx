"use client";

import { useRouter } from "next/navigation";
import { useStudySession } from "./hooks/use-session";
import Timer from "./components/timer";
import TabBar from "./components/tab-bar";
import SessionProgress from "./components/session-progress";
import SummaryTab from "./components/summary-tab";
import HighlightTab from "./components/highlight-tab";
import QuizTab from "./components/quiz-tab";

export default function StudySessionPage() {
  const router = useRouter();
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
    </div>
  );
}