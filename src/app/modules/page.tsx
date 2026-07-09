import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { renderLineBreaks } from "@/lib/utils/text";
import { SITE } from "@/lib/constants/content";
import SectionLabel from "@/components/yahong/SectionLabel";
import ModuleImage from "@/components/home/ModuleImage";
import CategoryFilter from "@/components/modules/CategoryFilter";
import type { Module } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "体験を選ぶ | yahong tour",
  description:
    "yahong tour で体験できる、ソウルの過ごし方一覧。お一人様もご家族も、お気軽にご相談ください。",
};

const IMAGE_CAPTIONS: Record<string, string> = {
  M04: "韓服を着て歩く北村の路地",
  M06: "広蔵市場の屋台",
  M10: "漢江の夕暮れ",
};

type ModuleCard = Pick<
  Module,
  "id" | "category" | "title" | "subtitle" | "duration" | "tags" | "hero_image_url"
>;

async function getAllModules(): Promise<ModuleCard[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("modules")
      .select("id, category, title, subtitle, duration, tags, hero_image_url")
      .eq("is_published", true)
      .order("display_order");
    return (data ?? []) as ModuleCard[];
  } catch {
    return [];
  }
}

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ModulesPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const activeCategory = category ?? "";

  const allModules = await getAllModules();
  const modules = activeCategory
    ? allModules.filter((m) => m.category === activeCategory)
    : allModules;

  const lineUrl =
    process.env.NEXT_PUBLIC_LINE_FRIEND_URL ??
    `https://line.me/ti/p/~${SITE.lineId}`;

  return (
    <>
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 md:px-12">
        <div className="max-w-[760px] mx-auto text-center">
          <SectionLabel style={{ textAlign: "center", marginBottom: "12px" }}>
            EXPERIENCES
          </SectionLabel>
          <h1
            className="font-jp-title font-normal"
            style={{
              fontSize: "clamp(22px, 4vw, 30px)",
              lineHeight: 1.55,
              color: "var(--text-primary)",
              marginBottom: "14px",
            }}
          >
            体験を選ぶ
          </h1>
          <p
            className="font-jp-body"
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: 1.9,
            }}
          >
            ご希望の体験を選んでください。組み合わせも可能です。
          </p>
        </div>
      </section>

      {/* ── Category Filter ──────────────────────────────────────────────────── */}
      <CategoryFilter activeCategory={activeCategory} />

      {/* ── Module Grid ─────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          {modules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {modules.map((module) => (
                <ModuleListCard key={module.id} module={module} />
              ))}
            </div>
          ) : (
            <p
              className="text-center py-16 font-jp-body text-[13px]"
              style={{ color: "var(--text-muted)" }}
            >
              該当する体験が見つかりませんでした。
            </p>
          )}
        </div>
      </section>

      {/* ── Bottom CTA Band ─────────────────────────────────────────────────── */}
      <section
        className="py-12 px-6 md:px-12"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div>
            <SectionLabel style={{ marginBottom: "10px" }}>RESERVATION</SectionLabel>
            <p
              className="font-jp-title font-normal"
              style={{
                fontSize: "18px",
                color: "var(--text-primary)",
                lineHeight: 1.6,
                marginBottom: "6px",
              }}
            >
              気になる体験が見つかったら、
              <br className="md:hidden" />
              まずはLINEでお気軽にご相談ください。
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-jp-body inline-flex items-center justify-center transition-opacity duration-150 hover:opacity-75"
              style={{
                fontSize: "13px",
                letterSpacing: "0.08em",
                fontWeight: 300,
                border: "0.5px solid var(--text-primary)",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                padding: "11px 20px",
                lineHeight: 1.4,
              }}
            >
              LINEで相談
            </a>
            <Link
              href="/reservation"
              className="font-jp-body inline-flex items-center justify-center transition-opacity duration-150 hover:opacity-85"
              style={{
                fontSize: "13px",
                letterSpacing: "0.08em",
                fontWeight: 300,
                backgroundColor: "var(--accent-primary)",
                color: "#FFFFFF",
                textDecoration: "none",
                whiteSpace: "nowrap",
                padding: "11px 20px",
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

// ── Module Card (same design as home FeaturedSection) ────────────────────────
function ModuleListCard({ module }: { module: ModuleCard }) {
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
        <h2
          className="font-jp-title text-[16px] leading-[1.5] font-normal mb-[10px] transition-opacity duration-150 group-hover:opacity-70"
          style={{ color: "var(--text-primary)" }}
        >
          {renderLineBreaks(module.title)}
        </h2>

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
