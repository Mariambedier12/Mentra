import { Option } from "../types/quiz";

interface Props {
  option: Option;
  isSelected: boolean;
  onSelect: (optionId: number) => void;
}

export const AnswerOption = ({ option, isSelected, onSelect }: Props) => {
  return (
    <div
      onClick={() => onSelect(option.id)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.25rem",
        borderRadius: "24px",
        border: isSelected ? "2px solid #4338ca" : "1px solid #e5e7eb",
        background: isSelected ? "#eef2ff" : "#f3f4f6",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      <span style={{
        fontSize: "15px",
        fontWeight: isSelected ? 500 : 400,
        color: isSelected ? "#312e81" : "#1f2937",
      }}>
        {option.text}
      </span>

      <div style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: isSelected ? "2px solid #4338ca" : "2px solid #9ca3af",
        background: isSelected ? "#4338ca" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        {isSelected && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
};
