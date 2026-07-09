"use client";

import { useInsights } from "./hooks/use-insights";
import FocusTimeCard from "./components/focus-time-card";
import WeeklyActivityCard from "./components/weekly-activity-card";
import ProductiveTimeCard from "./components/productive-time-card";
import WeeklySessionsCard from "./components/weekly-sessions-card";

export default function InsightsPage() {
  const { insights, loading } = useInsights();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-400 text-lg font-medium">
        Loading Insights...
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-[1100px] mx-auto">

        <h1 className="text-[28px] font-bold text-[#1f2937] mb-8 leading-none">
          Your Insights
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mb-6">
          <FocusTimeCard
            minutes={insights.totalStudyMinutesLast7Days}
            percentageChange={insights.focusPercentageChange}
          />
          <WeeklyActivityCard
            totalMinutes={insights.totalStudyMinutesLast7Days}
            averageMinutes={insights.averageSessionMinutes}
            weeklyActivity={insights.weeklyActivity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductiveTimeCard
            recommendation={insights.aiRecommendation}
            adhdLevel={insights.adhdLevel}
            mostProductiveStart={insights.mostProductiveStart}
            mostProductiveEnd={insights.mostProductiveEnd}
            mostProductiveLabel={insights.mostProductiveLabel}
          />
          <WeeklySessionsCard sessions={insights.totalSessionsLast7Days} />
        </div>

      </div>
    </div>
  );
}