-- ============================================================
-- VMP Admin: Band image roles + Gallery image types
-- Run this in the Supabase SQL Editor AFTER 001_admin_tables.sql
-- ============================================================

-- Add role to band_images (showcase | hero | gallery)
ALTER TABLE band_images
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'gallery';

-- Add image_type to gallery_images (header | grid)
ALTER TABLE gallery_images
  ADD COLUMN IF NOT EXISTS image_type text NOT NULL DEFAULT 'grid';

-- Indexes
CREATE INDEX IF NOT EXISTS band_images_role_idx
  ON band_images (band_slug, role);

CREATE INDEX IF NOT EXISTS gallery_images_type_idx
  ON gallery_images (image_type);
