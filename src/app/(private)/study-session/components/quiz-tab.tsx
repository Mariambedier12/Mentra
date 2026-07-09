import { useState } from "react";
import Image from "next/image";
import { SessionData, QuizQuestion } from "../types/session";
import quizmeIcon from "@/assets/quizme.png";
import correctIcon from "@/assets/correct.png";
import wrongIcon from "@/assets/wrong.png";

interface Props {
  data: SessionData;
}

const mockQuestions: QuizQuestion[] = [
  {
    question: "What does Information Processing compare the human mind to?",
    options: ["A calculator", "A computer", "A robot", "A network"],
    correct: 1,
  },
  {
    question: "What is Selective Attention?",
    options: [
      "Remembering everything equally",
      "Focusing on one object while ignoring others",
      "Processing multiple tasks at once",
      "Storing memories long-term",
    ],
    correct: 1,
  },
  {
    question: "What is the first step in creating a new memory?",
    options: ["Retrieval", "Storage", "Memory Encoding", "Consolidation"],
    correct: 2,
  },
];

export default function QuizTab({ data }: Props) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Compile list of questions: check finalQuiz, then compile from chunks, then fallback to mock questions
  const quizQuestions = data.finalQuiz && data.finalQuiz.length > 0
    ? data.finalQuiz
    : (data.chunks?.flatMap((c) => c.quiz || []) || []);

  const questions = quizQuestions.length > 0 ? quizQuestions : mockQuestions;
  const q = questions[current];

  // Resolve correct answer index from various possible keys (correctAnswerIndex vs correct)
  const correctAnswer = typeof q.correctAnswerIndex === "number"
    ? q.correctAnswerIndex
    : (typeof q.correct === "number" ? q.correct : 0);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === correctAnswer) {
      setScore((s) => s + 1);
      if (typeof window !== "undefined") {
        const audio = new Audio("/sounds/right-answer1.mp3");
        audio.play().catch((e) => console.log("Audio play error:", e));
      }
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <div style={{
        background: "white",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        padding: "3.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        gap: "1.5rem"
      }}>
        <Image src={quizmeIcon} alt="Quiz Me" width={120} height={120} style={{ objectFit: "contain" }} />
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "black", margin: "0 0 8px 0" }}>Quiz me</h2>
          <p style={{ fontSize: "16px", color: "black", margin: 0, fontWeight: 500 }}>
            Test your understanding in a quick way
          </p>
        </div>
        <button
          onClick={() => setStarted(true)}
          style={{
            background: "#091A58",
            color: "white",
            padding: "0.875rem 4rem",
            borderRadius: "99px",
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            width: "90%",
            maxWidth: "320px",
            boxShadow: "0 4px 12px rgba(9, 26, 88, 0.25)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(9, 26, 88, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(9, 26, 88, 0.25)";
          }}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2.5rem 2rem", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <div style={{ fontSize: "52px", marginBottom: "1.25rem" }}>🎉</div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>
          Quiz Complete!
        </h2>
        <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "2rem" }}>
          You scored <strong style={{ color: "#4338ca", fontSize: "18px" }}>{score}</strong> out of <strong style={{ color: "#1f2937", fontSize: "18px" }}>{questions.length}</strong>
        </p>
        <button
          onClick={() => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setStarted(false); }}
          style={{ 
            background: "#091A58", 
            color: "white", 
            padding: "0.875rem 2.5rem", 
            borderRadius: "99px", 
            fontSize: "14px", 
            fontWeight: 600, 
            border: "none", 
            cursor: "pointer",
            boxShadow: "0 4px 6px -1px rgba(9, 26, 88, 0.2)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem", borderBottom: "1px solid #f3f4f6", paddingBottom: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1f2937" }}>Quiz Me</h2>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "2px" }}>Test your retention on this lecture</p>
        </div>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#4b5563", background: "#f3f4f6", padding: "4px 10px", borderRadius: "99px" }}>
          {current + 1} / {questions.length}
        </span>
      </div>

      <p style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "1.75rem", lineHeight: 1.6 }}>
        {q.question}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.75rem" }}>
        {q.options.map((opt, i) => {
          let bg = "#f9fafb";
          let border = "1px solid #e5e7eb";
          let color = "#1f2937";
          let cursor = "pointer";

          if (selected !== null) {
            cursor = "default";
            if (i === correctAnswer) { 
              bg = "#dcfce7"; 
              border = "1.5px solid #10b981"; 
              color = "#065f46"; 
            }
            else if (i === selected) { 
              bg = "#fee2e2"; 
              border = "1.5px solid #ef4444"; 
              color = "#991b1b"; 
            }
          }

          return (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              style={{ 
                padding: "1rem 1.25rem", 
                borderRadius: "12px", 
                background: bg, 
                border, 
                color, 
                fontSize: "14px", 
                fontWeight: 500,
                cursor, 
                transition: "all 0.15s ease",
                boxShadow: selected === null ? "0 1px 2px rgba(0,0,0,0.01)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
              onMouseEnter={(e) => {
                if (selected === null) {
                  e.currentTarget.style.background = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }
              }}
              onMouseLeave={(e) => {
                if (selected === null) {
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }
              }}
            >
              {selected !== null && i === correctAnswer && (
                <Image src={correctIcon} alt="Correct" width={16} height={16} style={{ objectFit: "contain", flexShrink: 0 }} />
              )}
              {selected !== null && i === selected && i !== correctAnswer && (
                <Image src={wrongIcon} alt="Wrong" width={16} height={16} style={{ objectFit: "contain", flexShrink: 0 }} />
              )}
              <span>{opt}</span>
            </div>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", borderTop: "1px solid #f3f4f6", paddingTop: "1.25rem" }}>
          <button
            onClick={handleNext}
            style={{ 
              background: "#091A58", 
              color: "white", 
              padding: "0.6rem 2rem", 
              borderRadius: "99px", 
              fontSize: "14px", 
              fontWeight: 600, 
              border: "none", 
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(9, 26, 88, 0.2)",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            {current < questions.length - 1 ? "Next Question →" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
}