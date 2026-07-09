#!/usr/bin/env tsx
/**
 * 관리자 비밀번호 해시 생성 스크립트
 *
 * 사용법:
 *   pnpm --filter @workspace/yahong-tour hash "내비밀번호"
 *
 * 출력된 해시값을 Replit Secrets의 ADMIN_PASSWORD_HASH에 입력하세요.
 */

import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("❌ 비밀번호를 인자로 전달해주세요.");
  console.error('   예: pnpm --filter @workspace/yahong-tour hash "내비밀번호"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("❌ 비밀번호는 8자 이상이어야 합니다.");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

console.log("\n✅ 해시 생성 완료\n");
console.log("ADMIN_PASSWORD_HASH =", hash);
console.log("\n👆 이 값을 Replit Secrets > ADMIN_PASSWORD_HASH 에 입력하세요.");
console.log("   (등호 앞뒤 공백 없이, 해시값만 복사하세요)\n");
