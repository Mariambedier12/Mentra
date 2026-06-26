const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  totalMinutes: number;
  averageMinutes: number;
}

export default function WeeklyActivityCard({ totalMinutes, averageMinutes }: Props) {
  // نوزع الـ totalMinutes على الأيام بشكل تقريبي
  const baseValue = Math.max(totalMinutes / 7, 1);
  const weeklyData = DAYS.map((day, i) => ({
    day,
    value: Math.round(baseValue * [0.5, 1.2, 0.7, 0.4, 1.0, 0.3, 0.2][i]),
  }));

  const maxValue = Math.max(...weeklyData.map((d) => d.value), 1);
  const topDays = [...weeklyData].sort((a, b) => b.value - a.value).slice(0, 2).map((d) => d.day);

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>Weekly Activity</p>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>Mon – Sun</p>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "120px", marginBottom: "0.75rem" }}>
        {weeklyData.map((d) => (
          <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${Math.max((d.value / maxValue) * 100, 8)}%`,
                background: topDays.includes(d.day) ? "#1e3a8a" : "#dbeafe",
                borderRadius: "6px 6px 0 0",
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {weeklyData.map((d) => (
          <div key={d.day} style={{
            flex: 1,
            textAlign: "center",
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