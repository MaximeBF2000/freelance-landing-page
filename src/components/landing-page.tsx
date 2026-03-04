import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Github,
  Layers,
  Rocket,
  Search,
  ShieldCheck
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/i18n";
import { LandingAnimations } from "@/components/landing-animations";

type LandingPageProps = {
  locale: Locale;
  availabilityLabel: string;
};

export function LandingPage({ locale, availabilityLabel }: LandingPageProps) {
  const t = getTranslator(locale);

  return (
    <>
      <LandingAnimations />

      <div className="hero-bg-container">
        <div className="dot-grid" />
        <div className="blob -top-48 -left-24 h-[600px] w-[600px] animate-pulse bg-blue-200" />
        <div
          className="blob top-0 -right-24 h-[500px] w-[500px] animate-bounce bg-indigo-100"
          style={{ animationDuration: "10s" }}
        />
      </div>

      <nav className="glass-nav sticky top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-2 text-xl font-black tracking-tighter">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white shadow-lg shadow-blue-200">
              M
            </div>
            <span className="hidden md:inline">MAXIME FERRET</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-extrabold text-slate-500 md:flex">
            <a href="#services" className="transition-colors hover:text-blue-600">
              {t({ en: "Services", fr: "Services" })}
            </a>
            <a href="#process" className="transition-colors hover:text-blue-600">
              {t({ en: "Method", fr: "Méthode" })}
            </a>
            <a href="#projects" className="transition-colors hover:text-blue-600">
              {t({ en: "Case Studies", fr: "Cas concrets" })}
            </a>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 text-[10px] font-black shadow-sm">
              <Link
                href="/en"
                className={`cursor-pointer transition-opacity ${
                  locale === "en" ? "text-blue-600" : "opacity-40 hover:opacity-100"
                }`}
              >
                🇺🇸 <span className="hidden md:ml-1 md:inline">EN</span>
              </Link>
              <span className="h-3 w-px bg-slate-200" />
              <Link
                href="/fr"
                className={`cursor-pointer transition-opacity ${
                  locale === "fr" ? "text-blue-600" : "opacity-40 hover:opacity-100"
                }`}
              >
                🇫🇷 <span className="hidden md:ml-1 md:inline">FR</span>
              </Link>
            </div>

            <a
              href="https://calendly.com/maximeferret/echange"
              target="_blank"
              className="rounded-full bg-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-xl shadow-blue-100 transition-all hover:bg-blue-700 sm:text-sm md:px-5 md:py-2.5 md:text-sm"
              rel="noreferrer"
            >
              {t({ en: "Book a call", fr: "Réserver un appel" })}
            </a>
          </div>
        </div>
      </nav>

      <section id="home" className="relative px-6 pt-24 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/50 px-4 py-1.5 text-[11px] font-black tracking-widest text-blue-700 shadow-sm">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            {availabilityLabel}
          </div>

          <h1 className="reveal mb-8 text-4xl leading-[1.05] font-[900] tracking-tight text-slate-900 sm:text-5xl md:text-8xl">
            {t({ en: "SMEs: Save ", fr: "PME : Gagnez " })}
            <span className="text-blue-600">{t({ en: "20 hours per week", fr: "20h par semaine" })}</span>.
          </h1>

          <p className="reveal mx-auto mb-12 max-w-2xl text-base leading-relaxed font-semibold text-slate-600 sm:text-lg md:text-2xl">
            {t({
              en: "Software engineer, I automate your time-consuming processes to transform your manual tasks into ",
              fr: "Développeur logiciel, j'automatise vos processus chronophages pour transformer vos tâches manuelles en "
            })}
            <span className="font-extrabold text-slate-900">
              {t({ en: "autonomous AI-driven systems.", fr: "systèmes autonomes pilotés par l'IA." })}
            </span>
          </p>

          <div className="reveal flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://calendly.com/maximeferret/echange"
              target="_blank"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-base font-black text-white shadow-2xl shadow-slate-300 transition-all active:scale-95 hover:bg-blue-800 sm:w-auto sm:text-lg md:px-10 md:py-5 md:text-lg"
              rel="noreferrer"
            >
              {t({ en: "Start the audit", fr: "Lancer l'audit" })} <ArrowRight className="h-6 w-6" />
            </a>

            <a
              href="https://github.com/MaximeBF2000"
              target="_blank"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 py-4 font-extrabold text-slate-700 shadow-sm transition-all hover:bg-slate-50 sm:w-auto md:px-10 md:py-5"
              rel="noreferrer"
            >
              <Github className="h-6 w-6" /> {t({ en: "150+ GitHub projects", fr: "+150 projets Github" })}
            </a>
          </div>

          <div className="reveal mt-20 flex justify-center">
            <div className="group relative">
              <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
              <img
                src="/assets/profil-pic.png"
                alt="Maxime Ferret"
                className="relative h-40 w-40 -rotate-2 rounded-[2.5rem] border-8 border-white object-cover shadow-2xl transition-transform duration-700 group-hover:rotate-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 pt-32 pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="reveal bento-card scale-card relative flex flex-col justify-center overflow-hidden rounded-[3.5rem] bg-white p-8 md:col-span-2 md:p-16">
            <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />
            <h2 className="mb-8 text-4xl leading-tight font-[900] tracking-tight text-slate-900">
              {t({ en: "Less friction, clearer decisions.", fr: "Moins de friction, plus de décisions claires." })}
            </h2>
            <p className="relative z-10 max-w-xl text-base leading-relaxed font-semibold text-slate-600 sm:text-lg md:text-xl">
              {t({
                en: "For 90% of SMEs, internal tools and processes become a bottleneck. I step in to ",
                fr: "Pour 90% des PME, les outils et process internes deviennent un frein. J'interviens pour "
              })}
              <span className="font-extrabold text-blue-600">
                {t({ en: "structure and automate your workflows", fr: "structurer et automatiser vos flux" })}
              </span>
              . {t({ en: "See results within the first days.", fr: "Voyez les changements dès les premiers jours." })}
            </p>
          </div>

          <div className="bento-card scale-card rounded-[3.5rem] border-none !bg-blue-600 p-8 text-white shadow-2xl shadow-blue-200 md:p-14">
            <h3 className="mb-10 flex items-center gap-3 text-xl font-black tracking-widest text-blue-100 uppercase">
              <ShieldCheck /> {t({ en: "Expertise", fr: "Expertise" })}
            </h3>
            <ul className="space-y-6 text-base font-extrabold text-white">
              {[
                t({ en: "Custom web apps", fr: "Apps web sur mesure" }),
                t({ en: "Internal business tools", fr: "Outils métiers internes" }),
                t({ en: "Hybrid Code / No-Code", fr: "Hybride Code / No-Code" }),
                t({ en: "AI Agents & RAG", fr: "Agents IA & RAG" })
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <Check className="h-6 w-6 rounded-full bg-white/20 p-1" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-32">
        <div className="reveal mb-20 text-center">
          <h2 className="mb-4 text-xs font-black tracking-[0.3em] text-blue-600 uppercase">Process</h2>
          <p className="text-5xl font-[900] tracking-tight text-slate-900">
            {t({ en: "Immediate impact.", fr: "Impact immédiat." })}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="reveal bento-card scale-card rounded-[3rem] bg-white p-8 md:p-12">
            <div className="mb-10 w-fit rounded-[1.5rem] bg-amber-50 p-5 text-amber-600 shadow-sm">
              <Search className="h-8 w-8" />
            </div>
            <h4 className="mb-4 text-2xl font-black tracking-tight">
              {t({ en: "1. Express Audit", fr: "1. Audit Express" })}
            </h4>
            <p className="text-base leading-relaxed font-semibold italic text-slate-500 md:text-lg">
              {t({
                en: "Complete mapping of your processes to isolate high-ROI productivity gains.",
                fr: "Cartographie complète de vos processus pour isoler les gains de productivité à fort ROI."
              })}
            </p>
          </div>

          <div className="reveal bento-card scale-card rounded-[3rem] bg-white p-8 md:p-12">
            <div className="mb-10 w-fit rounded-[1.5rem] bg-blue-50 p-5 text-blue-600 shadow-sm">
              <Layers className="h-8 w-8" />
            </div>
            <h4 className="mb-4 text-2xl font-black tracking-tight">
              {t({ en: "2. Custom Build", fr: "2. Build sur mesure" })}
            </h4>
            <p className="text-base leading-relaxed font-semibold italic text-slate-500 md:text-lg">
              {t({
                en: "Development of robust proprietary tools within days.",
                fr: "Développement d'outils propriétaires robustes en quelques jours."
              })}
            </p>
          </div>

          <div className="reveal bento-card scale-card rounded-[3rem] bg-white p-8 md:p-12">
            <div className="mb-10 w-fit rounded-[1.5rem] bg-orange-50 p-5 text-orange-600 shadow-sm">
              <Rocket className="h-8 w-8" />
            </div>
            <h4 className="mb-4 text-2xl font-black tracking-tight">
              {t({ en: "3. Deployment", fr: "3. Mise en place" })}
            </h4>
            <p className="text-base leading-relaxed font-semibold italic text-slate-500 md:text-lg">
              {t({
                en: "Implementation support, internal training, and continuous assistance.",
                fr: "Accompagnement sur la mise en place, formation interne à l'outil et support continu."
              })}
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="border-y border-slate-100 bg-slate-50/50 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-20 text-center">
            <h2 className="mb-4 text-xs font-black tracking-[0.3em] text-blue-600 uppercase">Portfolio</h2>
            <p className="text-5xl font-[900] tracking-tight text-slate-900">
              {t({ en: "Concrete examples", fr: "Exemples concrets" })}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="reveal bento-card scale-card group rounded-[3.5rem] bg-white p-8 md:p-12">
              <span className="mb-8 inline-block rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black tracking-widest text-blue-700 uppercase">
                {t({ en: "Support", fr: "Support" })}
              </span>
              <h4 className="mb-4 text-2xl font-black">{t({ en: "AI Support Assistant", fr: "Assistant support IA" })}</h4>
              <p className="text-base leading-relaxed font-semibold italic text-slate-500">
                {t({
                  en: "Smart knowledge base, sourced automated replies, and dashboard for internal or customer support.",
                  fr: "Base de connaissance intelligente, réponses automatiques sourcées et tableau de bord pour le support interne ou client."
                })}
              </p>
            </div>

            <div className="reveal bento-card scale-card group rounded-[3.5rem] bg-white p-8 md:p-12">
              <span className="mb-8 inline-block rounded-full bg-green-100 px-3 py-1 text-[10px] font-black tracking-widest text-green-700 uppercase">
                {t({ en: "Administration", fr: "Administratif" })}
              </span>
              <h4 className="mb-4 text-2xl font-black">
                {t({ en: "Simplified Back Office", fr: "Back-office simplifié" })}
              </h4>
              <p className="text-base leading-relaxed font-semibold italic text-slate-500">
                {t({
                  en: "Automated document generation, cross-tool data sync, and elimination of manual re-entry.",
                  fr: "Génération automatique de documents, synchronisation de données inter-outils et élimination des ressaisies manuelles."
                })}
              </p>
            </div>

            <div className="reveal bento-card scale-card group rounded-[3.5rem] bg-white p-8 md:p-12">
              <span className="mb-8 inline-block rounded-full bg-purple-100 px-3 py-1 text-[10px] font-black tracking-widest text-purple-700 uppercase">
                {t({ en: "Prospecting", fr: "Prospection" })}
              </span>
              <h4 className="mb-4 text-2xl font-black">{t({ en: "Custom CRM", fr: "CRM sur mesure" })}</h4>
              <p className="text-base leading-relaxed font-semibold italic text-slate-500">
                {t({
                  en: "Full pipeline, data extraction, email automation, and AI integration for lead qualification.",
                  fr: "Pipeline complet, extractions de données, automatisations d'emails et intégration d'IA pour la qualification des prospects."
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-32">
        <div className="reveal relative overflow-hidden rounded-[4rem] bg-slate-900 p-8 text-center shadow-2xl md:p-24">
          <div className="absolute inset-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="relative z-10">
            <h2 className="mb-10 text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-7xl">
              {t({ en: "Ready to free up your time?", fr: "On libère votre temps ?" })}
            </h2>
            <p className="mx-auto mb-14 max-w-2xl text-base leading-relaxed font-semibold text-slate-400 sm:text-lg md:text-xl">
              {t({
                en: "A 20-minute call to estimate your potential gains. Free and no commitment.",
                fr: "Un appel de 20 minutes pour chiffrer votre gain potentiel. Gratuit et sans engagement."
              })}
            </p>
            <a
              href="https://calendly.com/maximeferret/echange"
              target="_blank"
              className="inline-flex items-center gap-4 rounded-[2rem] bg-blue-600 px-8 py-4 text-base font-black text-white shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 hover:bg-blue-500 active:scale-95 sm:text-lg md:px-12 md:py-7 md:text-xl"
              rel="noreferrer"
            >
              {t({ en: "Book my slot", fr: "Réserver mon créneau" })} <Calendar className="h-8 w-8" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center">
        <p className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">
          {t({ en: "© 2026 MAXIME FERRET — SME AUTOMATION", fr: "© 2026 MAXIME FERRET — AUTOMATISATION PME" })}
        </p>
      </footer>
    </>
  );
}
