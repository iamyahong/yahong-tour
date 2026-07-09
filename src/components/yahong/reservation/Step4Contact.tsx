"use client";

import type { FormData } from "./types";

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Partial<Record<keyof FormData, string>>;
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "13px",
  fontFamily: "var(--font-jp-body, sans-serif)",
  color: "var(--text-primary)",
  backgroundColor: "var(--bg-primary)",
  border: "0.5px solid var(--border-medium)",
  borderRadius: "2px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  color: "var(--text-muted)",
  letterSpacing: "0.06em",
  marginBottom: "6px",
  fontFamily: "var(--font-en-body, sans-serif)",
};

const errorStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--accent-primary)",
  marginTop: "4px",
};

export default function Step4Contact({ data, onChange, errors }: Props) {
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
        STEP 04
      </p>
      <h2
        className="font-jp-title"
        style={{ fontSize: "clamp(20px,4vw,26px)", marginBottom: "8px", lineHeight: 1.5 }}
      >
        最後に、ご連絡先を教えてください。
      </h2>
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          marginBottom: "32px",
        }}
      >
        48時間以内にLINEでご連絡します。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* お名前 */}
        <div className="md:col-span-2">
          <label style={labelStyle}>お名前 (ニックネームOK) *</label>
          <input
            type="text"
            placeholder="例: さくら"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            style={{
              ...fieldStyle,
              borderColor: errors.name ? "var(--accent-primary)" : "var(--border-medium)",
            }}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        {/* メールアドレス */}
        <div>
          <label style={labelStyle}>メールアドレス *</label>
          <input
            type="email"
            placeholder="hello@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            style={{
              ...fieldStyle,
              borderColor: errors.email ? "var(--accent-primary)" : "var(--border-medium)",
            }}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        {/* LINE ID */}
        <div>
          <label style={labelStyle}>LINE ID *</label>
          <input
            type="text"
            placeholder="@yourlineid"
            value={data.line_id}
            onChange={(e) => onChange({ line_id: e.target.value })}
            style={{
              ...fieldStyle,
              borderColor: errors.line_id ? "var(--accent-primary)" : "var(--border-medium)",
            }}
          />
          {errors.line_id && <p style={errorStyle}>{errors.line_id}</p>}
        </div>

        {/* 韓国滞在期間 */}
        <div className="md:col-span-2">
          <label style={labelStyle}>韓国滞在期間 (任意)</label>
          <input
            type="text"
            placeholder="例: 2026年7月10日〜13日"
            value={data.stay_period}
            onChange={(e) => onChange({ stay_period: e.target.value })}
            style={fieldStyle}
          />
        </div>
      </div>

      {/* 送信後案内 */}
      <p
        style={{
          fontSize: "11px",
          color: "var(--text-muted)",
          lineHeight: 1.8,
          marginTop: "24px",
          padding: "14px 16px",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "2px",
        }}
      >
        送信後、48時間以内にLINEでご連絡いたします。お返事には少しお時間をいただくことがありますが、必ずお返事します。
      </p>
    </div>
  );
}
