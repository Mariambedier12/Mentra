export type TabType = "summary" | "highlight" | "quiz";

export interface SessionData {
  sessionId: number;
  documentId: number;
  duration: number; // بالثواني
  summary: {
    title: string;
    points: { heading: string; text: string }[];
  };
}