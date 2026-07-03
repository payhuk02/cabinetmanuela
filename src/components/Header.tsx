import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useText } from "@/hooks/useText";
import { LangSwitcher } from "./LangSwitcher";
import logoDarkDefault from "@/assets/logo-roger-vangah-white.webp";
import logoLightDefault from "@/assets/logo-roger-vangah-light-transparent.webp";
import logoRvAvocat from "@/assets/logo-rv-avocat-white.webp";
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
    { href: "/", label: navHome },
    { href: "/cabinet", label: navAbout },
    { href: "/expertises", label: navPractice },
    { href: "/equipe", label: navTeam },
    { href: lang === "en" ? "/news" : "/actualites", label: navNews },
    { href: "/contact", label: navContact },
    { href: "/carte", label: navCard },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-shadow duration-300 bg-background ${
        scrolled ? "shadow-soft" : "shadow-sm"
      }`}
    >
      <div className="container-luxe flex h-16 md:h-20 items-center gap-3 xl:gap-6">
        <a href="/" className="flex items-center gap-2 md:gap-3 group min-w-0 shrink-0" aria-label="ROGER VANGAH — Retour à l'accueil">
          <img
            src={logoRvAvocat}
            alt="RV Avocat"
            className="h-6 md:h-7 w-auto shrink-0"
          />
          <img
            src={logoDark}
            alt="CABINET ROGER VANGAH"
            className="h-5 md:h-7 xl:h-8 w-auto shrink-0"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 ml-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-[13px] xl:text-sm font-semibold tracking-wide text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0">
          <LangSwitcher />
          <AppointmentButton
            size="sm"
            showIcon={false}
            label={navAppointment}
            className="text-[11px] xl:text-xs px-4 xl:px-6"
          />
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-primary shrink-0 ml-auto"
          onClick={() => setOpen(true)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-night text-primary-foreground animate-fade-in lg:hidden overflow-y-auto">
          <div className="container-luxe flex h-16 md:h-20 items-center justify-between">
            <img src={logoLight} alt="ROGER VANGAH" className="h-10 md:h-12 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 -mr-2">
              <X size={24} />
            </button>
          </div>
          <nav className="container-luxe flex flex-col gap-5 mt-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl sm:text-3xl hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8">
              <LangSwitcher variant="dark" />
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
