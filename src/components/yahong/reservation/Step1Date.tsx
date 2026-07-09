"use client";

import { RESERVATION } from "@/lib/constants/content";
import type { FormData } from "./types";

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Partial<Record<keyof FormData, string>>;
}

const today = new Date().toISOString().split("T")[0];

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
  appearance: "none",
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

export default function Step1Date({ data, onChange, errors }: Props) {
  return (
    <div>
      {/* ステップラベル */}
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--accent-primary)",
          fontFamily: "var(--font-en-body, sans-serif)",
          marginBottom: "10px",
        }}
      >
        STEP 01
      </p>
      <h2
        className="font-jp-title"
        style={{ fontSize: "clamp(20px,4vw,26px)", marginBottom: "8px", lineHeight: 1.5 }}
      >
        いつ韓国にいらっしゃいますか？
      </h2>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "36px" }}>
        ご希望の日と、もし可能ならその前後の代替日もお知らせください。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 第一希望日 */}
        <div>
          <label style={labelStyle}>第一希望日 *</label>
          <input
            type="date"
            min={today}
            value={data.preferred_date}
            onChange={(e) => onChange({ preferred_date: e.target.value })}
            style={{
              ...fieldStyle,
              borderColor: errors.preferred_date ? "var(--accent-primary)" : "var(--border-medium)",
            }}
          />
          {errors.preferred_date && <p style={errorStyle}>{errors.preferred_date}</p>}
        </div>

        {/* 代替日 */}
        <div>
          <label style={labelStyle}>代替日 (任意)</label>
          <input
            type="date"
            min={today}
            value={data.alternative_date}
            onChange={(e) => onChange({ alternative_date: e.target.value })}
            style={fieldStyle}
          />
        </div>

        {/* 人数 */}
        <div>
          <label style={labelStyle}>人数 * (1〜10名)</label>
          <input
            type="number"
            min={1}
            max={10}
            value={data.num_people}
            onChange={(e) => onChange({ num_people: parseInt(e.target.value) || 1 })}
            style={{
              ...fieldStyle,
              borderColor: errors.num_people ? "var(--accent-primary)" : "var(--border-medium)",
            }}
          />
          {errors.num_people && <p style={errorStyle}>{errors.num_people}</p>}
        </div>

        {/* 年代 */}
        <div>
          <label style={labelStyle}>年代 *</label>
          <select
            value={data.age_group}
            onChange={(e) => onChange({ age_group: e.target.value })}
            style={{
              ...fieldStyle,
              borderColor: errors.age_group ? "var(--accent-primary)" : "var(--border-medium)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' strokeWidth='1.2' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "32px",
            }}
          >
            <option value="">選択してください</option>
            {RESERVATION.ageGroups.map((ag) => (
              <option key={ag} value={ag}>
                {ag}
              </option>
            ))}
          </select>
          {errors.age_group && <p style={errorStyle}>{errors.age_group}</p>}
        </div>
      </div>
    </div>
  );
}
