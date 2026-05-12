import { InsightsData } from "../types/insights";

export const mockInsights: InsightsData = {
  weeklyFocusMinutes: 327,
  focusPercentageChange: 18,
  weeklyActivity: [
    { day: "Mon", minutes: 40 },
    { day: "Tue", minutes: 90 },
    { day: "Wed", minutes: 55 },
    { day: "Thu", minutes: 35 },
    { day: "Fri", minutes: 80 },
    { day: "Sat", minutes: 20 },
    { day: "Sun", minutes: 15 },
  ],
  mostProductiveStart: "7 PM",
  mostProductiveEnd: "9 PM",
  mostProductiveLabel: "Evening Focus Peak",
  productiveTip: "Schedule your hardest tasks for 7 PM to leverage your natural energy flow.",
  weeklySessions: 12,
};