import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase/server";
import { buildAdminNotificationEmail } from "@/lib/email/adminNotification";
import { buildApplicantConfirmationEmail } from "@/lib/email/applicantConfirmation";
import { z } from "zod";

const reservationSchema = z.object({
  preferred_date: z.string().min(1),
  alternative_date: z.string().optional().nullable(),
  num_people: z.number().int().min(1).max(10),
  age_group: z.string().min(1),
  selected_modules: z.array(z.string()).min(1),
  request_message: z.string().optional().nullable(),
  name: z.string().min(1),
  email: z.string().email(),
  line_id: z.string().min(1),
  stay_period: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = (await createServiceClient()) as any;

    // ── 1. Supabase INSERT ───────────────────────────────────────────
    const { data: reservation, error: dbError } = await supabase
      .from("reservations")
      .insert([parsed.data])
      .select("id")
      .single();

    if (dbError) {
      console.error("[reservations] DB insert error:", dbError);
      return NextResponse.json(
        { error: "送信に失敗しました。もう一度お試しください。" },
        { status: 500 }
      );
    }

    console.log("[reservations] Inserted reservation id:", reservation.id);

    // ── 2. モジュールタイトルを取得 (申請者メール用) ─────────────────
    let moduleTitles: string[] = parsed.data.selected_modules;
    try {
      const { data: modules } = await supabase
        .from("modules")
        .select("id, title")
        .in("id", parsed.data.selected_modules);
      if (modules && modules.length > 0) {
        const titleMap = Object.fromEntries(
          (modules as { id: string; title: string }[]).map((m) => [m.id, m.title])
        );
        moduleTitles = parsed.data.selected_modules.map(
          (id) => titleMap[id] ?? id
        );
      }
    } catch (e) {
      console.error("[reservations] Failed to fetch module titles:", e);
    }

    // ── 3. メール並行送信 ────────────────────────────────────────────
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "hello@yahongtour.com";
    const fromName = process.env.RESEND_FROM_NAME ?? "yahong tour";
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL ?? "iamyahong@gmail.com";
    const lineFriendUrl =
      process.env.NEXT_PUBLIC_LINE_FRIEND_URL ??
      "https://line.me/ti/p/~yahong76";

    if (!resendApiKey) {
      console.warn("[reservations] RESEND_API_KEY not set — skipping email");
    } else {
      const resend = new Resend(resendApiKey);

      const adminMail = buildAdminNotificationEmail({
        ...parsed.data,
        reservationId: reservation.id,
      });

      const applicantMail = buildApplicantConfirmationEmail({
        name: parsed.data.name,
        preferred_date: parsed.data.preferred_date,
        alternative_date: parsed.data.alternative_date,
        num_people: parsed.data.num_people,
        selected_module_titles: moduleTitles,
        lineFriendUrl,
      });

      const [adminResult, applicantResult] = await Promise.allSettled([
        resend.emails.send({
          from: `${fromName} <${fromEmail}>`,
          to: [adminEmail],
          subject: adminMail.subject,
          html: adminMail.html,
        }),
        resend.emails.send({
          from: `${fromName} <${fromEmail}>`,
          to: [parsed.data.email],
          subject: applicantMail.subject,
          html: applicantMail.html,
        }),
      ]);

      if (adminResult.status === "fulfilled") {
        console.log("[reservations] Admin email sent:", adminResult.value.data?.id);
      } else {
        console.error("[reservations] Admin email FAILED:", adminResult.reason);
      }

      if (applicantResult.status === "fulfilled") {
        console.log("[reservations] Applicant email sent:", applicantResult.value.data?.id);
      } else {
        console.error("[reservations] Applicant email FAILED:", applicantResult.reason);
      }
    }

    return NextResponse.json({ id: reservation.id }, { status: 201 });
  } catch (e) {
    console.error("[reservations] Unexpected error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
