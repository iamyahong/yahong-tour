-- ============================================================
-- yahong tour — 002: 깨진 이미지 URL 수정
-- Supabase Dashboard SQL Editor에서 실행해주세요
-- ============================================================

-- M04: 한복 + 경복궁 분위기 (밝고 차분)
UPDATE modules
SET hero_image_url = 'https://images.unsplash.com/photo-1601972602288-3be527b4f18a?w=1600&q=80'
WHERE id = 'M04';

-- M06: 광장시장 음식 (현재 작동 중이지만 명시적으로 기록)
UPDATE modules
SET hero_image_url = 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=1600&q=80'
WHERE id = 'M06';

-- M10: 한강 야경/일몰
UPDATE modules
SET hero_image_url = 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1600&q=80'
WHERE id = 'M10';

-- 확인 쿼리
-- SELECT id, hero_image_url FROM modules ORDER BY display_order;
