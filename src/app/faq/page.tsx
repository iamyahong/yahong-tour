import type { Metadata } from "next";
import SectionLabel from "@/components/yahong/SectionLabel";
import { FAQ } from "@/lib/constants/content";

export const metadata: Metadata = {
  title: "よくあるご質問 — yahong tour",
  description:
    "予約・費用・当日のこと・その他、よくいただくご質問にお答えします。",
  openGraph: {
    title: "よくあるご質問 — yahong tour",
    locale: "ja_JP",
  },
};

export default function FaqPage() {
  return (
    <>
      {/* ── ページヘッダー ─────────────────────────────────────────────── */}
      <section className="flex flex-col items-center text-center px-5 pt-14 pb-12 md:pt-20 md:pb-16">
        <SectionLabel style={{ marginBottom: "14px" }}>
          {FAQ.header.label}
        </SectionLabel>
        <h1
          className="font-jp-title"
          style={{
            fontSize: "clamp(22px, 4vw, 28px)",
            color: "var(--text-primary)",
            lineHeight: 1.5,
          }}
        >
          {FAQ.header.title}
        </h1>
      </section>

      {/* ── カテゴリ別 Q&A ─────────────────────────────────────────────── */}
      <div className="max-w-[760px] mx-auto px-5 pb-20 flex flex-col gap-16">
        {FAQ.categories.map((cat) => (
          <section key={cat.id}>
            {/* カテゴリ見出し */}
            <div
              className="flex items-center gap-4 mb-8"
              style={{ borderBottom: "0.5px solid var(--border-medium)", paddingBottom: "12px" }}
            >
              <h2
                className="font-jp-body"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  letterSpacing: "0.06em",
                }}
              >
                {cat.title}
              </h2>
            </div>

            {/* Q&A リスト */}
            <div className="flex flex-col">
              {cat.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 py-7"
                  style={{
                    borderBottom: "0.5px solid var(--border-subtle)",
                  }}
                >
                  {/* Q */}
                  <p
                    className="font-jp-body"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      lineHeight: 1.7,
                    }}
                  >
                    Q.&ensp;{item.q}
                  </p>
                  {/* A */}
                  <p
                    className="font-jp-body"
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      lineHeight: 2,
                      paddingLeft: "20px",
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
