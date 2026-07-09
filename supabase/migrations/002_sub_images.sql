-- ============================================================
-- yahong tour — 보조 사진 컬럼 추가
-- Supabase Dashboard > SQL Editor에 붙여넣어 실행하세요
-- ============================================================

ALTER TABLE modules
ADD COLUMN sub_images JSONB NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN modules.sub_images IS
'보조 사진 배열. 각 항목은 {"url": string, "caption": string} 형식. 최대 3개. 빈 배열이면 placeholder 표시.';
