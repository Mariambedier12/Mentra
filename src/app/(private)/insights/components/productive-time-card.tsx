import Image from "next/image";
import timeIcon from "@/assets/icontime.png";

interface Props {
  recommendation: string;
  adhdLevel: string;
}

export default function ProductiveTimeCard({ recommendation, adhdLevel }: Props) {
  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937", marginBottom: "1rem" }}>Most Productive</p>

      <div style={{ background: "#eff6ff", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <Image src={timeIcon} alt="time" width={20} height={20} />
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e3a8a" }}>7 PM – 9 PM</p>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>Evening Focus Peak</p>
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
              background: i === 6 ? "#1e3a8a" : i === 2 || i === 3 ? "#93c5fd" : "#e5e7eb",
            }} />
          ))}
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6, fontStyle: "italic" }}>
        Tip: {recommendation}
      </p>
    </div>
  );
}