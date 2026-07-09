import Image from "next/image";
import timeIcon from "@/assets/icontime.png";

interface Props {
  recommendation: string;
  adhdLevel: string;
  mostProductiveStart?: string;
  mostProductiveEnd?: string;
  mostProductiveLabel?: string;
}

export default function ProductiveTimeCard({
  recommendation,
  adhdLevel,
  mostProductiveStart,
  mostProductiveEnd,
  mostProductiveLabel
}: Props) {
  const hasData = !!(mostProductiveStart && mostProductiveEnd);

  const lvl = adhdLevel ? adhdLevel.toLowerCase() : "";
  let displayRec = recommendation;
  if (lvl.includes("severe") || lvl.includes("high")) {
    displayRec = "You have Severe ADHD. 10-minute study sessions are recommended for you.";
  } else if (lvl.includes("moderate")) {
    displayRec = "You have Moderate ADHD. 15-minute study sessions are recommended for you.";
  } else if (lvl.includes("mild")) {
    displayRec = "You have Mild ADHD. 25-minute study sessions are recommended for you.";
  }

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.75rem", minHeight: "260px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", margin: 0 }}>Most Productive</p>

      <div style={{ background: "#eff6ff", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <Image src={timeIcon} alt="time" width={20} height={20} />
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e3a8a" }}>
            {hasData ? `${mostProductiveStart} – ${mostProductiveEnd}` : "Gathering data..."}
          </p>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>
            {hasData ? (mostProductiveLabel || "Focus Peak") : "Study more sessions to find your peak focus time"}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9ca3af", marginBottom: "6px" }}>
          <span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span>
        </div>
        <div style={{ display: "flex", gap: "3px", height: "8px" }}>
          {[15, 25, 20, 30, 15, 40, 90, 30].map((v, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: "4px",
              background: hasData ? (i === 6 ? "#1e3a8a" : i === 2 || i === 3 ? "#93c5fd" : "#e5e7eb") : "#e5e7eb",
            }} />
          ))}
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6, fontStyle: "italic" }}>
        Tip: {displayRec}
      </p>
    </div>
  );
}