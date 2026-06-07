import { SessionData } from "../types/session";

interface Props {
  data: SessionData;
}

export default function SummaryTab({ data }: Props) {
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