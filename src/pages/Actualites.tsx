import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { NewsSection } from "@/components/sections/NewsSection";
import { useLang } from "@/i18n/LanguageContext";
import { useSite } from "@/hooks/SiteDataContext";
import { useSeo, buildLangAlternates } from "@/lib/seo";
import { useBreadcrumbJsonLd } from "@/lib/useBreadcrumbJsonLd";
import { useText } from "@/hooks/useText";
/* eslint-disable import/no-unresolved */
import heroNewsPic from "@/assets/hero-news.jpg?responsive";
/* eslint-enable import/no-unresolved */
import { ResponsiveImage, type ResponsivePicture } from "@/components/ResponsiveImage";

const heroNewsPicture = heroNewsPic as unknown as ResponsivePicture;

const ALL = "__all__";

type ChipItem = { value: string; label: string; count: number };

const CategoryChips = ({
  items,
  active,
  onChange,
  allLabel,
}: {
  items: ChipItem[];
  active: string;
  onChange: (v: string) => void;
  allLabel: string;
}) => {
  if (items.length <= 1) return null;
  const total = items.reduce((s, i) => s + i.count, 0);
  const all: ChipItem = { value: ALL, label: allLabel, count: total };
  return (
    <div className="container-luxe -mb-10 pt-16">
      <div className="flex flex-wrap gap-2">
        {[all, ...items].map((c) => {
          const isActive = active === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange(c.value)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                isActive
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background/60 text-muted-foreground hover:text-primary hover:border-accent/60"
              }`}
              aria-pressed={isActive}
            >
              <span>{c.label}</span>
              <span className={`text-[10px] ${isActive ? "opacity-80" : "opacity-60"}`}>
                {c.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Actualites = () => {
  const { t, lang } = useLang();
  const { news } = useSite();

  const path = lang === "en" ? "/news" : "/actualites";
  const { canonical, alternates } = buildLangAlternates(path, lang);

  const seoTitle = useText(
    "seo.news.title",
    lang === "fr"
      ? "Actualités Juridiques & Analyses — Avocats ROGER VANGAH"
      : "Legal news & analyses — ROGER VANGAH Law Firm"
  );
  const seoDescription = useText(
    "seo.news.description",
    lang === "fr"
      ? "Actualités juridiques et analyses du Cabinet ROGER VANGAH : droit des affaires, OHADA, contentieux, fiscalité et droit international à Paris."
      : "Articles, insights and news from the ROGER VANGAH firm: business law, OHADA, litigation, tax and international law."
  );
  const seoImage = useText("seo.news.image", "");

  // Hero editable keys
  const heroEyebrow = useText(
    "newsPage.hero.eyebrow",
    `${t.newsPage.newsEyebrow} / ${t.articles.eyebrow}`
  );
  const heroTitle = useText("newsPage.hero.title", t.newsPage.title);
  const heroSubtitle = useText("newsPage.hero.subtitle", t.newsPage.subtitle);

  // Section labels
  const newsSectionEyebrow = useText("newsPage.newsEyebrow", t.newsPage.newsEyebrow);
  const newsSectionTitle = useText("newsPage.newsTitle", t.newsPage.newsTitle);
  const newsEmpty = useText("newsPage.newsEmpty", t.newsPage.newsEmpty);
  const articlesEyebrow = useText("articles.eyebrow", t.articles.eyebrow);
  const articlesTitle = useText("articles.title", t.articles.title);
  const articlesEmpty = useText("articles.empty", t.articles.empty);
  const readMoreLabel = useText("news.readMore", t.news.readMore);
  const articlesReadMore = useText("articles.readMore", t.articles.readMore);

  useSeo({
    title: seoTitle,
    description: seoDescription,
    image: seoImage || undefined,
    type: "website",
    lang,
    canonical,
    alternates,
  });

  useBreadcrumbJsonLd([
    { name: lang === "en" ? "Home" : "Accueil", path: "/" },
    { name: lang === "en" ? "News" : "Actualités", path },
  ]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const allNewsItems = news
    .filter((n) => n.lang === lang && (n.content_type ?? "news") === "news")
    .map((n) => ({
      key: n.id,
      href: `${path}/${n.slug || n.id}`,
      category: n.category,
      date: formatDate(n.published_date),
      title: n.title,
      excerpt: n.excerpt,
      image_url: n.image_url,
    }));

  const allArticleItems = news
    .filter((n) => n.lang === lang && n.content_type === "article")
    .map((n) => ({
      key: n.id,
      href: `${path}/${n.slug || n.id}`,
      category: n.category,
      date: formatDate(n.published_date),
      title: n.title,
      excerpt: n.excerpt,
      image_url: n.image_url,
    }));

  const allLabel = lang === "en" ? "All" : "Toutes";

  const buildCategories = (items: { category: string }[]): ChipItem[] => {
    const map = new Map<string, number>();
    for (const i of items) {
      const c = (i.category || "").trim();
      if (!c) continue;
      map.set(c, (map.get(c) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0], lang === "fr" ? "fr" : "en"))
      .map(([value, count]) => ({ value, label: value, count }));
  };

  const newsCategories = useMemo(() => buildCategories(allNewsItems), [allNewsItems, lang]);
  const articleCategories = useMemo(() => buildCategories(allArticleItems), [allArticleItems, lang]);

  const [newsCat, setNewsCat] = useState<string>(ALL);
  const [articleCat, setArticleCat] = useState<string>(ALL);

  const newsItems = newsCat === ALL ? allNewsItems : allNewsItems.filter((i) => i.category === newsCat);
  const articleItems = articleCat === ALL ? allArticleItems : allArticleItems.filter((i) => i.category === articleCat);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page hero */}
        <section className="relative pt-48 pb-28 md:pt-60 md:pb-36 bg-night text-primary-foreground overflow-hidden">
          <ResponsiveImage
            data={heroNewsPicture}
            alt=""
            aria-hidden="true"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover [filter:saturate(1.08)_contrast(1.05)] [image-rendering:auto]"
            pictureClassName="absolute inset-0 w-full h-full"
          />
          
          <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent))_0%,transparent_55%)]" />
          <div className="container-luxe max-w-3xl relative">
            <p className="eyebrow text-accent">{heroEyebrow}</p>
            <h1 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              {heroTitle}
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
              {heroSubtitle}
            </p>
            <div className="gold-divider mt-10" />
          </div>
        </section>

        {/* Actualités (section 1) */}
        <div className="bg-secondary/50 pt-12">
          <CategoryChips items={newsCategories} active={newsCat} onChange={setNewsCat} allLabel={allLabel} />
        </div>
        <NewsSection
          eyebrow={newsSectionEyebrow}
          title={newsSectionTitle}
          readMoreLabel={readMoreLabel}
          items={newsItems}
          emptyLabel={newsEmpty}
          background="muted"
          sectionId="actualites"
        />

        {/* Articles (section 2) */}
        <div className="bg-background pt-12">
          <CategoryChips items={articleCategories} active={articleCat} onChange={setArticleCat} allLabel={allLabel} />
        </div>
        <NewsSection
          eyebrow={articlesEyebrow}
          title={articlesTitle}
          readMoreLabel={articlesReadMore}
          items={articleItems}
          emptyLabel={articlesEmpty}
          background="default"
          sectionId="articles"
        />

      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Actualites;
