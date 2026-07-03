#!/usr/bin/env node
/**
 * Vérifie que le bundle de production contient bien :
 *  - Hero homepage : `autoPlay` + (`playsInline` OU `muted`) sur la vidéo d'encre
 *  - Pages Équipe / Expertises / Actualités / Contact :
 *    présence de l'asset hero attendu (hero-team / hero-expertises /
 *    hero-news / hero-contact) servi via le pipeline responsive
 *    (AVIF/WebP/JPG multi-résolutions) avec un rendu net `object-cover`.
 *
 * Échoue avec exit code 1 si une vérification ne passe pas.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = join(process.cwd(), "dist", "assets");

if (!existsSync(DIST)) {
  console.error(`✗ dist/assets introuvable — lance \`vite build\` d'abord.`);
  process.exit(1);
}

const files = readdirSync(DIST);

const loadBundle = (prefix) => {
  const f = files.find((n) => n.startsWith(`${prefix}-`) && n.endsWith(".js"));
  if (!f) throw new Error(`Bundle ${prefix}-*.js introuvable dans dist/assets`);
  return { name: f, content: readFileSync(join(DIST, f), "utf8") };
};

/**
 * Vérifie que l'asset hero attendu est bien référencé dans le bundle de la
 * page (preuve qu'il est embarqué et servi), et qu'une className `object-cover`
 * sur un conteneur plein-écran est présente (preuve d'un hero net en background).
 */
const checkPageHero = ({ label, prefix, assetPrefix }) => {
  const { name, content } = loadBundle(prefix);

  // 1. Conteneur plein-écran avec image nette (object-cover)
  const heroClassRegex = /"[^"]*absolute inset-0[^"]*object-cover[^"]*"/;
  const hasHeroClass = heroClassRegex.test(content);

  // 2. asset hero spécifique à la page (jpg/webp/avif via ?responsive)
  const assetRegex = new RegExp(`${assetPrefix}-[A-Za-z0-9_-]+\\.(jpg|jpeg|png|webp|avif)`);
  const hasAsset = assetRegex.test(content);

  if (hasHeroClass && hasAsset) {
    console.log(`✓ ${label}  (${name})`);
    return true;
  }
  if (!hasHeroClass) {
    console.error(`✗ ${label} — className "absolute inset-0 ... object-cover" introuvable dans ${name}`);
  }
  if (!hasAsset) {
    console.error(`✗ ${label} — asset ${assetPrefix}-*.{jpg,webp,avif} introuvable dans ${name}`);
  }
  return false;
};

const checkHeroVideo = () => {
  const { name, content } = loadBundle("index");
  const hasAutoPlay = /\bautoPlay\b/.test(content);
  // Le composant <video> doit aussi avoir au moins une de ces props
  // critiques pour démarrer en autoplay sur mobile / sans son.
  const hasMuted = /\bmuted\b/.test(content);
  const hasPlaysInline = /\bplaysInline\b/.test(content);

  const ok = hasAutoPlay && (hasMuted || hasPlaysInline);
  if (ok) {
    const extra = [hasMuted && "muted", hasPlaysInline && "playsInline"].filter(Boolean).join(" + ");
    console.log(`✓ Hero homepage : autoPlay + ${extra} présents  (${name})`);
    return true;
  }
  if (!hasAutoPlay) console.error(`✗ Hero homepage — \`autoPlay\` absent de ${name}`);
  if (!hasMuted && !hasPlaysInline)
    console.error(`✗ Hero homepage — ni \`muted\` ni \`playsInline\` présents dans ${name}`);
  return false;
};

const results = [
  checkHeroVideo(),
  checkPageHero({ label: "Page Équipe — hero net + image responsive",       prefix: "Equipe",     assetPrefix: "hero-team" }),
  checkPageHero({ label: "Page Expertises — hero net + image responsive",   prefix: "Expertises", assetPrefix: "hero-expertises" }),
  checkPageHero({ label: "Page Actualités — hero net + image responsive",   prefix: "Actualites", assetPrefix: "hero-news" }),
  checkPageHero({ label: "Page Contact — hero net + image responsive",      prefix: "Contact",    assetPrefix: "hero-contact" }),
];

const failed = results.filter((r) => !r).length;
if (failed > 0) {
  console.error(`\n${failed} vérification(s) échouée(s).`);
  process.exit(1);
}
console.log(`\n✓ Toutes les vérifications de build sont passées.`);
