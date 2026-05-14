interface Props {
  recommendation: string;
  adhdLevel: string;
}

export default function ProductiveTimeCard({ recommendation, adhdLevel }: Props) {
  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "1rem" }}>AI Recommendation</p>

      <div style={{ background: "#eff6ff", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "16px" }}>🧠</span>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e3a8a" }}>ADHD Level: {adhdLevel}</p>
        </div>
      </div>

      <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, fontStyle: "italic" }}>
        {recommendation}
      </p>
    </div>
  );
}