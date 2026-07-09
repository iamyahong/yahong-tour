-- ============================================================
-- yahong tour — シードレビュー (仮ペルソナ、後で実際のレビューに置換)
-- supabase/seeds/modules.sql を実行した後に実行してください
-- ============================================================

-- seed_001: Tokyo · Rieさん (M04 韓服+北村)
INSERT INTO reviews (
  nickname, visit_date, module_id, rating, language,
  content, photo_urls, is_seed, is_visible
) VALUES (
  'Tokyo · Rieさん',
  '2025年10月',
  'M04',
  5,
  'ja',
  'ヤホンさんの日本語、まだまだ勉強中とおっしゃっていましたが、十分に伝わりました(笑)。それより、観光客がほとんどいない景色の良い場所を知っていて、写真もいっぱい撮ってくださって、本当に楽しかったです。

「韓服を着なきゃ」って気負っていたのですが、選ぶところから一緒に悩んでくれて、自然に楽しめました。仁寺洞の伝統茶屋では、日本語のメニューがないお店だったけど、ヤホンさんが全部訳してくださって、五味子茶という珍しいお茶を初めて知りました。

ガイドというより、本当に「ソウルの友達と一日遊んだ」感じ。次はぜひ広蔵市場のコースもお願いしたいです!',
  NULL,
  true,
  true
);

-- seed_002: Osaka · Takashi & Yukiさん (M10 漢江)
INSERT INTO reviews (
  nickname, visit_date, module_id, rating, language,
  content, photo_urls, is_seed, is_visible
) VALUES (
  'Osaka · Takashi & Yuki',
  '2025年6月',
  'M10',
  5,
  'ja',
  '妻と二人での韓国旅行で、定番のスポットは前回行ったので、何か違うことがしたくて申し込みました。

漢江での自転車、本当に最高でした。観光客向けじゃない、地元の人たちが普通に過ごしている場所で、コンビニのラーメンを啜りながら夕日を見る時間。これは絶対に自分たちだけでは見つけられなかった体験です。

ヤホンさんは無料で恐縮するくらい色々してくださって、こちらが気を遣うほどでした。実費もきちんと領収書を見せてくださって、安心でした。日本に帰ってきてから、妻と「またソウルに行きたいね」と話しています。今度は両親も連れて、北村のコースをお願いしようと思っています。',
  NULL,
  true,
  true
);

-- 確認クエリ
-- SELECT nickname, visit_date, module_id, rating, is_seed FROM reviews ORDER BY created_at;
