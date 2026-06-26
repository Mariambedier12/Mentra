import { SessionData } from "../types/session";

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (trimmed === "---" || trimmed === "") return null;

    if (/^\*\*.*\*\*$/.test(trimmed)) {
      return (
        <h3 key={i} style={{ fontSize: "16px", fontWeight: 700, color: "#1f2937", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
          {renderInline(trimmed.slice(2, -2))}
        </h3>
      );
    }

    if (trimmed.startsWith("- ")) {
      const indent = line.length - line.trimStart().length;
      return (
        <div key={i} style={{ display: "flex", gap: "8px", marginLeft: indent > 2 ? "1.25rem" : 0, marginBottom: "0.4rem" }}>
          <span style={{ color: "#9ca3af" }}>•</span>
          <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6, margin: 0 }}>{renderInline(trimmed.slice(2))}</p>
        </div>
      );
    }

    return (
      <p key={i} style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7, marginBottom: "0.4rem" }}>
        {renderInline(trimmed)}
      </p>
    );
  });
}

interface Props {
  data: SessionData;
}

export default function SummaryTab({ data }: Props) {
  if (data.rawSummary) {
    return (
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem" }}>
        {renderMarkdown(data.rawSummary)}
      </div>
    );
  }

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1f2937", marginBottom: "1.5rem" }}>
        {data.summary.title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data.summary.points.map((point, i) => (
          <div key={i} style={{ display: "flex", gap: "12px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9ca3af", marginTop: "8px", flexShrink: 0 }} />
            <p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.7 }}>
              <strong>{point.heading}:</strong> {point.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}