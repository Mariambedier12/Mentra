export type TabType = "summary" | "highlight" | "quiz";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex?: number;
  correct?: number; // for compatibility with legacy mock data
}

export interface ChunkData {
  summary: string;
  highlights: string[];
  quiz?: QuizQuestion[];
}

export interface SessionData {
  sessionId: number;
  documentId: number;
  duration: number; // بالثواني
  adhdLevel?: string;
  studyRecommendation?: string;
  finalSummary?: string;
  chunks?: ChunkData[];
  finalQuiz?: QuizQuestion[];
  summary: {
    title: string;
    points: { heading: string; text: string }[];
  };
  rawSummary?: string;
  highlights?: string[];
  quiz?: QuizQuestion[];
}