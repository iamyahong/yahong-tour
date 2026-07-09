import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json() as Record<string, unknown>;

  const validStatuses = ["new", "contacted", "confirmed", "completed", "cancelled", "no_show"];
  const updates: Record<string, unknown> = {};

  if (typeof body.status === "string" && validStatuses.includes(body.status)) {
    updates.status = body.status;
  }
  if (typeof body.admin_memo === "string") {
    updates.admin_memo = body.admin_memo;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "업데이트할 필드가 없습니다" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  // Supabase generated types resolve update param as `never` for this table.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;
  const { data, error } = await db
    .from("reservations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: (error as { message: string }).message }, { status: 500 });

  return NextResponse.json(data);
}
