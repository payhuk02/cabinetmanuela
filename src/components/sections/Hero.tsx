import { useEffect, useRef, useState } from "react";
import { useText } from "@/hooks/useText";
import { ResponsiveImage, type ResponsivePicture } from "@/components/ResponsiveImage";
import heroInkDesktop from "@/assets/hero-ink-1280.mp4";
import heroInkMobile from "@/assets/hero-ink-854.mp4";
import heroInkPoster from "@/assets/hero-ink-poster.jpg";
import rvEmblem from "@/assets/rv-avocat-emblem-transparent.png";
import scaleOfJustice from "@/assets/scale-of-justice.svg";
/* eslint-disable import/no-unresolved */
import imgAffaires from "@/assets/expertise-affaires.jpg?responsive";
import imgBancaire from "@/assets/expertise-bancaire.jpg?responsive";
import imgSurendettement from "@/assets/expertise-surendettement.jpg?responsive";
import imgOhada from "@/assets/expertise-ohada.jpg?responsive";
import imgImmobilier from "@/assets/expertise-immobilier.jpg?responsive";
import imgPenal from "@/assets/expertise-penal.jpg?responsive";
import imgEtrangers from "@/assets/expertise-etrangers.jpg?responsive";
import imgPetrolier from "@/assets/expertise-petrolier.jpg?responsive";
import imgPalaisDeJusticeParis from "@/assets/palais-de-justice-paris.jpg?responsive";
import imgCabinetVangahPic from "@/assets/hero-cabinet-vangah.jpg?responsive";
/* eslint-enable import/no-unresolved */

const cabinetPicture = imgCabinetVangahPic as unknown as ResponsivePicture;
const palaisDeJusticeParis = imgPalaisDeJusticeParis as unknown as ResponsivePicture;
const picAffaires = imgAffaires as unknown as ResponsivePicture;
const picBancaire = imgBancaire as unknown as ResponsivePicture;
const picSurendettement = imgSurendettement as unknown as ResponsivePicture;
const picOhada = imgOhada as unknown as ResponsivePicture;
const picImmobilier = imgImmobilier as unknown as ResponsivePicture;
const picPenal = imgPenal as unknown as ResponsivePicture;
const picEtrangers = imgEtrangers as unknown as ResponsivePicture;
const picPetrolier = imgPetrolier as unknown as ResponsivePicture;

type SizeKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const EYEBROW_SIZE_CLASS: Record<SizeKey, string> = {
  xs: "text-[10px] tracking-[0.25em]",
  sm: "text-xs tracking-[0.25em]",
  md: "text-sm tracking-[0.3em]",
  lg: "text-base tracking-[0.3em]",
  xl: "text-lg tracking-[0.3em]",
  "2xl": "text-xl tracking-[0.3em]",
};

const TITLE_SIZE_CLASS: Record<SizeKey, string> = {
  xs: "text-2xl md:text-3xl lg:text-4xl",
  sm: "text-3xl md:text-4xl lg:text-5xl",
  md: "text-5xl md:text-7xl lg:text-8xl",
  lg: "text-6xl md:text-8xl lg:text-9xl",
  xl: "text-7xl md:text-9xl lg:text-[10rem]",
  "2xl": "text-8xl md:text-[10rem] lg:text-[12rem]",
};

const normalizeSize = (v: string, fallback: SizeKey = "md"): SizeKey =>
  (["xs", "sm", "md", "lg", "xl", "2xl"].includes(v) ? (v as SizeKey) : fallback);

type Slide = {
  image: string | null;
  picture?: ResponsivePicture;
  eyebrow: string;
  title: string;
  accent: string;
  colorEyebrow: string;
  colorTitle: string;
  colorAccent: string;
  sizeEyebrow: SizeKey;
  sizeTitle: SizeKey;
};

export const Hero = () => {
  const eyebrow = useText("hero.eyebrow", "Conseil & Contentieux");
  const heroTitleLine1 = useText("hero.titleLine1", "CABINET");
  const heroTitleLine2 = useText("hero.titleLine2", "ROGER VANGAH");
  const customHeroImage = useText("hero.image", "");
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  // The ink video starts immediately on page load — no deferred mount.
  // Users with reduced motion preference skip it entirely.
  const [skipVideo, setSkipVideo] = useState(false);
  // Stratégie de préchargement progressive :
  // - "metadata" au mount → ne télécharge que les métadonnées (quelques Ko),
  //   ce qui libère la bande passante pour le LCP (texte + image carrousel).
  // - "auto" dès que le Hero est proche du viewport (IntersectionObserver
  //   avec rootMargin large) → bascule en téléchargement complet pour
  //   permettre le démarrage immédiat de la lecture.
  const [videoPreload, setVideoPreload] = useState<"metadata" | "auto">("metadata");


  const FADE_DURATION = 2;
  // Voile sombre désactivé : on laisse les images du carrousel pleinement visibles.
  const OVERLAY_MIN = 0;

  // Hooks called unconditionally at the top level (Rules of Hooks).
  const s1Eyebrow = useText("hero.slide1.eyebrow", "CABINET\nROGER VANGAH");
  const s1Title = useText("hero.slide1.title", "Avocat au");
  const s1Accent = useText("hero.slide1.accent", "Barreau de Paris");
  const s2Eyebrow = useText("hero.slide2.eyebrow", "Conseil aux entreprises");
  const s2Title = useText("hero.slide2.title", "Droit");
  const s2Accent = useText("hero.slide2.accent", "des affaires");
  const s3Eyebrow = useText("hero.slide3.eyebrow", "Financements & sûretés");
  const s3Title = useText("hero.slide3.title", "Droit bancaire");
  const s3Accent = useText("hero.slide3.accent", "& financier");
  const s4Eyebrow = useText("hero.slide4.eyebrow", "Restructuration");
  const s4Title = useText("hero.slide4.title", "Surendettement");
  const s4Accent = useText("hero.slide4.accent", "");
  const s5Eyebrow = useText("hero.slide5.eyebrow", "Afrique des affaires");
  const s5Title = useText("hero.slide5.title", "Droit");
  const s5Accent = useText("hero.slide5.accent", "OHADA");
  const s6Eyebrow = useText("hero.slide6.eyebrow", "Conseil & Contentieux");
  const s6Title = useText("hero.slide6.title", "Droit");
  const s6Accent = useText("hero.slide6.accent", "immobilier");
  const s7Eyebrow = useText("hero.slide7.eyebrow", "Défense pénale");
  const s7Title = useText("hero.slide7.title", "Droit pénal");
  const s7Accent = useText("hero.slide7.accent", "des affaires");
  const s8Eyebrow = useText("hero.slide8.eyebrow", "Mobilité internationale");
  const s8Title = useText("hero.slide8.title", "Droit");
  const s8Accent = useText("hero.slide8.accent", "des étrangers");
  const s9Eyebrow = useText("hero.slide9.eyebrow", "Industries extractives");
  const s9Title = useText("hero.slide9.title", "Droit pétrolier");
  const s9Accent = useText("hero.slide9.accent", "& minier");

  // Custom slide images uploaded from admin (overrides default responsive bundles).
  const s1Img = useText("hero.slide1.image", "");
  const s2Img = useText("hero.slide2.image", "");
  const s3Img = useText("hero.slide3.image", "");
  const s4Img = useText("hero.slide4.image", "");
  const s5Img = useText("hero.slide5.image", "");
  const s6Img = useText("hero.slide6.image", "");
  const s7Img = useText("hero.slide7.image", "");
  const s8Img = useText("hero.slide8.image", "");
  const s9Img = useText("hero.slide9.image", "");

  // Couleurs par slide (configurables depuis l'admin). Defaults : doré + ivoire.
  const GOLD = "#d4af37";
  const IVORY = "#ffffff";
  const c1e = useText("hero.slide1.color.eyebrow", GOLD);
  const c1t = useText("hero.slide1.color.title", IVORY);
  const c1a = useText("hero.slide1.color.accent", GOLD);
  const c2e = useText("hero.slide2.color.eyebrow", GOLD);
  const c2t = useText("hero.slide2.color.title", IVORY);
  const c2a = useText("hero.slide2.color.accent", GOLD);
  const c3e = useText("hero.slide3.color.eyebrow", GOLD);
  const c3t = useText("hero.slide3.color.title", IVORY);
  const c3a = useText("hero.slide3.color.accent", GOLD);
  const c4e = useText("hero.slide4.color.eyebrow", GOLD);
  const c4t = useText("hero.slide4.color.title", IVORY);
  const c4a = useText("hero.slide4.color.accent", GOLD);
  const c5e = useText("hero.slide5.color.eyebrow", GOLD);
  const c5t = useText("hero.slide5.color.title", IVORY);
  const c5a = useText("hero.slide5.color.accent", GOLD);
  const c6e = useText("hero.slide6.color.eyebrow", GOLD);
  const c6t = useText("hero.slide6.color.title", IVORY);
  const c6a = useText("hero.slide6.color.accent", GOLD);
  const c7e = useText("hero.slide7.color.eyebrow", GOLD);
  const c7t = useText("hero.slide7.color.title", IVORY);
  const c7a = useText("hero.slide7.color.accent", GOLD);
  const c8e = useText("hero.slide8.color.eyebrow", GOLD);
  const c8t = useText("hero.slide8.color.title", IVORY);
  const c8a = useText("hero.slide8.color.accent", GOLD);
  const c9e = useText("hero.slide9.color.eyebrow", GOLD);
  const c9t = useText("hero.slide9.color.title", IVORY);
  const c9a = useText("hero.slide9.color.accent", GOLD);

  // Tailles d'écriture par slide (configurables depuis l'admin).
  const sz1e = normalizeSize(useText("hero.slide1.size.eyebrow", "md"));
  const sz1t = normalizeSize(useText("hero.slide1.size.title", "md"));
  const sz2e = normalizeSize(useText("hero.slide2.size.eyebrow", "md"));
  const sz2t = normalizeSize(useText("hero.slide2.size.title", "md"));
  const sz3e = normalizeSize(useText("hero.slide3.size.eyebrow", "md"));
  const sz3t = normalizeSize(useText("hero.slide3.size.title", "md"));
  const sz4e = normalizeSize(useText("hero.slide4.size.eyebrow", "md"));
  const sz4t = normalizeSize(useText("hero.slide4.size.title", "md"));
  const sz5e = normalizeSize(useText("hero.slide5.size.eyebrow", "md"));
  const sz5t = normalizeSize(useText("hero.slide5.size.title", "md"));
  const sz6e = normalizeSize(useText("hero.slide6.size.eyebrow", "md"));
  const sz6t = normalizeSize(useText("hero.slide6.size.title", "md"));
  const sz7e = normalizeSize(useText("hero.slide7.size.eyebrow", "md"));
  const sz7t = normalizeSize(useText("hero.slide7.size.title", "md"));
  const sz8e = normalizeSize(useText("hero.slide8.size.eyebrow", "md"));
  const sz8t = normalizeSize(useText("hero.slide8.size.title", "md"));
  const sz9e = normalizeSize(useText("hero.slide9.size.eyebrow", "md"));
  const sz9t = normalizeSize(useText("hero.slide9.size.title", "md"));

  // Slides : présentation puis les domaines d'expertise.
  // Si l'admin a uploadé une image personnalisée pour un slide, on l'utilise
  // (via `image` simple) ; sinon on garde le bundle responsive d'origine.
  const slides: Slide[] = [
    { image: s1Img || null, picture: s1Img ? undefined : palaisDeJusticeParis, eyebrow: s1Eyebrow, title: s1Title, accent: s1Accent, colorEyebrow: c1e, colorTitle: c1t, colorAccent: c1a, sizeEyebrow: sz1e, sizeTitle: sz1t },
    { image: null, picture: picAffaires, eyebrow, title: heroTitleLine1, accent: heroTitleLine2, colorEyebrow: c1e, colorTitle: c1t, colorAccent: c1a, sizeEyebrow: sz1e, sizeTitle: sz1t },
    { image: s2Img || null, picture: s2Img ? undefined : picAffaires, eyebrow: s2Eyebrow, title: s2Title, accent: s2Accent, colorEyebrow: c2e, colorTitle: c2t, colorAccent: c2a, sizeEyebrow: sz2e, sizeTitle: sz2t },
    { image: s3Img || null, picture: s3Img ? undefined : picBancaire, eyebrow: s3Eyebrow, title: s3Title, accent: s3Accent, colorEyebrow: c3e, colorTitle: c3t, colorAccent: c3a, sizeEyebrow: sz3e, sizeTitle: sz3t },
    { image: s4Img || null, picture: s4Img ? undefined : picSurendettement, eyebrow: s4Eyebrow, title: s4Title, accent: s4Accent, colorEyebrow: c4e, colorTitle: c4t, colorAccent: c4a, sizeEyebrow: sz4e, sizeTitle: sz4t },
    { image: s5Img || null, picture: s5Img ? undefined : picOhada, eyebrow: s5Eyebrow, title: s5Title, accent: s5Accent, colorEyebrow: c5e, colorTitle: c5t, colorAccent: c5a, sizeEyebrow: sz5e, sizeTitle: sz5t },
    { image: s6Img || null, picture: s6Img ? undefined : picImmobilier, eyebrow: s6Eyebrow, title: s6Title, accent: s6Accent, colorEyebrow: c6e, colorTitle: c6t, colorAccent: c6a, sizeEyebrow: sz6e, sizeTitle: sz6t },
    { image: s7Img || null, picture: s7Img ? undefined : picPenal, eyebrow: s7Eyebrow, title: s7Title, accent: s7Accent, colorEyebrow: c7e, colorTitle: c7t, colorAccent: c7a, sizeEyebrow: sz7e, sizeTitle: sz7t },
    { image: s8Img || null, picture: s8Img ? undefined : picEtrangers, eyebrow: s8Eyebrow, title: s8Title, accent: s8Accent, colorEyebrow: c8e, colorTitle: c8t, colorAccent: c8a, sizeEyebrow: sz8e, sizeTitle: sz8t },
    { image: s9Img || null, picture: s9Img ? undefined : picPetrolier, eyebrow: s9Eyebrow, title: s9Title, accent: s9Accent, colorEyebrow: c9e, colorTitle: c9t, colorAccent: c9a, sizeEyebrow: sz9e, sizeTitle: sz9t },
  ];

  const handleEnded = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.pause();
      if (Number.isFinite(v.duration)) {
        v.currentTime = Math.max(0, v.duration - 0.05);
      }
    } catch {
      /* noop */
    }
    setOverlayOpacity(OVERLAY_MIN);
    setVideoEnded(true);
  };

  // Detect reduced motion / save-data: in that case, skip the video entirely
  // and reveal the carousel right away.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn: any = (navigator as any).connection;
    const saveData = !!conn?.saveData;
    if (mql.matches || saveData) {
      setSkipVideo(true);
      setOverlayOpacity(OVERLAY_MIN);
      setVideoEnded(true);
    }
  }, []);

  // Préchargement progressif : on bascule de "metadata" à "auto" dès que
  // le Hero est proche du viewport (rootMargin large pour anticiper).
  // Sur la home, le Hero est déjà visible → bascule quasi-immédiate sans
  // bloquer le rendu initial. Sur d'autres pages où ce composant serait
  // monté plus bas, l'IO évite tout téléchargement inutile.
  useEffect(() => {
    if (skipVideo) return;
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVideoPreload("auto");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVideoPreload("auto");
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skipVideo]);


  useEffect(() => {
    if (skipVideo) return;
    const v = videoRef.current;
    if (!v) return;

    let fadeStart = Number.POSITIVE_INFINITY;
    let fadeEnd = Number.POSITIVE_INFINITY;

    const computeWindow = () => {
      if (!Number.isFinite(v.duration) || v.duration <= 0) return;
      fadeEnd = v.duration;
      fadeStart = Math.max(0, fadeEnd - FADE_DURATION);
    };

    const onTime = () => {
      if (!Number.isFinite(fadeStart)) return;
      const t = v.currentTime;
      if (t <= fadeStart) {
        setOverlayOpacity(1);
      } else {
        const k = Math.min(1, (t - fadeStart) / (fadeEnd - fadeStart));
        setOverlayOpacity(1 - (1 - OVERLAY_MIN) * k);
      }
    };

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => { /* noop */ });
    };

    if (v.readyState >= 1) computeWindow();
    v.addEventListener("loadedmetadata", computeWindow);
    v.addEventListener("durationchange", computeWindow);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("canplay", tryPlay);
    tryPlay();

    return () => {
      v.removeEventListener("loadedmetadata", computeWindow);
      v.removeEventListener("durationchange", computeWindow);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("canplay", tryPlay);
    };
  }, [skipVideo]);

  // Carrousel : démarre une fois la vidéo terminée, change de slide toutes les 5s.
  useEffect(() => {
    if (!videoEnded) return;
    const id = window.setInterval(() => {
      setActiveSlide((s) => (s + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [videoEnded, slides.length]);

  // Message de bienvenue retiré : le carrousel apparaît directement après l'animation d'encre.

  const current = slides[activeSlide];

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0">
        {customHeroImage && (
          <img
            src={customHeroImage}
            alt="Maître ROGER VANGAH — CABINET ROGER VANGAH"
            className="h-full w-full object-cover"
            loading="eager"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...({ fetchpriority: "high" } as any)}
          />
        )}

        {/* Carrousel d'images en arrière-plan (visible après la vidéo). */}
        {slides.map((s, i) => {
          const visible = videoEnded && i === activeSlide;
          const wrapperClass =
            "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out";
          const wrapperStyle = { opacity: visible ? 1 : 0 } as const;
          if (s.picture) {
            return (
              <div key={`pic-${i}`} className={wrapperClass} style={wrapperStyle} aria-hidden="true">
                <ResponsiveImage
                  data={s.picture}
                  alt=""
                  sizes="100vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  {...({ fetchPriority: i === 0 ? "high" : "low" } as any)}
                  className="absolute inset-0 h-full w-full object-cover [filter:saturate(1.08)_contrast(1.05)] [image-rendering:auto]"
                  pictureClassName="absolute inset-0 h-full w-full"
                />
              </div>
            );
          }
          return (
            <img
              key={`${s.image}-${i}`}
              src={s.image ?? undefined}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...({ fetchpriority: i === 0 ? "high" : "low" } as any)}
              className={`${wrapperClass} object-cover [filter:saturate(1.08)_contrast(1.05)]`}
              style={wrapperStyle}
            />
          );
        })}

        {/* Vidéo d'encre — retournée verticalement (scaleY(-1)) : l'encre
            qui se déploie depuis le bas dans la source apparaît désormais
            depuis le haut. À la fin, elle s'évacue vers le bas. */}
        {!skipVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden will-change-transform"
            style={{
              opacity: videoEnded ? 0 : 1,
              transform: videoEnded
                ? "scaleY(-1) translateY(-100%)"
                : "scaleY(-1) translateY(0)",
              transition:
                "transform 1400ms cubic-bezier(0.65, 0, 0.35, 1), opacity 1200ms ease-out",
            }}
            autoPlay
            muted
            playsInline
            preload={videoPreload}
            poster={heroInkPoster}
            onEnded={handleEnded}
            aria-hidden="true"
          >
            <source src={heroInkMobile} type="video/mp4" media="(max-width: 767px)" />
            <source src={heroInkDesktop} type="video/mp4" />
          </video>
        )}

        {/* Voile sombre supprimé : aucune ombre/overlay sur le hero. */}

        {/* Filigrane central : balance de la justice + emblème RV.
            Masqué tant que l'animation d'encre n'est pas terminée pour
            laisser la vidéo passer en premier sans interférence. */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-[1] transition-opacity duration-1000 ease-out"
          style={{ opacity: videoEnded ? 1 : 0 }}
          aria-hidden="true"
        >
          <div className="relative flex items-center justify-center">
            {/* Halo doré subtil */}
            <div
              className="absolute w-[70vmin] max-w-[680px] aspect-square rounded-full opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--accent) / 0.35) 0%, hsl(var(--accent) / 0.08) 45%, transparent 70%)",
              }}
            />
            {/* Balance de la justice premium */}
            <div
              className="absolute w-[82vmin] max-w-[820px] aspect-square text-accent opacity-[0.09] animate-[float_8s_ease-in-out_infinite]"
              style={{
                WebkitMaskImage: `url(${scaleOfJustice})`,
                maskImage: `url(${scaleOfJustice})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                background:
                  "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(45 85% 65%) 35%, hsl(var(--accent)) 60%, hsl(38 70% 45%) 100%)",
              }}
            />
            {/* Emblème RV transparent au centre */}
            <img
              src={rvEmblem}
              alt=""
              loading="eager"
              width={1024}
              height={1024}
              className="relative w-[22vmin] max-w-[200px] h-auto opacity-90"
            />
          </div>
        </div>
      </div>

      <div className="container-luxe relative z-10 pt-28 pb-20">
        <div key={activeSlide} className="max-w-3xl">
          <p className={`eyebrow mt-12 animate-fade-in whitespace-pre-line font-bold ${EYEBROW_SIZE_CLASS[current.sizeEyebrow]}`} style={{ color: current.colorEyebrow }}>{current.eyebrow}</p>
          <h1 className={`mt-6 font-serif leading-[1.05] animate-fade-up ${TITLE_SIZE_CLASS[current.sizeTitle]}`} style={{ color: current.colorTitle }}>
            {current.title}
            {current.accent ? (<><br /><span style={{ color: current.colorAccent }}>{current.accent}</span></>) : null}
          </h1>
        </div>

        {/* Indicateurs du carrousel masqués. */}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
      </div>
    </section>
  );
};
