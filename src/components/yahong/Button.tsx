"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  style,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "11px 24px",
    fontSize: "13px",
    letterSpacing: "0.1em",
    fontFamily: "var(--font-noto-sans-jp), sans-serif",
    fontWeight: 300,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.15s ease, color 0.15s ease",
    whiteSpace: "nowrap",
    lineHeight: 1.4,
  };

  const primary: React.CSSProperties = {
    ...base,
    backgroundColor: "var(--accent-primary)",
    color: "#FFFFFF",
    border: "none",
  };

  const secondary: React.CSSProperties = {
    ...base,
    backgroundColor: "transparent",
    color: "var(--text-primary)",
    border: "0.5px solid var(--text-primary)",
  };

  const computedStyle = variant === "primary" ? primary : secondary;

  return (
    <button
      {...props}
      style={{ ...computedStyle, ...style }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (variant === "primary") {
          el.style.backgroundColor = "#7D3A2E";
        } else {
          el.style.backgroundColor = "rgba(31, 29, 26, 0.04)";
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        if (variant === "primary") {
          el.style.backgroundColor = "var(--accent-primary)";
        } else {
          el.style.backgroundColor = "transparent";
        }
        props.onMouseLeave?.(e);
      }}
    >
      {children}
    </button>
  );
}
