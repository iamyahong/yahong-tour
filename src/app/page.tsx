import Link from "next/link";
import SectionLabel from "@/components/yahong/SectionLabel";
import { createClient } from "@/lib/supabase/server";
import { renderLineBreaks } from "@/lib/utils/text";
import { HOME } from "@/lib/constants/content";
import type { Module, Review } from "@/lib/types/database";
import ModuleImage from "@/components/home/ModuleImage";

// ── Static maps ─────────────────────────────────────────────────────────────
const IMAGE_CAPTIONS: Record<string, string> = {
  M04: "韓服を着て歩く北村の路地",
  M06: "広蔵市場の屋台",
  M10: "漢江の夕暮れ",
};

const MODULE_SHORT_TITLES: Record<string, string> = {
  M04: "韓服 · 景福宮 · 北村",
  M06: "広蔵市場",
  M10: "漢江サイクリング",
};

// ── Data fetching ────────────────────────────────────────────────────────────
async function getHomeData(): Promise<{
  modules: Pick<Module, "id" | "category" | "title" | "subtitle" | "duration" | "tags" | "hero_image_url">[];
  reviews: Pick<Review, "id" | "nickname" | "visit_date" | "module_id" | "rating" | "content">[];
}> {
  try {
    const supabase = await createClient();
    const [modulesRes, reviewsRes] = await Promise.all([
      supabase
        .from("modules")
        .select("id, category, title, subtitle, duration, tags, hero_image_url")
        .eq("is_published", true)
        .order("display_order")
        .limit(3),
      supabase
        .from("reviews")
        .select("id, nickname, visit_date, module_id, rating, content")
        .eq("is_visible", true)
        .limit(2),
    ]);
    return {
      modules: modulesRes.data ?? [],
      reviews: reviewsRes.data ?? [],
    };
  } catch {
    return { modules: [], reviews: [] };
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const { modules, reviews } = await getHomeData();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedSection modules={modules} />
      <ReviewsSection reviews={reviews} />
      <CTASection />
    </>
  );
}

// ── 1. Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative flex items-end min-h-[360px] md:min-h-[420px] h-[60vh] overflow-hidden"
      style={{
        backgroundImage: `url(${HOME.hero.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(120,90,70,0.15) 0%, rgba(60,45,35,0.55) 100%)",
        }}
      />

      {/* Top-right caption */}
      <span
        className="absolute top-5 right-5 font-en-body text-[9px] tracking-[0.12em] md:right-8"
        style={{ color: "rgba(250,247,242,0.55)" }}
      >
        [ 北村 · 夕暮れ ]
      </span>

      {/* Content — left-bottom */}
      <div className="relative z-10 w-full px-6 pb-10 md:px-12 md:pb-14">
        <div style={{ maxWidth: "520px" }}>
          <SectionLabel
            style={{ color: "rgba(250,247,242,0.65)", marginBottom: "14px" }}
          >
            SEOUL · GYEONGGI · INCHEON
          </SectionLabel>

          <h1
            className="font-jp-title text-[26px] md:text-[34px] leading-[1.55] font-normal mb-4"
            style={{ color: "#FAF7F2" }}
          >
            ゆっくりと、
            <br />
            韓国の日常を{" "}
            <span
              style={{
                borderBottom: "1px solid rgba(250,247,242,0.6)",
                paddingBottom: "1px",
              }}
            >
              歩く
            </span>
            一日。
          </h1>

          <p
            className="font-jp-body text-[13px] leading-[1.9]"
            style={{ color: "rgba(250,247,242,0.82)", maxWidth: "420px" }}
          >
            日本語を勉強中の韓国人が、観光地ではない「ふつうの韓国」をご一緒します。
            ガイドというより、一緒に歩く友人のような時間を。
          </p>
        </div>
      </div>
    </section>
  );
}

// ── 2. About Snippet ─────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      className="py-14 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-[560px] mx-auto text-center">
        <SectionLabel style={{ textAlign: "center", marginBottom: "14px" }}>
          About yahong tour
        </SectionLabel>

        <h2
          className="font-jp-title text-[19px] leading-[1.75] font-normal mb-5"
          style={{ color: "var(--text-primary)" }}
        >
          「プロのガイドではなく、
          <br />
          日本語を学ぶ同行者」として。
        </h2>

        <p
          className="font-jp-body text-[13px] leading-[2] mb-7"
          style={{ color: "var(--text-secondary)" }}
        >
          2026年11月まで、ご案内は無料です。
          <br />
          入場料やお食事など実費のみ、当日現金でお支払いください。
          <br />
          その理由も、すべて正直にお話しします。
        </p>

        <Link
          href="/about"
          className="font-jp-body text-[12px] tracking-[0.05em] transition-opacity duration-150 hover:opacity-60"
          style={{ color: "var(--text-muted)" }}
        >
          もっと読む →
        </Link>
      </div>
    </section>
  );
}

// ── 3. Featured Modules ───────────────────────────────────────────────────────
type FeaturedModule = Pick<
  Module,
  "id" | "category" | "title" | "subtitle" | "duration" | "tags" | "hero_image_url"
>;

function FeaturedSection({ modules }: { modules: FeaturedModule[] }) {
  return (
    <section
      className="py-10 px-6 md:px-12"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderTop: "0.5px solid var(--border-subtle)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <SectionLabel style={{ marginBottom: "6px" }}>FEATURED</SectionLabel>
            <h2
              className="font-jp-title text-[20px] font-normal"
              style={{ color: "var(--text-primary)" }}
            >
              今月のおすすめ
            </h2>
          </div>
          <Link
            href="/modules"
            className="font-en-body text-[10px] tracking-[0.12em] pb-1 transition-opacity duration-150 hover:opacity-60"
            style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Divider */}
        <div
          className="mb-8"
          style={{ borderTop: "0.5px solid var(--border-subtle)" }}
        />

        {/* Card grid */}
        {modules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <p
            className="text-center py-12 font-jp-body text-[13px]"
            style={{ color: "var(--text-muted)" }}
          >
            データを読み込んでいます...
          </p>
        )}
      </div>
    </section>
  );
}

function ModuleCard({ module }: { module: FeaturedModule }) {
  return (
    <Link
      href={`/modules/${module.id}`}
      className="block group"
      style={{ textDecoration: "none" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
          <ModuleImage
          src={module.hero_image_url}
          alt={IMAGE_CAPTIONS[module.id] ?? module.title}
          moduleId={module.id}
        />
        {/* Module ID badge — top-left */}
        <span
          className="absolute top-3 left-3 font-en-body text-[9px] tracking-[0.1em] px-2 py-[3px]"
          style={{
            backgroundColor: "rgba(31,29,26,0.55)",
            color: "rgba(250,247,242,0.9)",
          }}
        >
          {module.id}
        </span>
        {/* Image caption — bottom-right */}
        {IMAGE_CAPTIONS[module.id] && (
          <span
            className="absolute bottom-2 right-3 font-en-body text-[8px] tracking-[0.05em]"
            style={{ color: "rgba(250,247,242,0.6)" }}
          >
            {IMAGE_CAPTIONS[module.id]}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="pt-4 pb-3">
        {/* Meta */}
        <p
          className="font-jp-body text-[10px] tracking-[0.04em] mb-[10px]"
          style={{ color: "var(--text-muted)" }}
        >
          {module.category}
          <span className="mx-1" style={{ color: "var(--border-strong)" }}>
            ·
          </span>
          {module.duration}
        </p>

        {/* Title */}
        <h3
          className="font-jp-title text-[16px] leading-[1.5] font-normal mb-[10px] transition-opacity duration-150 group-hover:opacity-70"
          style={{ color: "var(--text-primary)" }}
        >
          {renderLineBreaks(module.title)}
        </h3>

        {/* Subtitle */}
        {module.subtitle && (
          <p
            className="font-jp-body text-[12px] leading-[1.65] line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {module.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}

// ── 4. Reviews ────────────────────────────────────────────────────────────────
type ReviewSnippet = Pick<
  Review,
  "id" | "nickname" | "visit_date" | "module_id" | "rating" | "content"
>;

function ReviewsSection({ reviews }: { reviews: ReviewSnippet[] }) {
  if (reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      className="py-14 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-accent)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <SectionLabel style={{ textAlign: "center", marginBottom: "10px" }}>
            REVIEWS FROM JAPAN
          </SectionLabel>
          <h2
            className="font-jp-title text-[20px] font-normal"
            style={{ color: "var(--text-primary)" }}
          >
            実際にご一緒した方々から
          </h2>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: ReviewSnippet }) {
  return (
    <div
      className="pl-5 pt-6 pr-6 pb-5"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderLeft: "3px solid var(--accent-primary)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-[2px] mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span
            key={i}
            className="text-[11px]"
            style={{ color: "var(--accent-primary)" }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Nickname + visit date */}
      <div className="flex items-baseline justify-between mb-3">
        <span
          className="font-jp-body text-[13px]"
          style={{ color: "var(--text-primary)" }}
        >
          {review.nickname}
        </span>
        <span
          className="font-en-body text-[10px] tracking-[0.05em]"
          style={{ color: "var(--text-muted)" }}
        >
          {review.visit_date}
        </span>
      </div>

      {/* Content */}
      <p
        className="font-jp-body text-[12px] leading-[1.95] mb-4 line-clamp-5"
        style={{ color: "var(--text-secondary)" }}
      >
        {review.content}
      </p>

      {/* Module tag */}
      {review.module_id && MODULE_SHORT_TITLES[review.module_id] && (
        <p
          className="font-jp-body text-[10px] tracking-[0.04em]"
          style={{ color: "var(--accent-secondary)" }}
        >
          ▸ {MODULE_SHORT_TITLES[review.module_id]}
        </p>
      )}
    </div>
  );
}

// ── 5. CTA Band ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      className="py-12 px-6 md:px-12"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Text */}
        <div>
          <SectionLabel style={{ marginBottom: "10px" }}>RESERVATION</SectionLabel>
          <h2
            className="font-jp-title text-[18px] font-normal mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            まずはLINEで、気軽にご相談から。
          </h2>
          <p
            className="font-jp-body text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            ご希望の日程やテーマを教えてください。
          </p>
        </div>

        {/* CTA — styled anchor (avoids button-in-anchor) */}
        <Link
          href="/reservation"
          className="inline-flex items-center justify-center font-jp-body text-[13px] tracking-[0.1em] transition-opacity duration-150 hover:opacity-85 self-start md:self-auto flex-shrink-0"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "#FFFFFF",
            padding: "11px 24px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            fontWeight: 300,
            lineHeight: 1.4,
          }}
        >
          予約する →
        </Link>
      </div>
    </section>
  );
}
