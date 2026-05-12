interface Props {
  sessions: number;
}

export default function WeeklySessionsCard({ sessions }: Props) {
  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>WEEKLY SESSIONS</p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937" }}>{sessions} sessions</p>
        </div>
        <div style={{ background: "#eff6ff", borderRadius: "10px", padding: "0.6rem" }}>
          <span style={{ fontSize: "18px" }}>🎯</span>
        </div>
      </div>
    </div>
  );
}