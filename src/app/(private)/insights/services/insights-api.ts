import { InsightsData } from "../types/insights";
import { mockInsights } from "../data/mock-insights";

const BASE_URL = "http://mentraa.runasp.net";

export const fetchWeeklySummary = async (token: string): Promise<InsightsData> => {
  if (!token) return mockInsights;

  try {
    const res = await fetch(`${BASE_URL}/api/Insights/weekly-summary`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return mockInsights;
    const data = await res.json();
    console.log("Weekly summary API response:", data);
    
    // Map fields from both older/newer formats or fall back safely
    const totalStudyMinutes = 
      data.totalStudyMinutesLast7Days ?? 
      data.weeklyFocusMinutes ?? 
      mockInsights.totalStudyMinutesLast7Days;

    const totalSessions = 
      data.totalSessionsLast7Days ?? 
      data.weeklySessions ?? 
      mockInsights.totalSessionsLast7Days;

    const averageSessionMinutes = 
      data.averageSessionMinutes ?? 
      (totalSessions > 0 ? Math.round(totalStudyMinutes / totalSessions) : 0) ?? 
      mockInsights.averageSessionMinutes;

    const adhdLevel = 
      data.adhdLevel ?? 
      mockInsights.adhdLevel;

    const aiRecommendation = 
      data.aiRecommendation ?? 
      data.productiveTip ?? 
      mockInsights.aiRecommendation;

    return {
      totalStudyMinutesLast7Days: totalStudyMinutes,
      totalSessionsLast7Days: totalSessions,
      averageSessionMinutes,
      adhdLevel,
      aiRecommendation,
      weeklyActivity: data.weeklyActivity,
      mostProductiveStart: data.mostProductiveStart,
      mostProductiveEnd: data.mostProductiveEnd,
      mostProductiveLabel: data.mostProductiveLabel,
      focusPercentageChange: data.focusPercentageChange ?? data.percentageChange,
    };
  } catch (error) {
    console.error("fetchWeeklySummary error:", error);
    return mockInsights;
  }
};