"use client";

import { useState, useEffect } from "react";
import { Question, QuizResult } from "../types/quiz";
import { fetchQuiz, submitQuiz } from "../services/quizApi";
import { useSession } from "next-auth/react";

export const useQuiz = () => {
  const { data: session, status } = useSession();
  const token = (session as any)?.user?.token;

  console.log("session:", session);
  console.log("token:", token);

  const [quizId, setQuizId] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz().then((data) => {
      setQuizId(data.id);
      setQuestions(data.questions);
      setLoading(false);
    });
  }, []);

  const selectAnswer = (questionId: number, answerId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const goNext = async () => {
    if (status === "loading") {
      console.log("SESSION STILL LOADING...");
      return;
    }

    if (!token) {
      console.log("NO TOKEN - USER NOT READY");
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    const payload = {
      quizId,
      answers: Object.entries(answers).map(
        ([questionId, selectedAnswerId]) => ({
          questionId: Number(questionId),
          selectedAnswerId,
        })
      ),
    };

    console.log("ABOUT TO SUBMIT QUIZ");

    try {
      const res = await submitQuiz(payload, token);

      console.log("SUBMIT SUCCESS RESPONSE:", res);

      setResult(res);
    } catch (err) {
      console.log("SUBMIT ERROR:", err);
    }
  };

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : null;

  const progress =
    questions.length > 0
      ? (Object.keys(answers).length / questions.length) * 100
      : 0;

  return {
    questions,
    currentQuestion,
    currentIndex,
    selectedAnswer,
    progress,
    result,
    loading,
    selectAnswer,
    goNext,
  };
};