import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お申し込み完了 — yahong tour",
};

export default function ReservationCompletePage() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "80px 20px 120px",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      {/* チェックアイコン */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "1.5px solid var(--accent-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path
            d="M1.5 8l5.5 5.5L18.5 1.5"
            stroke="var(--accent-primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ラベル */}
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.14em",
          color: "var(--accent-primary)",
          fontFamily: "var(--font-en-body, sans-serif)",
          marginBottom: "16px",
        }}
      >
        THANK YOU
      </p>

      {/* メインメッセージ */}
      <h1
        className="font-jp-title"
        style={{
          fontSize: "clamp(18px, 4vw, 22px)",
          lineHeight: 1.6,
          marginBottom: "24px",
          color: "var(--text-primary)",
        }}
      >
        お申し込み、ありがとうございました。
      </h1>

      {/* 本文 */}
      <p
        className="font-jp-body"
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 2,
          marginBottom: "40px",
        }}
      >
        48時間以内にLINEでご連絡いたします。
        <br />
        万が一お返事がない場合は、メールでお問い合わせください。
        <br />
        <a
          href="mailto:hello@yahongtour.com"
          style={{ color: "var(--accent-primary)", textDecoration: "none" }}
        >
          hello@yahongtour.com
        </a>
      </p>

      {/* ホームに戻るボタン */}
      <Link
        href="/"
        style={{
          display: "inline-block",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--bg-primary)",
          backgroundColor: "var(--accent-primary)",
          padding: "12px 32px",
          borderRadius: "1px",
          textDecoration: "none",
          fontFamily: "var(--font-en-body, sans-serif)",
        }}
      >
        ホームに戻る
      </Link>
    </section>
  );
}
