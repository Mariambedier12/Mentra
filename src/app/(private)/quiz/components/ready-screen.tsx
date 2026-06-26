"use client";

import Image from "next/image";
import readyImg from "@/assets/ready.png";
import { Bold } from "lucide-react";

const features = [
  {
    title: (
      <>
        18
        <br />
        Questions
      </>
    ),
    
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12.5L11.5 15L15 10.5" stroke="#0f1f5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0f1f5c" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: (
      <>
        Quick
        <br />
        Assessment
      </>
    ),
    
    
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V12L15.5 15.5" stroke="#0f1f5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.4 12C20.4 16.692 16.692 20.4 12 20.4C7.308 20.4 3.6 16.692 3.6 12C3.6 7.308 7.308 3.6 12 3.6C16.692 3.6 20.4 7.308 20.4 12Z" stroke="#0f1f5c" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: (
      <>
        Private
        <br />
        Results
      </>
    ),
    
    
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" stroke="#0f1f5c" strokeWidth="1.8" />
        <path d="M8.5 12.5L10.8 14.8L15.5 10.1" stroke="#0f1f5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: "#ebeae8",
                borderRadius: "28px",
                padding: "1.75rem 1.5rem",
                width: "210px",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.85rem",
                boxShadow: "0 12px 24px rgba(15, 23, 48, 0.06)",
              }}
            >
              <div
                style={{
                  width: "3rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  
                  borderRadius: "14px",
                }}
              >
                {feature.icon}
              </div>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" }}>
                {feature.title}
              </p>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1a3a8f")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0f1f5c")}
          style={{
            width: "100%",
            maxWidth: "430px",
            margin: "0 auto",
            background: "#0f1f5c",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "999px",
            fontSize: "18px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
