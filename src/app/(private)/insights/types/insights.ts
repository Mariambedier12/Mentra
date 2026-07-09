export interface InsightsData {
  totalStudyMinutesLast7Days: number;
  totalSessionsLast7Days: number;
  averageSessionMinutes: number;
  adhdLevel: string;
  aiRecommendation: string;
  
  weeklyActivity?: { day: string; minutes: number }[];
  mostProductiveStart?: string;
  mostProductiveEnd?: string;
  mostProductiveLabel?: string;
  focusPercentageChange?: number;
}