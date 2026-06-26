import { SessionData } from "../types/session";

interface Props {
  data: SessionData;
}

export default function HighlightTab({ data }: Props) {
  const highlights = data.highlights && data.highlights.length > 0
    ? data.highlights
    : data.summary.points.slice(0, 3).map((p) => `${p.heading}: ${p.text}`);

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>
        Key Highlights
      </h2>
      <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "1.5rem" }}>
        Most important points from your lecture
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {highlights.map((h, i) => (
          <div key={i} style={{ background: "#eff6ff", borderRadius: "12px", padding: "1rem 1.25rem", borderLeft: "4px solid #1e3a8a" }}>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6 }}>
              {h}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}