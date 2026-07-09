import type { CSSProperties, ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function SectionLabel({ children, style }: SectionLabelProps) {
  return (
    <span
      className="font-en-label"
      style={{
        display: "block",
        fontSize: "10px",
        color: "var(--accent-primary)",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        lineHeight: 1.4,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
