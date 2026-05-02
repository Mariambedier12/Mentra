export interface Option {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: Record<number, number>; // questionId -> optionId
}