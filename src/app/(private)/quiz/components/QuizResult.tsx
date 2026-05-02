import { QuizResult as QuizResultType } from "../types/quiz";

interface Props {
  result: QuizResultType;
  onRestart: () => void;
}

type Level = "Mild" | "Moderate" | "Severe";

const levelConfig = {
  Mild: {
    color: "#86efac",
    textColor: "#166534",
    description: "You may experience occasional focus challenges, but you can stay on track with the right structure.",
  },
  Moderate: {
    color: "#fde68a",
    textColor: "#92400e",
    description: "You show moderate ADHD-related patterns. Structured tools and strategies can make a big difference.",
  },
  Severe: {
    color: "#fca5a5",
    textColor: "#991b1b",
    description: "Your responses suggest significant ADHD-related challenges. We recommend consulting a healthcare professional.",
  },
};

export const QuizResult = ({ result, onRestart }: Props) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  const level: Level = percentage < 40 ? "Mild" : percentage < 70 ? "Moderate" : "Severe";
  const config = levelConfig[level];

  return (
    <div style={{ width: "100%", maxWidth: "780px", margin: "0 auto", paddingTop: "3rem" }}>

      {/* Title */}
      <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1f2937", textAlign: "center", marginBottom: "2rem" }}>
        Your ADHD Level: {level}
      </h1>

      {/* Card */}
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", marginBottom: "1.5rem" }}>

        {/* Level Tabs */}
        <div style={{ display: "flex", background: "#f3f4f6", borderRadius: "99px", padding: "4px", marginBottom: "2rem" }}>
          {(["Mild", "Moderate", "Severe"] as Level[]).map((l) => (
            <div
              key={l}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0.6rem",
                borderRadius: "99px",
                fontSize: "15px",
                fontWeight: level === l ? 600 : 400,
                background: level === l ? config.color : "transparent",
                color: level === l ? config.textColor : "#9ca3af",
                transition: "all 0.2s ease",
              }}
            >
              {l}
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ textAlign: "center", fontSize: "15px", color: "#4b5563", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "520px", margin: "0 auto 2rem" }}>
          {config.description}
        </p>

        {/* Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1a3a8f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0f1f5c")}
            style={{
              background: "#0f1f5c",
              color: "white",
              padding: "1rem 2.5rem",
              borderRadius: "99px",
              fontSize: "15px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              width: "100%",
              maxWidth: "509px",
              transition: "background 0.2s ease",
            }}
          >
            Continue to your personalized experience →
          </button>
        </div>

      </div>

      {/* Feature Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "20px", marginBottom: "0.5rem" }}>💡</div>
          <p style={{ fontWeight: 600, color: "#1f2937", marginBottom: "0.25rem" }}>AI</p>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>AI summarizes materials, highlights key points, and generates questions.</p>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "20px", marginBottom: "0.5rem" }}>🌿</div>
          <p style={{ fontWeight: 600, color: "#1f2937", marginBottom: "0.25rem" }}>Focus Tools</p>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>Unlock personalized timers.</p>
        </div>
      </div>

    </div>
  );
};