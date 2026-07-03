import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ExpertiseSection = { title: string; items: string[] };
export type ExpertiseStep = { title: string; description: string };
export type ExpertiseFAQ = { question: string; answer: string };

export type ExpertiseRow = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  tagline: string;
  intro: string;
  conclusion: string;
  image_url: string | null;
  approach: string;
  sections: ExpertiseSection[];
  methodology: ExpertiseStep[];
  faq: ExpertiseFAQ[];
  sort_order: number;
  published: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image_url?: string | null;
};

// `raw` is the row returned by Supabase where the JSONB columns are typed as
// `Json` — we narrow them to their concrete shapes here.
const normalize = (raw: Record<string, unknown>): ExpertiseRow => ({
  ...(raw as unknown as ExpertiseRow),
  sections: Array.isArray(raw.sections) ? (raw.sections as ExpertiseSection[]) : [],
  methodology: Array.isArray(raw.methodology) ? (raw.methodology as ExpertiseStep[]) : [],
  faq: Array.isArray(raw.faq) ? (raw.faq as ExpertiseFAQ[]) : [],
});

export const useExpertises = (opts: { onlyPublished?: boolean } = {}) => {
  const { onlyPublished = true } = opts;
  const [data, setData] = useState<ExpertiseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    let q = supabase.from("expertises").select("*").order("sort_order", { ascending: true });
    if (onlyPublished) q = q.eq("published", true);
    const { data: rows, error: err } = await q;
    if (err) setError(err.message);
    else setData((rows ?? []).map(normalize));
    setLoading(false);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyPublished]);

  return { data, loading, error, refetch };
};

export const useExpertise = (slug: string | undefined) => {
  const [data, setData] = useState<ExpertiseRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: row } = await supabase
        .from("expertises")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!cancelled) {
        setData(row ? normalize(row) : null);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data, loading };
};
