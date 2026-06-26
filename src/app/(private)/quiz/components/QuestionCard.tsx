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
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
          Quiz
        </h1>
        <p style={{ fontSize: "17px", color: "#1E1E1E" }}>
          Answer based on your daily behavior
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span style={{ color: "#091A58" }}>STEP {questionNumber} OF {totalQuestions}</span>
          <span style={{ color: "#091A58" }}>{Math.round(progress)}% Complete</span>
        </div>
        <div style={{ height: "6px", background: " #EDEEEF", borderRadius: "99px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: " #091A58",
            borderRadius: "99px",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div className="bg-#FFFFFF rounded-xl border border-gray-200 p-8">
        <p className="text-sm text-black-500 mb-3 font-medium">Question {questionNumber}</p>
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

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", paddingTop: "1.5rem" }}>
          <button
            onClick={onNext}
            disabled={selectedAnswer === null || selectedAnswer === undefined}
            style={{
              padding: "0.5rem 3.70rem",
              borderRadius: "24px",
              border: "none",
              fontSize: "17px",
              fontWeight: "bold",
              color: "white",
              background: (selectedAnswer === null || selectedAnswer === undefined) ? "#a5b4fc" : "#091A58",
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