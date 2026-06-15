interface Props {
  totalMinutes: number;
  averageMinutes: number;
}

export default function WeeklyActivityCard({ totalMinutes, averageMinutes }: Props) {
  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>Weekly Activity</p>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>Last 7 days</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Total Study Time</p>
          <p style={{ fontSize: "18px", fontWeight: 700, color: "#1e3a8a" }}>{totalMinutes} min</p>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Avg Session</p>
          <p style={{ fontSize: "18px", fontWeight: 700, color: "#1e3a8a" }}>{averageMinutes} min</p>
        </div>
      </div>
    </div>
  );
}