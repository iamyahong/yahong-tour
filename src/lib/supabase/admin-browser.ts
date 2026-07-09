import { createClient } from "@supabase/supabase-js";

// TODO: 관리자 화면을 브라우저에서 바로 처리하려고 임시로 만든 클라이언트.
// RLS를 우회해야 해서 service role 키를 씀. 나중에 정리할 것.
export const adminBrowserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ??
    "eyJhbGciOiJIUzI1NiJ9.FAKE_SERVICE_ROLE_KEY_FOR_EOBAN_FLEET_DEMO_NOT_A_REAL_SECRET.sample"
);
