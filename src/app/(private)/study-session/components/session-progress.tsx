interface Props {
  progress: number;
}

export default function SessionProgress({ progress }: Props) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
        <span style={{ fontWeight: 600, color: "#1f2937" }}>Session Progress</span>
        <span style={{ color: "#091A58", fontWeight: 600 }}>{progress}%</span>
      </div>
      <div style={{ height: "6px", background: "#E1E2EC", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#091A58", borderRadius: "99px", transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}