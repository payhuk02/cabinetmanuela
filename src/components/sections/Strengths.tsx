import { Globe, Target, UserCheck, ShieldCheck } from "lucide-react";
import { useText } from "@/hooks/useText";
import { useLang } from "@/i18n/LanguageContext";

const ICONS = [Globe, Target, UserCheck, ShieldCheck];

export const Strengths = () => {
  const { lang } = useLang();

  const eyebrow = useText(
    "strengths.eyebrow",
    lang === "fr" ? "Points forts" : "Key strengths"
  );
  const title = useText(
    "strengths.title",
    lang === "fr" ? "Pourquoi nous choisir." : "Why choose us."
  );

  const items = [
    {
      title: useText(
        "strengths.1.title",
        lang === "fr" ? "Expertise franco-africaine" : "Franco-African expertise"
      ),
      desc: useText(
        "strengths.1.desc",
        lang === "fr"
          ? "Une double culture juridique au service de dossiers transnationaux."
          : "A dual legal culture serving cross-border matters."
      ),
    },
    {
      title: useText(
        "strengths.2.title",
        lang === "fr" ? "Approche stratégique" : "Strategic approach"
      ),
      desc: useText(
        "strengths.2.desc",
        lang === "fr"
          ? "Une analyse fine pour orienter chaque décision avec efficacité."
          : "Sharp analysis to drive every decision effectively."
      ),
    },
    {
      title: useText(
        "strengths.3.title",
        lang === "fr" ? "Accompagnement sur mesure" : "Tailored support"
      ),
      desc: useText(
        "strengths.3.desc",
        lang === "fr"
          ? "Des solutions adaptées aux réalités de chaque client."
          : "Solutions tailored to each client's reality."
      ),
    },
    {
      title: useText(
        "strengths.4.title",
        lang === "fr" ? "Rigueur et engagement" : "Rigour and commitment"
      ),
      desc: useText(
        "strengths.4.desc",
        lang === "fr"
          ? "Une exigence absolue dans la défense de vos intérêts."
          : "Absolute rigour in defending your interests."
      ),
    },
  ];

  return (
    <section
      id="strengths"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-primary via-primary to-[hsl(var(--primary))]"
    >
      {/* Premium decorative background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--accent)) 0, transparent 40%), radial-gradient(circle at 80% 80%, hsl(var(--accent)) 0, transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--accent) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="container-luxe relative">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h2 className="mt-6 font-serif font-bold text-4xl md:text-5xl text-primary-foreground leading-[1.1]">
            {title}
          </h2>
          <div className="mt-6 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ title: itemTitle, desc }, idx) => {
            const Icon = ICONS[idx];
            return (
              <div
                key={itemTitle}
                className="group relative p-[1px] bg-gradient-to-b from-accent/40 via-accent/10 to-transparent transition-all duration-500 hover:from-accent hover:via-accent/40 hover:-translate-y-1"
              >
                <div className="relative h-full bg-gradient-to-b from-[hsl(var(--primary)/0.85)] to-[hsl(var(--primary)/0.6)] backdrop-blur-sm p-8 flex flex-col items-center text-center transition-colors duration-500 group-hover:from-[hsl(var(--primary)/0.95)]">
                  {/* Subtle glow */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, hsl(var(--accent) / 0.18), transparent 60%)",
                    }}
                  />

                  <h3 className="relative font-serif font-bold text-xl text-primary-foreground tracking-tight">
                    {itemTitle}
                  </h3>

                  <div className="relative mt-5 h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/40 shadow-[0_0_24px_-8px_hsl(var(--accent)/0.6)] group-hover:from-accent group-hover:to-accent/80 group-hover:border-accent transition-all duration-500">
                    <Icon
                      className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>

                  <p className="relative mt-5 text-sm text-primary-foreground/75 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
