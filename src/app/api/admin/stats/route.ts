import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = await createServiceClient();
  const now = new Date();

  // 이번 달 시작/끝
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  // 이번 주 시작/끝 (월요일 기준)
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() + diff);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const [monthNewRes, weekScheduled, unanswered, recentRes] = await Promise.all([
    // 이번 달 신규
    supabase
      .from("reservations")
      .select("id", { count: "exact", head: true })
      .eq("status", "new")
      .gte("created_at", `${monthStart}T00:00:00`)
      .lte("created_at", `${monthEnd}T23:59:59`),

    // 이번 주 예정 (confirmed + contacted)
    supabase
      .from("reservations")
      .select("id", { count: "exact", head: true })
      .in("status", ["confirmed", "contacted"])
      .gte("preferred_date", weekStart.toISOString().split("T")[0])
      .lte("preferred_date", weekEnd.toISOString().split("T")[0]),

    // 미답변 (status=new 전체)
    supabase
      .from("reservations")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),

    // 최근 5건
    supabase
      .from("reservations")
      .select("id, name, email, preferred_date, num_people, selected_modules, line_id, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return NextResponse.json({
    monthNew: monthNewRes.count ?? 0,
    weekScheduled: weekScheduled.count ?? 0,
    unanswered: unanswered.count ?? 0,
    recent: recentRes.data ?? [],
  });
}
