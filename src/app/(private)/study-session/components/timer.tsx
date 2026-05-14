interface Props {
  time: string;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onEnd: () => void;
}

export default function Timer({ time, isRunning, onToggle, onReset, onEnd }: Props) {
  return (
    <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "18px" }}>⏱</span>
        <span style={{ fontSize: "24px", fontWeight: 700, color: "#1f2937" }}>{time}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={onToggle}
          style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0f1f5c", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px" }}
        >
          {isRunning ? "⏸" : "▶"}
        </button>
        <button
          onClick={onReset}
          style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f3f4f6", border: "1px solid #e5e7eb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}
        >
          🔄
        </button>
        <button
          onClick={onEnd}
          style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: "white", border: "1.5px solid #ef4444", color: "#ef4444", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
        >
          End
        </button>
      </div>
    </div>
  );
}