"use client";

import { useState, useEffect } from "react";
import { Question, QuizResult } from "../types/quiz";
import { fetchQuestions } from "../services/quizApi";

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions().then((data) => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  const selectAnswer = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setResult({
        score: Object.keys(answers).length,
        totalQuestions: questions.length,
        answers,
      });
    }
  };

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const progress = questions.length > 0 ? (Object.keys(answers).length / questions.length) * 100 : 0;

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