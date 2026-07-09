"use client";

import { RESERVATION } from "@/lib/constants/content";

interface Props {
  currentStep: number;
}

export default function StepperIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* ステップ円形インジケーター */}
      <div className="flex items-center gap-0">
        {RESERVATION.steps.map((step, i) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isActive = isCompleted || isCurrent;

          return (
            <div key={step.number} className="flex items-center">
              {/* コネクター線 */}
              {i > 0 && (
                <div
                  style={{
                    width: "clamp(24px, 5vw, 48px)",
                    height: "0.5px",
                    backgroundColor: isActive
                      ? "var(--accent-primary)"
                      : "var(--border-medium)",
                    transition: "background-color 0.3s",
                  }}
                />
              )}

              {/* 円 */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: isActive
                      ? "1.5px solid var(--accent-primary)"
                      : "1.5px solid var(--border-medium)",
                    backgroundColor: isActive
                      ? "var(--accent-primary)"
                      : "transparent",
                    color: isActive ? "#fff" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontFamily: "var(--font-en-body, Inter, sans-serif)",
                    fontWeight: 500,
                    transition: "all 0.3s",
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path
                        d="M1 5l3.5 3.5L11 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                {/* ラベル (モバイルは非表示) */}
                <span
                  className="hidden md:block"
                  style={{
                    fontSize: "10px",
                    color: isActive ? "var(--accent-primary)" : "var(--text-muted)",
                    letterSpacing: "0.04em",
                    fontFamily: "var(--font-jp-body, sans-serif)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* STEP X / 4 */}
      <span
        style={{
          fontSize: "11px",
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
          fontFamily: "var(--font-en-body, Inter, sans-serif)",
        }}
      >
        STEP {currentStep} / 4
      </span>
    </div>
  );
}
