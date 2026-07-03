ALTER TABLE public.contact_info
  ADD COLUMN IF NOT EXISTS cabinet_name_fr text NOT NULL DEFAULT 'Cabinet Roger Vangah — Avocat au Barreau de Paris',
  ADD COLUMN IF NOT EXISTS cabinet_name_en text NOT NULL DEFAULT 'Roger Vangah Law Firm — Attorney at the Paris Bar';