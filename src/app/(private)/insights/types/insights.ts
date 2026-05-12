export interface DailyActivity {
  day: string;
  minutes: number;
}

export interface InsightsData {
  weeklyFocusMinutes: number;
  focusPercentageChange: number;
  weeklyActivity: DailyActivity[];
  mostProductiveStart: string;
  mostProductiveEnd: string;
  mostProductiveLabel: string;
  productiveTip: string;
  weeklySessions: number;
}