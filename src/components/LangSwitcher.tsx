import { useLang } from "@/i18n/LanguageContext";

export const LangSwitcher = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  const { lang, setLang } = useLang();
  const base = variant === "dark" ? "text-primary-foreground/80" : "text-foreground/80";
  const active = variant === "dark" ? "text-accent" : "text-accent";

  return (
    <div className={`flex items-center gap-2 text-xs tracking-[0.25em] uppercase ${base}`}>
      <button
        onClick={() => setLang("fr")}
        className={`transition-colors hover:text-accent ${lang === "fr" ? active : ""}`}
        aria-label="Français"
      >
        FR
      </button>
      <span className="opacity-40">/</span>
      <button
        onClick={() => setLang("en")}
        className={`transition-colors hover:text-accent ${lang === "en" ? active : ""}`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
