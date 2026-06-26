export type TabType = "summary" | "highlight" | "quiz";

export interface AIQuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface SessionData {
  summary: {
    title: string;
    points: { heading: string; text: string }[];
  };
  rawSummary?: string;
  highlights?: string[];
  quiz?: AIQuizQuestion[];
}