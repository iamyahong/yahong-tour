"use client";

import Link from "next/link";
import { useState } from "react";
import BrandMark from "@/components/BrandMark";

const NAV_ITEMS = [
  { label: "体験", href: "/modules" },
  { label: "レビュー", href: "/#reviews" },
  { label: "私について", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(250, 247, 242, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "0.5px solid var(--border-subtle)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
          aria-label="yahong tour トップへ"
        >
          <BrandMark size={40} />
          <span>
            <span
              className="font-jp-body"
              style={{ fontSize: "14px", color: "var(--text-primary)", letterSpacing: "0.05em" }}
            >
              yahong
            </span>
            <span
              className="font-en-body"
              style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.15em", marginLeft: "4px" }}
            >
              [tour · seoul]
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav
          className="font-jp-body desktop-nav"
          style={{ display: "flex", gap: "28px", alignItems: "center" }}
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="desktop-nav-link"
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Hamburger (mobile only) ── */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "block", width: "20px", height: "1px",
              backgroundColor: "var(--text-primary)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block", width: "20px", height: "1px",
              backgroundColor: "var(--text-primary)",
              transition: "opacity 0.2s ease",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block", width: "20px", height: "1px",
              backgroundColor: "var(--text-primary)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "320px" : "0",
          transition: "max-height 0.3s ease",
          borderTop: menuOpen ? "0.5px solid var(--border-subtle)" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <nav className="font-jp-body" style={{ display: "flex", flexDirection: "column", padding: "8px 0 16px" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "12px 24px",
                letterSpacing: "0.05em",
                borderBottom: "0.5px solid var(--border-subtle)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
