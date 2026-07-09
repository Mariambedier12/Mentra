interface Props {
  minutes: number;
  percentageChange?: number;
}

export default function FocusTimeCard({ minutes, percentageChange }: Props) {
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const maxMinutes = 600;
  const progress = circumference * Math.min(minutes / maxMinutes, 1);

  const hasChange = percentageChange !== undefined && percentageChange !== null && !isNaN(percentageChange);
  const isPositive = hasChange && percentageChange >= 0;
  const displayValue = hasChange ? Math.abs(percentageChange) : 0;

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.75rem", minHeight: "310px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>Weekly Focus Time</p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "140px", height: "140px" }}>
          <svg viewBox="0 0 140 140" width="140" height="140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#dbeafe" strokeWidth="14" />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke="#5690D1" strokeWidth="14"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937" }}>{minutes}</div>
            <div style={{ fontSize: "11px", color: "#9ca3af", letterSpacing: "0.05em" }}>MINUTES</div>
          </div>
        </div>
      </div>

      {hasChange && (
        <p style={{ fontSize: "13px", color: isPositive ? "#10b981" : "#ef4444", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", margin: 0 }}>
          {isPositive ? "↗" : "↘"} {isPositive ? "+" : "-"}{displayValue}% from last week
        </p>
      )}
    </div>
  );
}