import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useText } from "@/hooks/useText";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton } from "./MagneticButton";
import logoDarkDefault from "@/assets/logo-manuela-diabate-white.webp";
import logoLightDefault from "@/assets/logo-manuela-diabate-light-transparent.webp";
import logoRvAvocat from "@/assets/logo-md-avocat-white.webp";
import { useLogo } from "@/hooks/useLogos";
import { AppointmentButton } from "@/components/AppointmentButton";

export const Header = () => {
  const { t, lang } = useLang();
  const logoDark = useLogo("logo.header", logoDarkDefault);
  const logoLight = useLogo("logo.footer", logoLightDefault);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navHome = useText("nav.home", t.nav.home);
  const navAbout = useText("nav.about", t.nav.about);
  const navPractice = useText("nav.practice", t.nav.practice);
  const navTeam = useText("nav.team", t.nav.team);
  const navNews = useText("nav.news", t.nav.news);
  const navContact = useText("nav.contact", t.nav.contact);
  const navCard = useText("nav.card", "Carte");
  const navAppointment = useText("nav.appointment", t.nav.appointment);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "ACCUEIL" },
    { href: "/cabinet", label: "LE CABINET" },
    { href: "/expertises", label: "EXPERTISES" },
    { href: lang === "en" ? "/news" : "/actualites", label: "ACTUALITES" },
    { href: "/contact", label: "CONTACTS" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-background/70 backdrop-blur-md shadow-sm border-b border-border/40 py-1" 
          : "bg-transparent py-3"
      }`}
    >
      <div className="container-luxe flex h-16 md:h-18 items-center gap-3 xl:gap-6">
        <a href="/" className="flex items-center gap-2 md:gap-3 group min-w-0 shrink-0" aria-label="Manuela DIABATE — Retour à l'accueil">
          <img
            src={logoRvAvocat}
            alt="RV Avocat"
            className="h-6 md:h-7 w-auto shrink-0 transition-transform group-hover:scale-105"
          />
          <img
            src={logoDark}
            alt="CABINET Manuela DIABATE"
            className="h-5 md:h-7 xl:h-8 w-auto shrink-0 hidden dark:block"
          />
          <img
            src={logoLight}
            alt="CABINET Manuela DIABATE"
            className="h-5 md:h-7 xl:h-8 w-auto shrink-0 dark:hidden"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 ml-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`link-underline text-[13px] xl:text-sm font-semibold tracking-wide hover:text-accent transition-colors whitespace-nowrap ${scrolled ? 'text-foreground' : 'text-primary-foreground dark:text-foreground'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
          <ThemeToggle />
          <LangSwitcher />
          <MagneticButton>
            <AppointmentButton
              size="sm"
              showIcon={false}
              label={navAppointment}
              className="text-[11px] xl:text-xs px-4 xl:px-6 shadow-elegant"
            />
          </MagneticButton>
        </div>

        <button
          className={`lg:hidden p-2 -mr-2 shrink-0 ml-auto ${scrolled ? 'text-foreground' : 'text-primary-foreground dark:text-foreground'}`}
          onClick={() => setOpen(true)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl text-foreground animate-fade-in lg:hidden overflow-y-auto">
          <div className="container-luxe flex h-20 items-center justify-between">
            <img src={logoLight} alt="Manuela DIABATE" className="h-10 md:h-12 w-auto dark:hidden" />
            <img src={logoDark} alt="Manuela DIABATE" className="h-10 md:h-12 w-auto hidden dark:block" />
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 -mr-2 text-foreground">
              <X size={24} />
            </button>
          </div>
          <nav className="container-luxe flex flex-col gap-6 mt-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl sm:text-4xl text-foreground/80 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-12 border-t border-border/20 pt-8">
              <div className="flex gap-4 items-center">
                <ThemeToggle />
                <LangSwitcher variant="dark" />
              </div>
              <div onClick={() => setOpen(false)}>
                <AppointmentButton size="default" showIcon={false} label={navAppointment} />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
