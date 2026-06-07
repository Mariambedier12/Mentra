"use client";

import { useInsights } from "./hooks/use-insights";
import FocusTimeCard from "./components/focus-time-card";
import WeeklyActivityCard from "./components/weekly-activity-card";
import ProductiveTimeCard from "./components/productive-time-card";
import WeeklySessionsCard from "./components/weekly-sessions-card";
import FadeLoader from "@/components/ui/FadeLoader";

export default function InsightsPage() {
  const { insights } = useInsights();

  return (
    <div style={{ minHeight: "100vh", background: "#FAF9F7", padding: "6rem 2rem 2rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "2rem" }}>
          Your Insights
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem", marginBottom: "1rem" }}>
          <FocusTimeCard
            minutes={insights.totalStudyMinutesLast7Days}
          />
          <WeeklyActivityCard
            totalMinutes={insights.totalStudyMinutesLast7Days}
            averageMinutes={insights.averageSessionMinutes}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <ProductiveTimeCard
            recommendation={insights.aiRecommendation}
            adhdLevel={insights.adhdLevel}
          />
          <WeeklySessionsCard sessions={insights.totalSessionsLast7Days} />
        </div>

      </div>
    </div>
  );
}