import { Question } from "../types/quiz";
import { AnswerOption } from "./AnswerOption";

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelect: (optionId: number) => void;
  onNext: () => void;
  progress: number;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onNext,
  progress,
}: Props) => {
  return (
    <div className="w-full max-w-3xl mx-auto">

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
          Quiz
        </h1>
        <p style={{ fontSize: "15px", color: "#6b7280" }}>
          Answer based on your daily behavior
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>STEP {questionNumber} OF {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "#4338ca",
            borderRadius: "99px",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <p className="text-sm text-gray-500 mb-3 font-medium">Question {questionNumber}</p>
        <h2 className="text-lg font-semibold text-gray-900 mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {(question.answers || question.options || []).map((answer) => (
            <AnswerOption
              key={answer.id}
              option={answer}
              isSelected={Number(selectedAnswer) === Number(answer.id)}
              onSelect={onSelect}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "2rem", paddingTop: "1.5rem" }}>
          <button
            onClick={onNext}
            disabled={selectedAnswer === null || selectedAnswer === undefined}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "24px",
              border: "none",
              fontSize: "14px",
              fontWeight: 500,
              color: "white",
              background: (selectedAnswer === null || selectedAnswer === undefined) ? "#a5b4fc" : "#4338ca",
              cursor: (selectedAnswer === null || selectedAnswer === undefined) ? "not-allowed" : "pointer",
            }}
          >
            {questionNumber === totalQuestions ? "Submit" : "Next"}
          </button>
        </div>
      </div>

    </div>
  );
};