-- ============================================================
-- VMP Admin: Storage Bucket + Tables + RLS
-- Run this in the Supabase SQL Editor (once)
-- ============================================================

-- ── 1. Storage Bucket ────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vmp-images',
  'vmp-images',
  true,
  10485760, -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Storage RLS (bucket must exist first)
CREATE POLICY "vmp-images public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vmp-images');

CREATE POLICY "vmp-images admin insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'vmp-images'
    AND auth.uid() IN (
      SELECT id FROM auth.users
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "vmp-images admin update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'vmp-images'
    AND auth.uid() IN (
      SELECT id FROM auth.users
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "vmp-images admin delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'vmp-images'
    AND auth.uid() IN (
      SELECT id FROM auth.users
      WHERE id = auth.uid()
    )
  );

-- ── 2. Auth model ────────────────────────────────────────────
-- Every authenticated Supabase user (auth.uid() IS NOT NULL) has write access.
-- User creation is restricted to the project owner via the Supabase dashboard,
-- so all existing users are trusted admins — no role metadata needed.

-- ── 3. Tables ────────────────────────────────────────────────

-- Hero-Galerie (Startseite Slider)
CREATE TABLE IF NOT EXISTS hero_images (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path       text NOT NULL UNIQUE,
  label      text NOT NULL DEFAULT '',
  sort_order int  NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Bilder pro Band
CREATE TABLE IF NOT EXISTS band_images (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  band_slug  text NOT NULL,
  path       text NOT NULL UNIQUE,
  sort_order int  NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Haupt-Galerie
CREATE TABLE IF NOT EXISTS gallery_images (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path       text NOT NULL UNIQUE,
  category   text,                -- optional filter tag
  sort_order int  NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Event-Kategoriebilder (Firmenevents, Stadtfeste, Hochzeiten, Empfänge)
CREATE TABLE IF NOT EXISTS event_images (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category   text NOT NULL,      -- 'firmenevents' | 'stadtfeste' | 'hochzeiten' | 'empfaenge'
  path       text NOT NULL UNIQUE,
  sort_order int  NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Seitenbilder (Über uns, Technik)
CREATE TABLE IF NOT EXISTS page_images (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page       text NOT NULL,      -- 'ueber-uns' | 'technik'
  section    text,               -- optional sub-section
  path       text NOT NULL UNIQUE,
  sort_order int  NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Bewertungen pro Band
CREATE TABLE IF NOT EXISTS reviews (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  band_slug  text NOT NULL,
  name       text NOT NULL,
  rating     int  NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text       text NOT NULL,
  date       text NOT NULL,      -- human-readable, e.g. "März 2024"
  platform   text NOT NULL CHECK (platform IN ('Google', 'Facebook', 'Direkt')),
  created_at timestamptz DEFAULT now()
);

-- ── 4. Row Level Security ─────────────────────────────────────

ALTER TABLE hero_images    ENABLE ROW LEVEL SECURITY;
ALTER TABLE band_images    ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_images   ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_images    ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews        ENABLE ROW LEVEL SECURITY;

-- Macro: all tables follow the same pattern
-- Public → SELECT; Admin → ALL

-- hero_images
CREATE POLICY "hero_images select" ON hero_images FOR SELECT USING (true);
CREATE POLICY "hero_images admin"  ON hero_images FOR ALL
  USING      (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- band_images
CREATE POLICY "band_images select" ON band_images FOR SELECT USING (true);
CREATE POLICY "band_images admin"  ON band_images FOR ALL
  USING      (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- gallery_images
CREATE POLICY "gallery_images select" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "gallery_images admin"  ON gallery_images FOR ALL
  USING      (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- event_images
CREATE POLICY "event_images select" ON event_images FOR SELECT USING (true);
CREATE POLICY "event_images admin"  ON event_images FOR ALL
  USING      (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- page_images
CREATE POLICY "page_images select" ON page_images FOR SELECT USING (true);
CREATE POLICY "page_images admin"  ON page_images FOR ALL
  USING      (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- reviews
CREATE POLICY "reviews select" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews admin"  ON reviews FOR ALL
  USING      (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── 5. Useful indexes ─────────────────────────────────────────
CREATE INDEX IF NOT EXISTS band_images_slug_idx    ON band_images    (band_slug);
CREATE INDEX IF NOT EXISTS event_images_cat_idx    ON event_images   (category);
CREATE INDEX IF NOT EXISTS page_images_page_idx    ON page_images    (page, section);
CREATE INDEX IF NOT EXISTS reviews_slug_idx        ON reviews        (band_slug);
CREATE INDEX IF NOT EXISTS hero_images_order_idx   ON hero_images    (sort_order);
CREATE INDEX IF NOT EXISTS gallery_images_order_idx ON gallery_images (sort_order);
