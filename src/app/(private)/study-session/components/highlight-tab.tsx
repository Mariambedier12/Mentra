import { SessionData } from "../types/session";

interface Props {
  data: SessionData;
}

export default function HighlightTab({ data }: Props) {
  // Extract all highlights from all chunks dynamically, or fallback to summary points
  const highlights = data.chunks && data.chunks.length > 0
    ? data.chunks.flatMap((chunk, idx) => 
        (chunk.highlights || []).map((text) => ({
          heading: `Section ${idx + 1}`,
          text,
        }))
      )
    : data.summary.points.map((point) => ({
        heading: point.heading || "Key Concept",
        text: point.text,
      }));

  return (
    <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "2rem", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1f2937", marginBottom: "0.25rem" }}>
        Key Highlights
      </h2>
      <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "1.5rem" }}>
        Crucial takeaways compiled from your study material
      </p>

      {highlights.length === 0 ? (
        <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center", padding: "2rem" }}>
          No highlights generated yet. Start reading the summary to gather key insights!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {highlights.map((point, i) => (
            <div 
              key={i} 
              style={{ 
                background: "rgba(140, 140, 140, 0.14)", 
                borderRadius: "6px", 
                padding: "1.25rem", 
                borderLeft: "4.5px solid #091A58",
                boxShadow: "0 1px 2px rgba(0,0,0,0.01)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "white", background: "#091A58", padding: "2px 8px", borderRadius: "99px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {point.heading}
                </span>
              </div>
              <p style={{ fontSize: "14.5px", color: "#091A58", lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
                {point.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}