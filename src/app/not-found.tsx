import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p className="section-label" style={{ marginBottom: "1.5rem" }}>
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-noto-serif-jp), serif",
            fontSize: "22px",
            fontWeight: 400,
            marginBottom: "1.5rem",
            lineHeight: 1.7,
          }}
        >
          ページが見つかりません。
        </h1>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-noto-sans-jp), sans-serif",
            fontSize: "13px",
            fontWeight: 300,
            color: "var(--accent-primary)",
            textDecoration: "none",
          }}
        >
          ← トップに戻る
        </Link>
      </div>
    </main>
  );
}
