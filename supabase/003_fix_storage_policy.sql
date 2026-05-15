-- ============================================================
-- Fix storage RLS policies — run after 001_admin_tables.sql
-- The original INSERT/UPDATE/DELETE policies used a subquery
-- against auth.users which can fail in the storage RLS context.
-- Replace with the simpler auth.uid() IS NOT NULL check.
-- ============================================================

DROP POLICY IF EXISTS "vmp-images admin insert" ON storage.objects;
DROP POLICY IF EXISTS "vmp-images admin update" ON storage.objects;
DROP POLICY IF EXISTS "vmp-images admin delete" ON storage.objects;

CREATE POLICY "vmp-images admin insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'vmp-images'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "vmp-images admin update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'vmp-images'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "vmp-images admin delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'vmp-images'
    AND auth.uid() IS NOT NULL
  );
