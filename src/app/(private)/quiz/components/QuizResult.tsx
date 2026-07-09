"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { QuizResult as QuizResultType } from "../types/quiz";

interface Props {
  result: QuizResultType;
  onRestart: () => void;
}

type Level = "Mild" | "Moderate" | "Severe";

const levelConfig = {
  Mild: {
    color: "#22C55E",
    description:
      "You may experience occasional focus challenges, but you can stay on track with the right structure.",
    recommendations: [
      "Try 25-minute focus sessions",
      "Keep a daily routine tracker",
    ],
  },

  Moderate: {
    color: "#F59E0B",
    description:
      "You may experience occasional focus challenges, but you can stay on track with the right structure.",
    recommendations: [
      "Break tasks into smaller steps",
      "Reduce distractions during work",
    ],
  },

  Severe: {
    color: "#EF4444",
    description:
      "You may experience occasional focus challenges, but you can stay on track with the right structure.",
    recommendations: [
      "Start with 10-minute focus clocks",
      "Use visual reminders and checklists",
    ],
  },
};

const normalizeLevel = (raw: string): Level => {
  const level = raw.toLowerCase();

  if (level.includes("mild")) return "Mild";
  if (level.includes("moderate")) return "Moderate";
  if (level.includes("severe")) return "Severe";

  return "Mild";
};

export const QuizResult = ({ onRestart }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [level, setLevel] = useState<Level>("Mild");

  useEffect(() => {
    const token = (session as any)?.user?.token;

    if (!token) return;

    fetch("http://mentraa.runasp.net/api/Quiz/my-level", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.level) {
          setLevel(normalizeLevel(data.level));
        }
      })
      .catch((err) => console.error(err));
  }, [session]);

  const config = levelConfig[level];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "42px",
          fontWeight: 700,
          color: "#1F2937",
          marginBottom: "24px",
        }}
      >
        Your ADHD Level:{" "}
        <span style={{ color: config.color }}>
          {level} ADHD
        </span>
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: "18px",
          color: "#374151",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: 1.6,
        }}
      >
        {config.description}
      </p>

      {/* Recommendation Card */}
      <div
        style={{
          marginTop: "40px",
          background: "#f4f3f1",
          borderRadius: "24px",
          padding: "40px",
          width: "750px",
          height: "255px",
          marginInline: "auto",
          boxShadow: "0px 10px 35px rgba(0,0,0,0.08)",
          border: "1px solid #ebebeb",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#e5e5e3",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            <Lightbulb size={24} color="#14245C" fill="#14245C" strokeWidth={2} />
          </div>

          <h2
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#14245C",
              margin: 0,
            }}
          >
            Recommended for you
          </h2>
        </div>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingLeft: "0px",
            color: "#14245C",
            fontSize: "16px",
            listStyle: "none",
          }}
        >
          {config.recommendations.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#14245C",
                flexShrink: 0,
              }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => router.push("/upload")}
        style={{
          marginTop: "50px",
          width: "400px",
          maxWidth: "90%",
          height: "50px",
          borderRadius: "999px",
          border: "none",
          background: "#14245C",
          color: "#FFFFFF",
          fontSize: "18px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Continue
      </button>

      {/* Retake */}
      <div style={{ marginTop: "25px" }}>
        <button
          onClick={onRestart}
          style={{
            border: "none",
            background: "transparent",
            color: "#14245C",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          ↻ Retake Quiz
        </button>
      </div>
    </div>
  );
};