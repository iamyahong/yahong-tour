"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/database";
import type { FormData } from "./types";

type Module = Database["public"]["Tables"]["modules"]["Row"];

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Partial<Record<keyof FormData, string>>;
}

function parseDurationMinutes(duration: string): number {
  const m = duration.match(/(\d+)/);
  if (!m) return 0;
  const n = parseInt(m[1]);
  if (duration.includes("時間")) return n * 60;
  if (duration.includes("分")) return n;
  return n * 60;
}

function formatTotalDuration(minutes: number): string {
  if (minutes === 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `約${h}時間`;
  return `約${h}時間${m}分`;
}

export default function Step2Modules({ data, onChange, errors }: Props) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("modules")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .then(({ data: rows }) => {
        if (rows) setModules(rows);
        setLoading(false);
      });
  }, []);

  const toggle = (id: string) => {
    const next = data.selected_modules.includes(id)
      ? data.selected_modules.filter((m) => m !== id)
      : [...data.selected_modules, id];
    onChange({ selected_modules: next });
  };

  const selectedModules = modules.filter((m) =>
    data.selected_modules.includes(m.id)
  );
  const totalMinutes = selectedModules.reduce(
    (acc, m) => acc + parseDurationMinutes(m.duration),
    0
  );

  return (
    <div>
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--accent-primary)",
          fontFamily: "var(--font-en-body, sans-serif)",
          marginBottom: "10px",
        }}
      >
        STEP 02
      </p>
      <h2
        className="font-jp-title"
        style={{ fontSize: "clamp(20px,4vw,26px)", marginBottom: "8px", lineHeight: 1.5 }}
      >
        どんな一日を過ごしたいですか？
      </h2>
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          marginBottom: "28px",
        }}
      >
        気になる体験を、いくつでも選んでください。組み合わせは一緒に考えましょう。一つだけでも、半日でも、もちろん大丈夫です。
      </p>

      {errors.selected_modules && (
        <p style={{ fontSize: "11px", color: "var(--accent-primary)", marginBottom: "12px" }}>
          {errors.selected_modules}
        </p>
      )}

      {loading ? (
        <div style={{ color: "var(--text-muted)", fontSize: "13px", padding: "40px 0" }}>
          読み込み中...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {modules.map((mod) => {
            const selected = data.selected_modules.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => toggle(mod.id)}
                style={{
                  position: "relative",
                  textAlign: "left",
                  padding: "18px 20px",
                  borderRadius: "2px",
                  border: selected
                    ? "1.5px solid var(--accent-primary)"
                    : "0.5px solid var(--border-medium)",
                  backgroundColor: selected ? "var(--bg-accent)" : "var(--bg-primary)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {/* 체크 아이콘 */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: selected
                      ? "1.5px solid var(--accent-primary)"
                      : "1px solid var(--border-medium)",
                    backgroundColor: selected ? "var(--accent-primary)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {selected && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3.5l2.5 2.5L8 1"
                        stroke="white"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* ID バッジ */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    color: "var(--accent-primary)",
                    border: "0.5px solid var(--accent-primary)",
                    padding: "2px 6px",
                    borderRadius: "1px",
                    marginBottom: "8px",
                    fontFamily: "var(--font-en-body, sans-serif)",
                  }}
                >
                  {mod.id}
                </span>

                {/* カテゴリ・時間 */}
                <p
                  style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.04em",
                    marginBottom: "4px",
                    fontFamily: "var(--font-jp-body, sans-serif)",
                  }}
                >
                  {mod.category} · {mod.duration}
                </p>

                {/* タイトル */}
                <p
                  className="font-jp-body"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.5,
                    marginBottom: "6px",
                  }}
                >
                  {mod.title}
                </p>

                {/* 実費 */}
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-jp-body, sans-serif)",
                  }}
                >
                  実費目安: {mod.cost}
                </p>
              </button>
            );
          })}

          {/* Coming Soon カード */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: "2px",
              border: "0.5px dashed var(--border-medium)",
              backgroundColor: "transparent",
              opacity: 0.6,
              cursor: "not-allowed",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "9px",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                border: "0.5px solid var(--border-subtle)",
                padding: "2px 6px",
                borderRadius: "1px",
                marginBottom: "8px",
                fontFamily: "var(--font-en-body, sans-serif)",
              }}
            >
              COMING SOON
            </span>
            <p
              className="font-jp-body"
              style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}
            >
              他のテーマを見る
              <br />
              <span style={{ fontSize: "11px" }}>（準備中）</span>
            </p>
          </div>
        </div>
      )}

      {/* 요약 박스 */}
      {data.selected_modules.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            padding: "14px 18px",
            borderRadius: "2px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {selectedModules.map((m) => m.title).join("、")}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "var(--accent-primary)",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-jp-body, sans-serif)",
              fontWeight: 500,
            }}
          >
            {formatTotalDuration(totalMinutes)}
          </p>
        </div>
      )}
    </div>
  );
}
