"use client";

import { useInsights } from "./hooks/use-insights";
import FocusTimeCard from "./components/focus-time-card";
import WeeklyActivityCard from "./components/weekly-activity-card";
import ProductiveTimeCard from "./components/productive-time-card";
import WeeklySessionsCard from "./components/weekly-sessions-card";
import FadeLoader from "@/components/ui/FadeLoader";

export default function InsightsPage() {
  const { insights, loading } = useInsights();

  if (loading || !insights || !insights.weeklyActivity) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#9ca3af" }}>
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-32 px-6 pb-16">
      <div className="max-w-[1050px] mx-auto">

        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "2rem" }}>
          Your Insights
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem", marginBottom: "1rem" }}>
          <FocusTimeCard
            minutes={insights.weeklyFocusMinutes}
            percentageChange={insights.focusPercentageChange}
          />
          <WeeklyActivityCard data={insights.weeklyActivity} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <ProductiveTimeCard
            start={insights.mostProductiveStart}
            end={insights.mostProductiveEnd}
            label={insights.mostProductiveLabel}
            tip={insights.productiveTip}
          />
          <WeeklySessionsCard sessions={insights.weeklySessions} />
        </div>

      </div>
    </div>
  );
}