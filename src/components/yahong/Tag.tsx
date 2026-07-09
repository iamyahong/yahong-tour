import type { CSSProperties, ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  active?: boolean;
  style?: CSSProperties;
}

export default function Tag({ children, active = false, style }: TagProps) {
  return (
    <span
      className="font-en-body"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        fontSize: "10px",
        letterSpacing: "0.1em",
        border: `0.5px solid ${active ? "var(--accent-secondary)" : "var(--border-medium)"}`,
        color: active ? "var(--accent-secondary)" : "var(--text-muted)",
        borderRadius: "1px",
        whiteSpace: "nowrap",
        lineHeight: 1.6,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
