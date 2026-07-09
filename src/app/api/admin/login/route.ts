import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminHash) {
      return NextResponse.json(
        { error: "관리자 설정이 되어있지 않습니다" },
        { status: 500 }
      );
    }

    const trimmedEmail = adminEmail.trim().toLowerCase();
    const inputEmail = (email as string).trim().toLowerCase();
    const trimmedHash = adminHash.trim();

    const emailMatch = inputEmail === trimmedEmail;
    const passwordMatch = bcrypt.compareSync(password as string, trimmedHash);

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다" },
        { status: 401 }
      );
    }

    const token = await createSessionToken(email as string);
    await setSessionCookie(token);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
