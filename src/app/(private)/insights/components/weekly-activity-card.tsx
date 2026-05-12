import { DailyActivity } from "../types/insights";

interface Props {
  data: DailyActivity[];
}

export default function WeeklyActivityCard({ data }: Props) {
  const maxValue = Math.max(...data.map((d) => d.minutes));
  const topDays = [...data].sort((a, b) => b.minutes - a.minutes).slice(0, 2).map((d) => d.day);

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>Weekly Activity</p>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>Mon – Sun</p>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "120px", marginBottom: "0.75rem" }}>
        {data.map((d) => (
          <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${(d.minutes / maxValue) * 100}%`,
                background: topDays.includes(d.day) ? "#1e3a8a" : "#dbeafe",
                borderRadius: "6px 6px 0 0",
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        {data.map((d) => (
          <div key={d.day} style={{
            flex: 1, textAlign: "center",
            fontSize: "12px",
            fontWeight: topDays.includes(d.day) ? 700 : 400,
            color: topDays.includes(d.day) ? "#1e3a8a" : "#9ca3af",
          }}>
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}