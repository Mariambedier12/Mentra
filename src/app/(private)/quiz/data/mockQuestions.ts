import { Question } from "../types/quiz";

export const mockQuestions: Question[] = [
  {
    id: 1,
    text: "How often do you have trouble wrapping up the final details of a project?",
    options: [
      { id: 1, text: "Never" },
      { id: 2, text: "Rarely" },
      { id: 3, text: "Sometimes" },
      { id: 4, text: "Often" },
      { id: 5, text: "Very often" },
    ],
  },
  {
    id: 2,
    text: "How often do you have difficulty getting things in order?",
    options: [
      { id: 1, text: "Never" },
      { id: 2, text: "Rarely" },
      { id: 3, text: "Sometimes" },
      { id: 4, text: "Often" },
      { id: 5, text: "Very often" },
    ],
  },
];