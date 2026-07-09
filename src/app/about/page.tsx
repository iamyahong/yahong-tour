import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/yahong/SectionLabel";
import { renderLineBreaks } from "@/lib/utils/text";
import { ABOUT, SITE } from "@/lib/constants/content";

export const metadata: Metadata = {
  title: "私について — yahong tour",
  description:
    "日本語を学ぶ韓国人が、なぜ無料でご案内するのか。正直にお話しします。",
  openGraph: {
    title: "私について — yahong tour",
    description: "なぜ無料なのか。三つの正直な理由。",
    locale: "ja_JP",
  },
};

export default function AboutPage() {
  const lineUrl =
    process.env.NEXT_PUBLIC_LINE_FRIEND_URL ??
    `https://line.me/ti/p/~${SITE.lineId}`;

  return (
    <>
      {/* ── 1. ページヘッダー ────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center text-center px-5 pt-14 pb-12 md:pt-20 md:pb-16"
        style={{ maxWidth: "560px", margin: "0 auto" }}
      >
        <SectionLabel style={{ marginBottom: "16px" }}>
          {ABOUT.header.label}
        </SectionLabel>
        <h1
          className="font-jp-title"
          style={{
            fontSize: "clamp(22px, 4vw, 30px)",
            color: "var(--text-primary)",
            lineHeight: 1.65,
            marginBottom: "14px",
          }}
        >
          {renderLineBreaks(ABOUT.header.mainMessage)}
        </h1>
        <p
          className="font-jp-body"
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
            lineHeight: 1.8,
          }}
        >
          {ABOUT.header.subMessage}
        </p>
      </section>

      {/* ── 2. プロフィールセクション ────────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 pb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* 左: プロフィール写真 */}
          <div
            className="flex-shrink-0 self-start"
            style={{
              width: "200px",
              height: "240px",
              minWidth: "200px",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ABOUT.profile.photoUrl}
              alt={ABOUT.profile.photoAlt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              loading="lazy"
            />
          </div>

          {/* 右: テキスト */}
          <div className="flex flex-col gap-4 flex-1">
            {/* 名前・ロケーション */}
            <div className="flex flex-col gap-1">
              <p
                className="font-jp-title"
                style={{
                  fontSize: "22px",
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                }}
              >
                {ABOUT.profile.name}
              </p>
              <p
                className="font-en-body"
                style={{
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.18em",
                }}
              >
                {ABOUT.profile.location}
              </p>
            </div>

            {/* 구분선 */}
            <div
              style={{
                height: "0.5px",
                backgroundColor: "var(--border-subtle)",
              }}
            />

            {/* 자기소개 */}
            <p
              className="font-jp-body"
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 2,
              }}
            >
              {ABOUT.profile.bio}
            </p>

            {/* Instagram 링크 */}
            <a
              href={ABOUT.profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-en-label"
              style={{
                fontSize: "10px",
                color: "var(--accent-primary)",
                textDecoration: "none",
                letterSpacing: "0.3em",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {ABOUT.profile.instagramLabel}
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. 無料の三つの理由 ─────────────────────────────────────────── */}
      <section
        className="py-14 md:py-20"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-[760px] mx-auto px-5">
          <SectionLabel style={{ marginBottom: "10px" }}>
            {ABOUT.reasons.label}
          </SectionLabel>
          <h2
            className="font-jp-title"
            style={{
              fontSize: "clamp(20px, 3.5vw, 26px)",
              color: "var(--text-primary)",
              lineHeight: 1.5,
              marginBottom: "40px",
            }}
          >
            {ABOUT.reasons.title}
          </h2>

          {/* 理由 3つ */}
          <div className="flex flex-col gap-0">
            {ABOUT.reasons.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-5 md:gap-8 py-8"
                style={{
                  borderTop:
                    i === 0
                      ? "0.5px solid var(--border-medium)"
                      : "0.5px solid var(--border-subtle)",
                  borderBottom:
                    i === ABOUT.reasons.items.length - 1
                      ? "0.5px solid var(--border-medium)"
                      : "none",
                }}
              >
                {/* 大きな番号 */}
                <div
                  className="font-en-label flex-shrink-0"
                  style={{
                    fontSize: "28px",
                    color: "var(--accent-primary)",
                    lineHeight: 1,
                    letterSpacing: "0.1em",
                    minWidth: "52px",
                    paddingTop: "2px",
                  }}
                >
                  {item.number}
                </div>

                {/* テキスト */}
                <div className="flex flex-col gap-3 flex-1">
                  <p
                    className="font-jp-title"
                    style={{
                      fontSize: "15px",
                      color: "var(--text-primary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-jp-body"
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      lineHeight: 2,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 実費精算 案内ボックス */}
          <div
            className="mt-8"
            style={{
              borderLeft: "3px solid var(--accent-primary)",
              paddingLeft: "16px",
              paddingTop: "6px",
              paddingBottom: "6px",
            }}
          >
            <p
              className="font-jp-body"
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
              }}
            >
              {ABOUT.reasons.note}
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. 一緒に過ごす時間 ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-5">
        <div
          className="mx-auto flex flex-col items-center"
          style={{ maxWidth: "560px" }}
        >
          <SectionLabel style={{ marginBottom: "10px" }}>
            {ABOUT.howWeSpend.label}
          </SectionLabel>
          <h2
            className="font-jp-title text-center"
            style={{
              fontSize: "clamp(18px, 3vw, 22px)",
              color: "var(--text-primary)",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            {ABOUT.howWeSpend.title}
          </h2>

          <div className="flex flex-col gap-5 w-full">
            {ABOUT.howWeSpend.paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-jp-body text-center"
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: 2.1,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Q&A ──────────────────────────────────────────────────────── */}
      <section
        className="py-14 md:py-20"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-[760px] mx-auto px-5">
          <SectionLabel style={{ marginBottom: "10px" }}>
            {ABOUT.qa.label}
          </SectionLabel>
          <h2
            className="font-jp-title"
            style={{
              fontSize: "clamp(18px, 3vw, 22px)",
              color: "var(--text-primary)",
              lineHeight: 1.5,
              marginBottom: "36px",
            }}
          >
            {ABOUT.qa.title}
          </h2>

          <div className="flex flex-col">
            {ABOUT.qa.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 py-7"
                style={{
                  borderTop: "0.5px solid var(--border-subtle)",
                  borderBottom:
                    i === ABOUT.qa.items.length - 1
                      ? "0.5px solid var(--border-subtle)"
                      : "none",
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
                  Q. {item.q}
                </p>
                {/* A */}
                <p
                  className="font-jp-body"
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 2,
                    paddingLeft: "16px",
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ページ下部まとめ ──────────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 px-5 flex flex-col items-center text-center"
      >
        <p
          className="font-jp-title"
          style={{
            fontSize: "clamp(18px, 3.5vw, 24px)",
            color: "var(--text-primary)",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}
        >
          {renderLineBreaks(ABOUT.closing.message)}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* LINE ボタン (secondary, 새 탭) */}
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              fontSize: "13px",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-noto-sans-jp), sans-serif",
              fontWeight: 300,
              border: "0.5px solid var(--text-primary)",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              cursor: "pointer",
              lineHeight: 1.4,
            }}
          >
            {ABOUT.closing.ctaLine}
          </a>

          {/* 体験を見る ボタン (primary) */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              fontSize: "13px",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-noto-sans-jp), sans-serif",
              fontWeight: 300,
              backgroundColor: "var(--accent-primary)",
              color: "#FFFFFF",
              textDecoration: "none",
              whiteSpace: "nowrap",
              lineHeight: 1.4,
            }}
          >
            {ABOUT.closing.ctaModules}
          </Link>
        </div>
      </section>
    </>
  );
}
