import { TabType } from "../types/session";

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabBar({ activeTab, onTabChange }: Props) {
  const tabs: { key: TabType; label: string }[] = [
    { key: "summary", label: "Summary" },
    { key: "highlight", label: "Highlight" },
    { key: "quiz", label: "Quiz Me" },
  ];

  return (
    <div style={{ display: "flex", background: "#f3f4f6", borderRadius: "99px", padding: "4px", marginBottom: "1.5rem" }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            flex: 1,
            padding: "0.6rem",
            borderRadius: "99px",
            border: "none",
            fontSize: "14px",
            fontWeight: activeTab === tab.key ? 600 : 400,
            background: activeTab === tab.key ? "#0f1f5c" : "transparent",
            color: activeTab === tab.key ? "white" : "#9ca3af",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}