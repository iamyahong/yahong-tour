# yahong-tour — Eoban 표본 함대 2호 (실험용 저장소)

> Experimental sample repository for the Eoban fleet. Intentional defects are planted
> with FAKE values only. No real credentials or customer data exist in this repo.

이 저장소는 유니소드(주)의 Eoban 프로젝트에서 "유형 B 고객"(개발/운영 2단, 리허설 환경 없음)을
재현하기 위한 표본입니다. 실제 영업에 사용되지 않으며, 데이터는 시드(예시)뿐입니다.

## 의도된 결함 (스캐너·AI 리뷰 검증용 — 값은 전부 가짜)
- `src/lib/supabase/admin-browser.ts` — service role 키를 브라우저 노출 이름(NEXT_PUBLIC_*)으로
  참조하는 치명적 안티패턴. 하드코딩된 문자열은 가짜이며 어떤 실키도 아님. 어디서도 import 되지 않음.

## 유형 B 상태 특징 (의도된 미성숙)
- staging 브랜치 없음 (dev / main 2단)
- main 브랜치 보호 없음 (직접 push 가능)
- 자동 테스트 0건, CI 게이트 없음

## 자연 결함 (실사에서 확인된 것)
- 예약 API(`/api/reservations`)에 rate-limit이 전혀 없어 동일 IP/사용자가 무제한 반복 제출 가능(DB 쓰기·이메일 발송 남용 위험).
- DB insert 실패 시 `dbError.message`(Supabase 원본 에러 메시지)를 그대로 클라이언트 응답에 노출해 내부 스키마·쿼리 정보가 유출될 수 있음.
- 이메일(관리자/신청자) 발송 실패는 로그만 남기고 조용히 무시되어, 신청자는 DB 저장에 성공했는데도 확인 메일을 못 받을 수 있음(재시도·알림 없음).
