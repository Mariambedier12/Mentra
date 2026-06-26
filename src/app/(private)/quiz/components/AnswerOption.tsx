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
        borderRadius: "30px",
        border: isSelected ? "2px solid #091A58" : "1px solid #e5e7eb",
        background: isSelected ? "#DDE1FF" : "#f3f4f6",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      <span style={{
        fontSize: "15px",
        fontWeight: isSelected ? 500 : 400,
        color: isSelected ? "#091A58" : "#000000",
      }}>
        {option.text}
      </span>

      <div style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: isSelected ? "2px solid #091A58" : "2px solid #afaf9c",
        background: isSelected ? "#091A58" : "white",
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
