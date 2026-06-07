import { QuizData, SubmitPayload } from "../types/quiz";

const BASE_URL = "http://mentraa.runasp.net";

export const fetchQuiz = async (): Promise<QuizData> => {
  const res = await fetch(`${BASE_URL}/api/Quiz/1`);
  return res.json();
};

export const submitQuiz = async (payload: SubmitPayload, token: string) => {
  const res = await fetch(`${BASE_URL}/api/Quiz/submit-quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const fetchMyLevel = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/Quiz/my-level`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};