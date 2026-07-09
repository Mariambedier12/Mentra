"use client";

import { useState } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { QuestionCard } from "./QuestionCard";
import { QuizResult } from "./QuizResult";
import ReadyScreen from "./ready-screen";
import FadeLoader from "@/components/ui/FadeLoader";

export const QuizContainer = () => {
  const [stage, setStage] = useState<"ready" | "quiz" | "result">("ready");

  const {
    questions,
    currentQuestion,
    currentIndex,
    selectedAnswer,
    progress,
    result,
    loading,
    selectAnswer,
    goNext,
  } = useQuiz();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        <FadeLoader />
      </div>
    );
  }

  if (stage === "ready") {
    return <ReadyScreen onStart={() => setStage("quiz")} />;
  }

  if (result || stage === "result") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-10">
        <QuizResult result={result!} onRestart={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-10">
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        onSelect={(optionId) => selectAnswer(currentQuestion.id, optionId)}
        onNext={goNext}
        progress={progress}
      />
    </div>
  );
};