import { useState } from "react";
import { SessionData } from "../types/session";

interface Props {
  data: SessionData;
}

const fallbackQuestions = [
  {
    question: "What does Information Processing compare the human mind to?",
    options: ["A calculator", "A computer", "A robot", "A network"],
    correctAnswerIndex: 1,
  },
];

export default function QuizTab({ data }: Props) {
  const questions = data.quiz && data.quiz.length > 0 ? data.quiz : fallbackQuestions;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctAnswerIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "1rem" }}>🎉</div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>
          Quiz Complete!
        </h2>
        <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "1.5rem" }}>
          You scored <strong style={{ color: "#1e3a8a" }}>{score}/{questions.length}</strong>
        </p>
        <button
          onClick={() => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); }}
          style={{ background: "#0f1f5c", color: "white", padding: "0.75rem 2rem", borderRadius: "99px", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1f2937" }}>Quiz Me</h2>
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>{current + 1} / {questions.length}</span>
      </div>

      <p style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        {q.question}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {q.options.map((opt, i) => {
          let bg = "#f9fafb";
          let border = "1px solid #e5e7eb";
          let color = "#1f2937";

          if (selected !== null) {
            if (i === q.correctAnswerIndex) { bg = "#dcfce7"; border = "1.5px solid #16a34a"; color = "#166534"; }
            else if (i === selected) { bg = "#fee2e2"; border = "1.5px solid #ef4444"; color = "#991b1b"; }
          }

          return (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              style={{ padding: "0.875rem 1.25rem", borderRadius: "10px", background: bg, border, color, fontSize: "14px", cursor: selected === null ? "pointer" : "default", transition: "all 0.15s ease" }}
            >
              {opt}
            </div>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ textAlign: "right" }}>
          <button
            onClick={handleNext}
            style={{ background: "#0f1f5c", color: "white", padding: "0.6rem 1.5rem", borderRadius: "99px", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer" }}
          >
            {current < questions.length - 1 ? "Next →" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}