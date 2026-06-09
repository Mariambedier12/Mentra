"use client";

import Image from "next/image";
import readyImg from "@/assets/ready.png";
import { Bold } from "lucide-react";

export default function ReadyScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      background: "#FAF9F7",
    }}>

      <Image
        src={readyImg}
        alt="Ready"
        width={163}
        height={164}
        style={{ marginBottom: "1.5rem" }}
      />

      <h1 style={{
        fontSize: "39px",
        fontWeight: 700,
        color: "#1f2937",
        marginBottom: "1.5rem",
      }}>
        Ready For Your Quiz?
      </h1>

      <button
        onClick={onStart}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1a3a8f")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#0f1f5c")}
        style={{
          background: "#0f1f5c",
          color: "white",
          padding: "0.85rem 3rem",
          borderRadius: "99px",
          fontSize: "20px",
          fontWeight: 500,
          border: "none",
          cursor: "pointer",
          width: "420px",
          transition: "background 0.2s ease",
        }}
      >
        Start
      </button>


    </div>
  );
}