import { useState } from "react";

interface DisclosureProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Disclosure({ id, title, children }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `disclosure-content-${id}`;
  const headerId = `disclosure-header-${id}`;

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "4px", margin: "10px 0" }}>
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: "100%",
            textAlign: "left",
            background: "#f9f9f9",
            border: "none",
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{title}</span>
          <span>{isExpanded ? "−" : "+"}</span>
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isExpanded}
        style={{
          padding: "15px",
          borderTop: "1px solid #ccc",
          display: isExpanded ? "block" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
