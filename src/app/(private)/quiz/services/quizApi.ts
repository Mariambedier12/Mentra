import { Question } from "../types/quiz";
import { mockQuestions } from "../data/mockQuestions";

export const fetchQuestions = async (): Promise<Question[]> => {
  // هنا هنحط الـ API call لما يوصل
  // دلوقتي بنرجع الـ mock data
  return mockQuestions;
};