"use client";

import { useRouter, usePathname } from "next/navigation";

const CATEGORIES = [
  { label: "すべて", value: "" },
  { label: "伝統と歴史", value: "伝統と歴史" },
  { label: "自然・風景", value: "自然・風景" },
  { label: "市場・食", value: "市場・食" },
  { label: "現代カルチャー", value: "現代カルチャー" },
];

interface CategoryFilterProps {
  activeCategory: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/modules";

  function handleSelect(value: string) {
    if (value === "") {
      router.push(pathname);
    } else {
      router.push(`${pathname}?category=${encodeURIComponent(value)}`);
    }
  }

  return (
    <div
      style={{
        borderBottom: "0.5px solid var(--border-subtle)",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}
    >
      <style>{`
        .category-filter-bar::-webkit-scrollbar { display: none; }
      `}</style>
      <nav
        className="category-filter-bar font-jp-body"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: "clamp(20px, 3vw, 32px)",
          whiteSpace: "nowrap",
        }}
        aria-label="カテゴリーフィルター"
      >
        {CATEGORIES.map(({ label, value }) => {
          const isActive = activeCategory === value;
          return (
            <button
              key={value}
              onClick={() => handleSelect(value)}
              aria-current={isActive ? "page" : undefined}
              className="font-jp-body"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "16px 0",
                fontSize: "13px",
                letterSpacing: "0.04em",
                lineHeight: 1,
                color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                borderBottom: isActive
                  ? "2px solid var(--accent-primary)"
                  : "2px solid transparent",
                transition: "color 0.15s ease, border-color 0.15s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
