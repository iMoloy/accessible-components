import { useState, useRef } from "react";
import type { KeyboardEvent } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  ariaLabel: string;
}

export function Tabs({ items, ariaLabel }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = items.length - 1;
    }

    if (nextIndex !== index) {
      setSelectedIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        style={{ display: "flex", borderBottom: "1px solid #ccc" }}
      >
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tabpanel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                background: isSelected ? "#fff" : "#f0f0f0",
                border: "1px solid #ccc",
                borderBottom: isSelected ? "1px solid #fff" : "1px solid #ccc",
                marginBottom: "-1px",
                outline: "none",
                fontWeight: isSelected ? "bold" : "normal",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <div
            key={item.id}
            id={`tabpanel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            tabIndex={0}
            hidden={!isSelected}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderTop: "none",
            }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
