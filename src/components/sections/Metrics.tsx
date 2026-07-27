import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";

const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(from, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));
  
  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, spring, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

export const Metrics = () => {
  const { lang } = useLang();
  
  const metrics = [
    { value: 15, suffix: "+", label: lang === "fr" ? "Années d'expérience" : "Years of Experience" },
    { value: 800, suffix: "+", label: lang === "fr" ? "Dossiers Plaidés" : "Cases Argued" },
    { value: 95, suffix: "%", label: lang === "fr" ? "Clients Satisfaits" : "Satisfied Clients" },
    { value: 3, suffix: "", label: lang === "fr" ? "Langues Parlées" : "Spoken Languages" },
  ];

  return (
    <section className="py-24 bg-night text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-night to-night opacity-60" />
      <div className="container-luxe relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-4 font-bold tracking-tight">
                <Counter to={metric.value} />
                <span className="text-primary group-hover:text-white transition-colors duration-500">{metric.suffix}</span>
              </div>
              <p className="text-xs md:text-sm text-primary-foreground/70 uppercase tracking-[0.2em] font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
