export interface Answer {
  id: number;
  text: string;
  score?: number;
}

export type Option = Answer;


export interface Question {
  id: number;
  text: string;
  answers?: Answer[];
  options?: Option[];
}

export interface QuizData {
  id: number;
  title: string;
  questions: Question[];
}

export interface SubmitPayload {
  quizId: number;
  answers: { questionId: number; selectedAnswerId: number }[];
}

export interface QuizResult {
  level: string;
  score: number;
  totalQuestions: number;
}