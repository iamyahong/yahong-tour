-- ============================================================
-- yahong tour — 初期マイグレーション
-- Supabase Dashboard > SQL Editor に貼り付けて実行してください
-- 実行順序: 1) テーブル作成 → 2) RLSポリシー設定
--
-- 注意: service_role キーは RLS を自動バイパスするため、
--       service_role 向けの明示的なポリシーは不要です。
--       管理者ページからは SUPABASE_SERVICE_ROLE_KEY を使用してください。
-- ============================================================

-- Enable UUID extension (Supabaseデフォルトで有効)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. modules テーブル (体験モジュール)
-- ============================================================
CREATE TABLE IF NOT EXISTS modules (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  duration TEXT NOT NULL,
  duration_label TEXT,
  cost TEXT NOT NULL,
  cost_label TEXT,
  pace TEXT,
  pace_label TEXT,
  suitable TEXT,
  suitable_label TEXT,
  tags TEXT[],
  hero_image_url TEXT NOT NULL,
  flow JSONB NOT NULL DEFAULT '[]',
  favorite_point TEXT NOT NULL DEFAULT '',
  good_to_know JSONB NOT NULL DEFAULT '[]',
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modules_updated_at
  BEFORE UPDATE ON modules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- anon キー: 公開済みモジュールの読み取りのみ許可
CREATE POLICY "Anyone can read published modules"
  ON modules FOR SELECT
  USING (is_published = true);

-- service_role キーは RLS を自動バイパスするため追加ポリシー不要

-- ============================================================
-- 2. reservations テーブル (予約)
-- ============================================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 日程・人数
  preferred_date DATE NOT NULL,
  alternative_date DATE,
  num_people INT NOT NULL CHECK (num_people > 0 AND num_people <= 10),
  age_group TEXT NOT NULL,

  -- 選択された体験
  selected_modules TEXT[] NOT NULL,

  -- ご要望
  request_message TEXT,

  -- 連絡先
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  line_id TEXT NOT NULL,
  stay_period TEXT,

  -- 管理
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled', 'no_show')),
  admin_memo TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reservations_status
  ON reservations(status);

CREATE INDEX IF NOT EXISTS idx_reservations_created_at
  ON reservations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reservations_preferred_date
  ON reservations(preferred_date);

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- anon キー: 予約の送信(INSERT)のみ許可
CREATE POLICY "Anyone can insert reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

-- service_role キーは RLS を自動バイパスするため追加ポリシー不要
-- (管理者ページでの SELECT / UPDATE / DELETE はすべて自動で許可)

-- ============================================================
-- 3. reviews テーブル (レビュー)
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT NOT NULL,
  visit_date TEXT NOT NULL,
  module_id TEXT REFERENCES modules(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  language TEXT NOT NULL DEFAULT 'ja',
  content TEXT NOT NULL,
  photo_urls TEXT[],
  password_hash TEXT,
  is_seed BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_module_id ON reviews(module_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_visible ON reviews(is_visible);

-- Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- anon キー: 公開中のレビューの読み取りのみ許可
CREATE POLICY "Anyone can read visible reviews"
  ON reviews FOR SELECT
  USING (is_visible = true);

-- service_role キーは RLS を自動バイパスするため追加ポリシー不要

-- ============================================================
-- 実行完了確認クエリ (以下を実行して3テーブルが表示されればOK)
-- ============================================================
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
-- ORDER BY table_name;
