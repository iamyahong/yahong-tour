export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "0.5px solid var(--border-subtle)",
        padding: "24px 32px",
      }}
    >
      <div
        className="font-en-body"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--text-muted)",
        }}
      >
        <span>YAHONG TOUR · SEOUL 2026</span>
        <span>@uniyahong · LINE: yahong76</span>
      </div>
    </footer>
  );
}
