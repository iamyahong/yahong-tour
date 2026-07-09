import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { renderLineBreaks } from "@/lib/utils/text";
import { SITE } from "@/lib/constants/content";
import SectionLabel from "@/components/yahong/SectionLabel";
import Tag from "@/components/yahong/Tag";
import type { FlowStep, GoodToKnowItem, SubImage } from "@/lib/types/database";

// ── Static maps ──────────────────────────────────────────────────────────────
const IMAGE_CAPTIONS: Record<string, string> = {
  M04: "韓服を着て歩く北村の路地",
  M06: "広蔵市場の屋台",
  M10: "漢江の夕暮れ",
};

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: rawData } = await supabase
    .from("modules")
    .select("title, subtitle, hero_image_url")
    .eq("id", id)
    .eq("is_published", true)
    .single();
  const data = rawData as { title: string; subtitle: string | null; hero_image_url: string } | null;

  if (!data) return { title: "Not Found — yahong tour" };

  const title = data.title.replace(/\n/g, "");
  return {
    title: `${title} — yahong tour`,
    description: data.subtitle ?? `yahong tourの体験プラン: ${title}`,
    openGraph: {
      title: `${title} — yahong tour`,
      images: [{ url: data.hero_image_url, width: 1200, height: 630 }],
      locale: "ja_JP",
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: rawModule, error } = await supabase
    .from("modules")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();
  const module = rawModule as import("@/lib/types/database").Module | null;

  if (!module || error) notFound();

  const lineUrl =
    process.env.NEXT_PUBLIC_LINE_FRIEND_URL ??
    `https://line.me/ti/p/~${SITE.lineId}`;
  const reservationUrl = `/reservation?module=${module.id}`;
  const imageCaption = IMAGE_CAPTIONS[module.id] ?? module.title.replace(/\n/g, "");
  const subImages = (module.sub_images ?? []) as SubImage[];
  const flow = module.flow as FlowStep[];
  const goodToKnow = module.good_to_know as GoodToKnowItem[];

  return (
    <>
      {/* ── 2. 상단 메타 ─────────────────────────────────────────────────── */}
      <section
        className="max-w-[760px] mx-auto px-5 pt-10 pb-6 md:pt-14 md:pb-8"
      >
        {/* 백 링크 */}
        <Link
          href="/"
          className="font-en-body"
          style={{
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "20px",
          }}
        >
          ← 体験 一覧へ
        </Link>

        {/* 태그 그룹 */}
        <div className="flex flex-wrap gap-2 mt-5 mb-5">
          <Tag active>{module.category}</Tag>
          {(module.tags ?? []).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* 메인 제목 */}
        <h1
          className="font-jp-title"
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            lineHeight: 1.55,
            color: "var(--text-primary)",
            marginBottom: "10px",
          }}
        >
          {renderLineBreaks(module.title)}
        </h1>

        {/* 부제목 */}
        {module.subtitle && (
          <p
            className="font-jp-body"
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginTop: "6px",
            }}
          >
            {renderLineBreaks(module.subtitle)}
          </p>
        )}
      </section>

      {/* ── 3. 이미지 영역 ─────────────────────────────────────────────── */}
      <section className="max-w-[960px] mx-auto px-5 pb-8">
        {/* 메인 사진 */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(200px, 35vw, 340px)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={module.hero_image_url}
            alt={imageCaption}
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
          {/* 우하단 캡션 */}
          <span
            className="absolute bottom-3 right-4 font-en-body"
            style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              color: "rgba(250,247,242,0.65)",
            }}
          >
            [ {imageCaption} ]
          </span>
        </div>

        {/* 보조 사진 3장 */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[0, 1, 2].map((i) => {
            const subImage = subImages[i];
            if (subImage?.url) {
              return (
                <div key={i} className="flex flex-col gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={subImage.url}
                    alt={subImage.caption}
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ height: "120px", display: "block" }}
                  />
                  <p
                    className="font-jp-body text-center"
                    style={{ fontSize: "10px", color: "var(--text-muted)", lineHeight: 1.5 }}
                  >
                    {subImage.caption}
                  </p>
                </div>
              );
            }
            return (
              <div key={i} className="flex flex-col gap-1">
                <div
                  className="w-full flex items-center justify-center"
                  style={{
                    height: "120px",
                    backgroundColor: "var(--bg-secondary)",
                  }}
                >
                  <span
                    className="font-en-body text-center px-2"
                    style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em" }}
                  >
                    Photo {i + 1}
                  </span>
                </div>
                <p
                  className="font-jp-body text-center"
                  style={{ fontSize: "10px", color: "var(--text-muted)", lineHeight: 1.5 }}
                >
                  &nbsp;
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. 메타 정보 박스 ──────────────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 pb-10">
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderLeft: "4px solid var(--text-primary)",
            padding: "20px 24px",
            gap: "0",
          }}
        >
          {[
            {
              label: "DURATION",
              value: module.duration,
              note: module.duration_label ?? "",
            },
            {
              label: "COST",
              value: module.cost,
              note: module.cost_label ?? "",
            },
            {
              label: "PACE",
              value: module.pace ?? "—",
              note: module.pace_label ?? "",
            },
            {
              label: "SUITABLE",
              value: module.suitable ?? "全年齢",
              note: module.suitable_label ?? "",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col"
              style={{
                padding: "12px 16px",
                borderLeft:
                  i > 0 ? "0.5px solid var(--border-subtle)" : "none",
              }}
            >
              <span
                className="font-en-label"
                style={{
                  fontSize: "8px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.25em",
                  marginBottom: "6px",
                }}
              >
                {item.label}
              </span>
              <span
                className="font-jp-body"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                  marginBottom: "4px",
                }}
              >
                {item.value}
              </span>
              {item.note && (
                <span
                  className="font-jp-body"
                  style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. FLOW OF THE DAY ─────────────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 pb-14">
        <SectionLabel style={{ marginBottom: "8px" }}>
          Flow of the Day
        </SectionLabel>
        <h2
          className="font-jp-title"
          style={{
            fontSize: "20px",
            color: "var(--text-primary)",
            marginBottom: "28px",
          }}
        >
          一日の流れ
        </h2>

        <div>
          {flow.map((step, i) => (
            <div key={i}>
              <div className="flex gap-5 py-5">
                {/* 좌측: 시간 */}
                <div
                  className="font-en-body flex-shrink-0"
                  style={{
                    width: "52px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--accent-primary)",
                    paddingTop: "2px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {step.time}
                </div>
                {/* 우측: 제목 + 설명 */}
                <div className="flex flex-col gap-1 flex-1">
                  <p
                    className="font-jp-body"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="font-jp-body"
                    style={{
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.9,
                    }}
                  >
                    {renderLineBreaks(step.description)}
                  </p>
                </div>
              </div>
              {/* 0.5px 구분선 */}
              {i < flow.length - 1 && (
                <div
                  style={{
                    height: "0.5px",
                    backgroundColor: "var(--border-subtle)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. MY FAVORITE PART ────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--bg-accent)" }}
        className="py-12"
      >
        <div
          className="max-w-[760px] mx-auto px-5"
        >
          <div
            style={{
              borderLeft: "3px solid var(--accent-primary)",
              paddingLeft: "20px",
            }}
          >
            <SectionLabel style={{ marginBottom: "10px" }}>
              My Favorite Part
            </SectionLabel>
            <h2
              className="font-jp-title"
              style={{
                fontSize: "15px",
                color: "var(--text-primary)",
                lineHeight: 1.7,
                marginBottom: "16px",
              }}
            >
              "私の好きなポイント"
            </h2>
            <p
              className="font-jp-body"
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 2.2,
                whiteSpace: "pre-line",
              }}
            >
              {renderLineBreaks(module.favorite_point)}
            </p>
            <p
              className="font-en-body"
              style={{
                fontSize: "12px",
                color: "var(--accent-primary)",
                marginTop: "20px",
                letterSpacing: "0.08em",
              }}
            >
              — yahong
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. GOOD TO KNOW ────────────────────────────────────────────── */}
      <section className="max-w-[760px] mx-auto px-5 py-14">
        <SectionLabel style={{ marginBottom: "8px" }}>
          Good to Know
        </SectionLabel>
        <h2
          className="font-jp-title"
          style={{
            fontSize: "20px",
            color: "var(--text-primary)",
            marginBottom: "28px",
          }}
        >
          参加される前に
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {goodToKnow.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-2"
              style={{
                padding: "20px 0",
                borderTop: "0.5px solid var(--border-subtle)",
                paddingRight: i % 2 === 0 ? "32px" : "0",
                paddingLeft: i % 2 === 1 ? "32px" : "0",
              }}
            >
              <p
                className="font-jp-body"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1.6,
                }}
              >
                {item.title}
              </p>
              <p
                className="font-jp-body"
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.9,
                }}
              >
                {renderLineBreaks(item.body)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. 하단 CTA 밴드 ───────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--bg-secondary)" }}
        className="py-8"
      >
        <div
          className="max-w-[760px] mx-auto px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        >
          {/* 좌측 텍스트 */}
          <div className="flex flex-col gap-1">
            <p
              className="font-jp-title"
              style={{
                fontSize: "16px",
                color: "var(--text-primary)",
                lineHeight: 1.5,
              }}
            >
              この体験に参加してみませんか？
            </p>
            <p
              className="font-jp-body"
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              まずLINEでお気軽に。日程・人数・ご質問など何でも。
            </p>
          </div>

          {/* 우측 버튼 2개 */}
          <div className="flex gap-3 flex-shrink-0">
            {/* LINE 버튼 (secondary, 새 탭) */}
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "11px 20px",
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
              LINEで相談
            </a>

            {/* 예약 버튼 (primary) */}
            <Link
              href={reservationUrl}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "11px 20px",
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
              予約フォームへ →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
