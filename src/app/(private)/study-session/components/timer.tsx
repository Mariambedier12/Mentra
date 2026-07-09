import Image from "next/image";
import studyscreentimer from "@/assets/studyscreentimer.png";
import rebegin from "@/assets/rebegin.png";

interface Props {
  time: string;
  isRunning: boolean;
  mode?: "study" | "break";
  isLoading?: boolean;
  onToggle: () => void;
  onReset: () => void;
  onEnd: () => Promise<void>;
}

export default function Timer({ time, isRunning, mode = "study", isLoading = false, onToggle, onReset, onEnd }: Props) {
  return (
    <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Container for timer icon */}
        <div style={{ 
          width: "40px", 
          height: "40px", 
          borderRadius: "50%", 
          background: mode === "break" ? "#FFFBEB" : "#F2F3FD", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          transition: "all 0.3s ease"
        }}>
          <Image src={studyscreentimer} alt="Timer Icon" width={20} height={20} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {isLoading ? (
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#9ca3af", display: "flex", alignItems: "center", gap: "8px", height: "26px" }}>
              <span className="inline-block w-4.5 h-4.5 rounded-full border-2 border-gray-200 border-t-[#091A58] animate-spin" />
              Loading...
            </span>
          ) : (
            <span style={{ fontSize: "24px", fontWeight: 700, color: "#1f2937", lineHeight: 1.1 }}>{time}</span>
          )}
          <span style={{ 
            fontSize: "12px", 
            fontWeight: 600, 
            color: mode === "break" ? "#d97706" : "#091A58",
            marginTop: "4px",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: mode === "break" ? "#d97706" : "#091A58",
              display: "inline-block",
              animation: isRunning ? "pulse-dot 1.5s infinite" : "none"
            }} />
            {mode === "break" ? "Break Time" : "Study Time"}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes pulse-dot {
          0% { transform: scale(0.85); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.85); opacity: 0.5; }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Play / Pause button */}
        <button
          onClick={onToggle}
          style={{ 
            width: "40px", 
            height: "40px", 
            borderRadius: "50%", 
            background: "#091A58", 
            border: "none", 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "white", 
            fontSize: "14px",
            boxShadow: "0 4px 10px rgba(9, 26, 88, 0.35)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          {isRunning ? "⏸" : "▶"}
        </button>
        {/* Rebegin button */}
        <button
          onClick={onReset}
          style={{ 
            width: "40px", 
            height: "40px", 
            borderRadius: "50%", 
            background: "rgba(225, 226, 236, 0.5)", 
            border: "none", 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(225, 226, 236, 0.8)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(225, 226, 236, 0.5)"}
        >
          <Image 
            src={rebegin} 
            alt="Restart Icon" 
            width={18} 
            height={18} 
            style={{ filter: "invert(27%) sepia(8%) saturate(1067%) hue-rotate(186deg) brightness(96%) contrast(89%)" }}
          />
        </button>
        {/* End button */}
        <button
          onClick={onEnd}
          style={{ 
            padding: "0.6rem 1.75rem", 
            borderRadius: "8px", 
            background: "white", 
            border: "1.5px solid #ef4444", 
            color: "#ef4444", 
            fontSize: "14px", 
            fontWeight: 600, 
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fef2f2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
          }}
        >
          End
        </button>
      </div>
    </div>
  );
}