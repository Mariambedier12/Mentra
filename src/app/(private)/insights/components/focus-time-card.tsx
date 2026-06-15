interface Props {
  minutes: number;
}

export default function FocusTimeCard({ minutes }: Props) {
  const circumference = 2 * Math.PI * 50;
  const maxMinutes = 600;
  const progress = circumference * Math.min(minutes / maxMinutes, 1);

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "1.5rem" }}>Weekly Focus Time</p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <div style={{ position: "relative", width: "120px", height: "120px" }}>
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke="#3b82f6" strokeWidth="12"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#1f2937" }}>{minutes}</div>
            <div style={{ fontSize: "10px", color: "#9ca3af" }}>MINUTES</div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "13px", color: "#6b7280", textAlign: "center" }}>
        Last 7 days
      </p>
    </div>
  );
}