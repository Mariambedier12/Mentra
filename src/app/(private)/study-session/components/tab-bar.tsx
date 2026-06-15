import Image from "next/image";
import { TabType } from "../types/session";
import summaryIcon from "@/assets/summary.png";
import highlightIcon from "@/assets/highlight.png";
import quizIcon from "@/assets/quiz.png";

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabBar({ activeTab, onTabChange }: Props) {
  const tabs = [
    { key: "summary" as TabType, label: "Summary", icon: summaryIcon },
    { key: "highlight" as TabType, label: "Highlight", icon: highlightIcon },
    { key: "quiz" as TabType, label: "Quiz Me", icon: quizIcon },
  ];

  return (
    <div style={{ display: "flex", gap: "8px", background: "transparent", borderRadius: "99px", padding: "4px", marginBottom: "1.5rem" }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            flex: 1,
            padding: "0.65rem",
            borderRadius: "99px",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === tab.key ? 600 : 500,
            background: activeTab === tab.key ? "#0f1f5c" : "#E1E2EC",
            color: activeTab === tab.key ? "white" : "#4b5563",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: activeTab === tab.key ? "0 4px 10px rgba(15, 31, 92, 0.2)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab.key) {
              e.currentTarget.style.background = "#d2d4df";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab.key) {
              e.currentTarget.style.background = "#E1E2EC";
            }
          }}
        >
          <Image 
            src={tab.icon} 
            alt={tab.label} 
            width={16} 
            height={16} 
            style={{ 
              filter: activeTab === tab.key ? "brightness(0) invert(1)" : "none",
              objectFit: "contain"
            }} 
          />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}