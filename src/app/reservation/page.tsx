"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StepperIndicator from "@/components/yahong/reservation/StepperIndicator";
import Step1Date from "@/components/yahong/reservation/Step1Date";
import Step2Modules from "@/components/yahong/reservation/Step2Modules";
import Step3Request from "@/components/yahong/reservation/Step3Request";
import Step4Contact from "@/components/yahong/reservation/Step4Contact";
import { defaultFormData, type FormData } from "@/components/yahong/reservation/types";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function ReservationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ?module=M04 クエリパラメータ対応 / ?_step=X 開発用
  useEffect(() => {
    const moduleId = searchParams?.get("module") ?? null;
    const devStep = searchParams?.get("_step") ?? null;
    if (moduleId) {
      setFormData((prev) => ({
        ...prev,
        selected_modules: prev.selected_modules.includes(moduleId)
          ? prev.selected_modules
          : [...prev.selected_modules, moduleId],
      }));
      setStep(2);
    }
    if (devStep) {
      const n = parseInt(devStep);
      if (n >= 1 && n <= 4) setStep(n);
    }
  }, [searchParams]);

  const update = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(updates).forEach((k) => delete next[k as keyof FormData]);
      return next;
    });
  }, []);

  const validateStep = (s: number): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (s === 1) {
      if (!formData.preferred_date) errs.preferred_date = "第一希望日を入力してください";
      else if (formData.preferred_date < today()) errs.preferred_date = "今日以降の日付を選択してください";
      if (!formData.num_people || formData.num_people < 1 || formData.num_people > 10)
        errs.num_people = "1〜10名の人数を入力してください";
      if (!formData.age_group) errs.age_group = "年代を選択してください";
    }

    if (s === 2) {
      if (formData.selected_modules.length === 0)
        errs.selected_modules = "体験を1つ以上選んでください";
    }

    if (s === 4) {
      if (!formData.name) errs.name = "お名前を入力してください";
      if (!formData.email) errs.email = "メールアドレスを入力してください";
      else if (!isValidEmail(formData.email)) errs.email = "正しいメールアドレスを入力してください";
      if (!formData.line_id) errs.line_id = "LINE IDを入力してください";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        preferred_date: formData.preferred_date,
        alternative_date: formData.alternative_date || null,
        num_people: formData.num_people,
        age_group: formData.age_group,
        selected_modules: formData.selected_modules,
        request_message: formData.request_message || null,
        name: formData.name,
        email: formData.email,
        line_id: formData.line_id,
        stay_period: formData.stay_period || null,
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "送信に失敗しました");
      }

      router.push("/reservation/complete");
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "送信に失敗しました。もう一度お試しください。");
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ページヘッダー */}
      <section className="flex flex-col items-center text-center px-5 pt-14 pb-10 md:pt-20 md:pb-14">
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "var(--accent-primary)",
            fontFamily: "var(--font-en-body, sans-serif)",
            marginBottom: "12px",
          }}
        >
          RESERVATION
        </p>
        <h1
          className="font-jp-title"
          style={{ fontSize: "clamp(22px,4vw,28px)", lineHeight: 1.5 }}
        >
          いっしょに、ソウルを歩きませんか。
        </h1>
      </section>

      {/* メインフォームエリア */}
      <div className="max-w-3xl mx-auto px-5 pb-24">
        {/* ステッパー */}
        <div
          style={{
            padding: "20px 24px",
            marginBottom: "40px",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "2px",
          }}
        >
          <StepperIndicator currentStep={step} />
        </div>

        {/* ステップコンテンツ */}
        <div style={{ minHeight: "400px" }}>
          {step === 1 && (
            <Step1Date data={formData} onChange={update} errors={errors} />
          )}
          {step === 2 && (
            <Step2Modules data={formData} onChange={update} errors={errors} />
          )}
          {step === 3 && (
            <Step3Request data={formData} onChange={update} />
          )}
          {step === 4 && (
            <Step4Contact data={formData} onChange={update} errors={errors} />
          )}
        </div>

        {/* 送信エラー */}
        {submitError && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--accent-primary)",
              marginTop: "16px",
              padding: "12px 16px",
              border: "0.5px solid var(--accent-primary)",
              borderRadius: "2px",
            }}
          >
            {submitError}
          </p>
        )}

        {/* ナビゲーション */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "48px", paddingTop: "24px", borderTop: "0.5px solid var(--border-subtle)" }}
        >
          {/* 戻るボタン */}
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            style={{
              fontSize: "12px",
              color: step === 1 ? "var(--border-medium)" : "var(--text-secondary)",
              letterSpacing: "0.06em",
              fontFamily: "var(--font-en-body, sans-serif)",
              background: "none",
              border: "none",
              cursor: step === 1 ? "not-allowed" : "pointer",
              padding: "8px 0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ← 戻る
          </button>

          {/* 次へ / 送信 */}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              style={{
                fontSize: "12px",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-en-body, sans-serif)",
                color: "var(--bg-primary)",
                backgroundColor: "var(--accent-primary)",
                border: "none",
                padding: "11px 28px",
                borderRadius: "1px",
                cursor: "pointer",
              }}
            >
              次へ →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                fontSize: "12px",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-en-body, sans-serif)",
                color: "var(--bg-primary)",
                backgroundColor: submitting ? "var(--text-muted)" : "var(--accent-primary)",
                border: "none",
                padding: "11px 28px",
                borderRadius: "1px",
                cursor: submitting ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
              }}
            >
              {submitting ? "送信中..." : "送信する"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div style={{ padding: "80px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>読み込み中...</div>}>
      <ReservationForm />
    </Suspense>
  );
}
