"use client";

import type { FormData } from "./types";

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

export default function Step3Request({ data, onChange }: Props) {
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
        STEP 03
      </p>
      <h2
        className="font-jp-title"
        style={{ fontSize: "clamp(20px,4vw,26px)", marginBottom: "8px", lineHeight: 1.5 }}
      >
        何かご希望はありますか？
      </h2>
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          marginBottom: "32px",
        }}
      >
        アレルギーや苦手な食材、当日の体調、特別なリクエストなど、なんでもお書きください。空欄でも構いません。
      </p>

      <textarea
        rows={7}
        placeholder="例: 辛いものが苦手です。写真をたくさん撮りたいです。"
        value={data.request_message}
        onChange={(e) => onChange({ request_message: e.target.value })}
        style={{
          width: "100%",
          padding: "12px 14px",
          fontSize: "13px",
          fontFamily: "var(--font-jp-body, sans-serif)",
          color: "var(--text-primary)",
          backgroundColor: "var(--bg-primary)",
          border: "0.5px solid var(--border-medium)",
          borderRadius: "2px",
          outline: "none",
          resize: "vertical",
          lineHeight: 1.8,
        }}
      />
    </div>
  );
}
