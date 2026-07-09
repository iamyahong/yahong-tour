import SectionLabel from "@/components/yahong/SectionLabel";
import Button from "@/components/yahong/Button";
import Tag from "@/components/yahong/Tag";

const COLORS = [
  { name: "--bg-primary", value: "#FAF7F2", label: "bg-primary · メイン背景" },
  { name: "--bg-secondary", value: "#F2ECE1", label: "bg-secondary · セクション背景" },
  { name: "--bg-accent", value: "#FAF2E8", label: "bg-accent · 引用ボックス" },
  { name: "--text-primary", value: "#1F1D1A", label: "text-primary · 本文" },
  { name: "--text-secondary", value: "#5A5149", label: "text-secondary · サブ本文" },
  { name: "--text-muted", value: "#8A7F72", label: "text-muted · キャプション" },
  { name: "--accent-primary", value: "#9C4A3B", label: "accent-primary · 丹青ブリック" },
  { name: "--accent-secondary", value: "#7A8F7F", label: "accent-secondary · 青磁グリーン" },
];

const BORDERS = [
  { name: "--border-subtle", value: "rgba(31,29,26,0.08)", label: "border-subtle · 薄い区切り線" },
  { name: "--border-medium", value: "rgba(31,29,26,0.15)", label: "border-medium · 通常区切り線" },
  { name: "--border-strong", value: "rgba(31,29,26,0.25)", label: "border-strong · 強い区切り線" },
];

const TYPE_SCALE = [
  { label: "ヒーロー メインコピー", size: "34px / mobile 26px", weight: "400", font: "Noto Serif JP", sample: "ゆっくりと、韓国の日常を歩く一日。" },
  { label: "ページ H1", size: "30–32px / mobile 24px", weight: "400", font: "Noto Serif JP", sample: "私について" },
  { label: "セクション H2", size: "20–22px / mobile 18px", weight: "400", font: "Noto Serif JP", sample: "今月のおすすめ" },
  { label: "カード タイトル", size: "16–17px", weight: "500", font: "Noto Sans JP", sample: "広蔵市場、ひとりでは入れない店へ。" },
  { label: "本文 large", size: "13–14px", weight: "300", font: "Noto Sans JP", sample: "観光案内というより、ソウルに住む友達と一日過ごす感覚です。" },
  { label: "本文 normal", size: "12–13px", weight: "300", font: "Noto Sans JP", sample: "日本語の間違いは、遠慮なく直してください。" },
  { label: "キャプション", size: "10–11px", weight: "300", font: "Noto Sans JP", sample: "実費のみ · 当日現金" },
  { label: "英文ラベル", size: "10–11px", weight: "400", font: "Cormorant Garamond", sample: "FEATURED · SEOUL 2026" },
];

export default function DesignTestPage() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        padding: "48px 32px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "8px" }}>
        <SectionLabel>Design System · yahong tour</SectionLabel>
      </div>
      <h1
        className="font-jp-title"
        style={{ fontSize: "24px", marginBottom: "48px", color: "var(--text-primary)" }}
      >
        デザインシステム確認ページ
      </h1>

      {/* ── 1. Color Palette ── */}
      <Section title="1. カラーパレット">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginBottom: "24px" }}>
          {COLORS.map((c) => (
            <ColorSwatch key={c.name} {...c} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {BORDERS.map((b) => (
            <div key={b.name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: `2px solid ${b.value}`,
                  backgroundColor: "transparent",
                  flexShrink: 0,
                }}
              />
              <div>
                <div className="font-en-body" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>{b.name}</div>
                <div className="font-jp-body" style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px" }}>{b.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── 2. Fonts ── */}
      <Section title="2. フォント 4種">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <FontCard
            name="Noto Sans JP (300)"
            cssClass="font-jp-body"
            sample="ゆっくりと、韓国の日常を歩く一日。"
            sample2="The quick brown fox jumps over the lazy dog."
            weight="300"
          />
          <FontCard
            name="Noto Serif JP (400)"
            cssClass="font-jp-title"
            sample="韓服で歩く、景福宮と北村の午後。"
            sample2="漢江の夕暮れ、自転車とコンビニラーメン。"
            weight="400"
          />
          <FontCard
            name="Cormorant Garamond (400)"
            cssClass="font-en-label"
            sample="SEOUL · GYEONGGI · INCHEON"
            sample2="FEATURED · ABOUT · RESERVATION"
            weight="400"
          />
          <FontCard
            name="Inter (400)"
            cssClass="font-en-body"
            sample="yahong tour · Seoul 2026"
            sample2="13:00 〜 18:00 · 約3〜4万ウォン"
            weight="400"
          />
        </div>
      </Section>

      <Divider />

      {/* ── 3. Type Scale ── */}
      <Section title="3. タイポグラフィ スケール">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {TYPE_SCALE.map((t) => (
            <div key={t.label} style={{ display: "flex", alignItems: "baseline", gap: "20px", borderBottom: "0.5px solid var(--border-subtle)", paddingBottom: "16px" }}>
              <div style={{ minWidth: "180px", flexShrink: 0 }}>
                <div className="font-en-body" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: "2px" }}>{t.label}</div>
                <div className="font-en-body" style={{ fontSize: "9px", color: "var(--border-strong)", letterSpacing: "0.05em" }}>{t.size} · wt{t.weight}</div>
              </div>
              <span
                className={t.font.includes("Serif") ? "font-jp-title" : t.font.includes("Cormorant") ? "font-en-label" : "font-jp-body"}
                style={{
                  fontSize: parseInt(t.size),
                  fontWeight: parseInt(t.weight),
                  color: "var(--text-primary)",
                  lineHeight: 1.5,
                }}
              >
                {t.sample}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── 4. Components ── */}
      <Section title="4. 共通コンポーネント">

        {/* Button */}
        <SubSection label="Button">
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="primary">予約する →</Button>
            <Button variant="primary">まずLINEで話す</Button>
            <Button variant="secondary">もっと読む →</Button>
            <Button variant="secondary">VIEW ALL 10 →</Button>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", marginTop: "12px" }}>
            <div style={{ backgroundColor: "var(--bg-secondary)", padding: "16px 20px", display: "flex", gap: "12px" }}>
              <Button variant="primary">bg-secondary 上</Button>
              <Button variant="secondary">bg-secondary 上</Button>
            </div>
          </div>
        </SubSection>

        {/* SectionLabel */}
        <SubSection label="SectionLabel">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <SectionLabel>FEATURED</SectionLabel>
            <SectionLabel>ABOUT YAHONG TOUR</SectionLabel>
            <SectionLabel>RESERVATION</SectionLabel>
            <SectionLabel>THREE HONEST REASONS</SectionLabel>
          </div>
        </SubSection>

        {/* Tag */}
        <SubSection label="Tag / Pill">
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Tag active>#韓服</Tag>
            <Tag active>#景福宮</Tag>
            <Tag active>#北村</Tag>
            <Tag>#広蔵市場</Tag>
            <Tag>#屋台</Tag>
            <Tag>#ローカル</Tag>
            <Tag>#漢江</Tag>
            <Tag active>#夕日</Tag>
          </div>
          <div style={{ marginTop: "8px" }}>
            <div className="font-en-body" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              active (青磁グリーン border) / normal (medium グレー border)
            </div>
          </div>
        </SubSection>

        {/* SectionLabel + Title composition */}
        <SubSection label="SectionLabel + Title 組み合わせ">
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <SectionLabel style={{ marginBottom: "8px" }}>FEATURED</SectionLabel>
              <h2 className="font-jp-title" style={{ fontSize: "20px", color: "var(--text-primary)", margin: 0 }}>今月のおすすめ</h2>
            </div>
            <div>
              <SectionLabel style={{ marginBottom: "8px" }}>THREE HONEST REASONS</SectionLabel>
              <h2 className="font-jp-title" style={{ fontSize: "20px", color: "var(--text-primary)", margin: 0 }}>無料である、三つの理由。</h2>
            </div>
          </div>
        </SubSection>
      </Section>

      <Divider />

      {/* ── 5. Backgrounds ── */}
      <Section title="5. 背景色 確認">
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { bg: "var(--bg-primary)", label: "bg-primary #FAF7F2" },
            { bg: "var(--bg-secondary)", label: "bg-secondary #F2ECE1" },
            { bg: "var(--bg-accent)", label: "bg-accent #FAF2E8" },
          ].map((b) => (
            <div key={b.label} style={{ backgroundColor: b.bg, padding: "20px 24px", border: "0.5px solid var(--border-subtle)" }}>
              <span className="font-en-body" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>{b.label}</span>
              <p className="font-jp-body" style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "6px 0 0" }}>
                観光案内というより、「ソウルに住む友達と一日過ごす」に近いと思います。
              </p>
            </div>
          ))}
        </div>
      </Section>

      <div style={{ marginTop: "64px", paddingTop: "20px", borderTop: "0.5px solid var(--border-subtle)" }}>
        <span className="font-en-body" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.12em" }}>
          YAHONG TOUR · DESIGN SYSTEM · DEV ONLY
        </span>
      </div>
    </div>
  );
}

/* ── Helper components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "48px" }}>
      <h2
        className="font-en-body"
        style={{
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "var(--text-muted)",
          marginBottom: "24px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <div
        className="font-en-body"
        style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.12em", marginBottom: "12px", textTransform: "uppercase" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "0.5px solid var(--border-subtle)", marginBottom: "48px" }} />;
}

function ColorSwatch({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "56px",
          backgroundColor: value,
          border: "0.5px solid var(--border-subtle)",
          marginBottom: "8px",
        }}
      />
      <div className="font-en-body" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.06em" }}>{name}</div>
      <div className="font-en-body" style={{ fontSize: "9px", color: "var(--text-primary)", letterSpacing: "0.04em", marginTop: "2px" }}>{value}</div>
      <div className="font-jp-body" style={{ fontSize: "9px", color: "var(--text-secondary)", marginTop: "2px" }}>{label.split(" · ")[1]}</div>
    </div>
  );
}

function FontCard({ name, cssClass, sample, sample2, weight }: {
  name: string; cssClass: string; sample: string; sample2: string; weight: string;
}) {
  return (
    <div style={{ borderBottom: "0.5px solid var(--border-subtle)", paddingBottom: "20px" }}>
      <div className="font-en-body" style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
        {name}
      </div>
      <p className={cssClass} style={{ fontSize: "18px", fontWeight: parseInt(weight), color: "var(--text-primary)", margin: "0 0 6px" }}>
        {sample}
      </p>
      <p className={cssClass} style={{ fontSize: "13px", fontWeight: parseInt(weight), color: "var(--text-secondary)", margin: 0 }}>
        {sample2}
      </p>
    </div>
  );
}
