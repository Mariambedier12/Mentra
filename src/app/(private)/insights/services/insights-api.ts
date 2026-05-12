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
    return res.json();
  } catch {
    return mockInsights;
  }
};