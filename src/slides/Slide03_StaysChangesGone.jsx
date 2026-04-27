import { useState } from "react";
import { ShieldCheck, Repeat, X } from "lucide-react";

const translations = {
  en: {
    eyebrow: "Shape of the migration",
    lede: "We keep everything that works well (compatibility).",
    columns: {
      stays: {
        heading: "Stays",
        sub: "Backend pillars are inherited",
        items: [
          "Entra ID / External ID auth",
          "Web roles & table permissions",
          "Web API · /_api/{table}",
          "Cloud Flow triggers · /_api/cloudflow/",
          "Dataverse model & business rules",
          "Hosting · CDN · SSL · scaling",
        ],
      },
      changes: {
        heading: "Changes",
        sub: "The integration points move",
        items: [
          "Routing · server pages → client router",
          "Data · Liquid fetch → Web API calls",
          "Dev loop · deploy/test → local hot reload",
          "Auth check · WPACRs → API table permissions",
          "Tooling · VS Code extension → pac CLI",
        ],
      },
      gone: {
        heading: "Gone",
        sub: "Built-in UI surfaces don't render",
        items: [
          "Liquid templating",
          "OOB Forms (Basic / Advanced / Multistep)",
          "OOB Lists (Entity Lists)",
          "Pages & Style design workspaces",
          "Built-in multilingual system",
          "Default /profile page",
        ],
      },
    },
  },
  fr: {
    eyebrow: "Forme de la migration",
    lede: "On garde tout ce qui fonctionne bien (compatibilité).",
    columns: {
      stays: {
        heading: "Reste",
        sub: "Les piliers backend sont hérités",
        items: [
          "Authentification Entra ID / External ID",
          "Rôles web et permissions de table",
          "Web API · /_api/{table}",
          "Déclencheurs Cloud Flow · /_api/cloudflow/",
          "Modèle Dataverse et règles métier",
          "Hébergement · CDN · SSL · scaling",
        ],
      },
      changes: {
        heading: "Change",
        sub: "Les points d'intégration changent",
        items: [
          "Routage · pages serveur → routeur client",
          "Données · Liquid → appels Web API",
          "Boucle de dev · déploiement → hot reload local",
          "Vérif. d'accès · WPACR → permissions API",
          "Outillage · extension VS Code → pac CLI",
        ],
      },
      gone: {
        heading: "Disparaît",
        sub: "Les surfaces UI intégrées ne s'affichent plus",
        items: [
          "Templates Liquid",
          "Formulaires OOB (Basic / Advanced / Multistep)",
          "Listes OOB (Entity Lists)",
          "Espaces de design Pages et Style",
          "Système multilingue intégré",
          "Page /profile par défaut",
        ],
      },
    },
  },
};

const LANGS = ["en", "fr"];

export default function Slide03_StaysChangesGone() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-neutral-900">
      {/* Top strip: eyebrow + lang toggle */}
      <header className="px-16 pt-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
          <span className="text-sm tracking-[0.2em] uppercase text-neutral-500">
            {t.eyebrow}
          </span>
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col px-16 pt-8 pb-2 gap-10">
        {/* Lede */}
        <p className="text-[26px] leading-[1.3] font-light text-neutral-800 max-w-[1400px]">
          {t.lede}
        </p>

        {/* 3-column comparison */}
        <div className="grid grid-cols-3 gap-10 flex-1">
          <Column
            kind="stays"
            icon={ShieldCheck}
            heading={t.columns.stays.heading}
            sub={t.columns.stays.sub}
            items={t.columns.stays.items}
          />
          <Column
            kind="changes"
            icon={Repeat}
            heading={t.columns.changes.heading}
            sub={t.columns.changes.sub}
            items={t.columns.changes.items}
          />
          <Column
            kind="gone"
            icon={X}
            heading={t.columns.gone.heading}
            sub={t.columns.gone.sub}
            items={t.columns.gone.items}
          />
        </div>
      </main>

      {/* Reserved footer space (intentionally empty) */}
      <footer className="h-20" aria-hidden="true" />
    </div>
  );
}

/* ---------- helpers ---------- */

function Column({ kind, icon: Icon, heading, sub, items }) {
  // visual treatment per column
  const styles = {
    stays: {
      card: "bg-brand/[0.04] border-brand/30",
      iconWrap: "bg-brand/15 text-brand",
      heading: "text-neutral-900",
      sub: "text-brand/80",
      bullet: "bg-brand",
      item: "text-neutral-800",
    },
    changes: {
      card: "bg-neutral-50 border-neutral-300",
      iconWrap: "bg-white text-neutral-600 border border-neutral-200",
      heading: "text-neutral-900",
      sub: "text-neutral-500",
      bullet: "bg-neutral-400",
      item: "text-neutral-700",
    },
    gone: {
      card: "bg-white border-neutral-200 border-dashed",
      iconWrap: "bg-neutral-100 text-neutral-400",
      heading: "text-neutral-500",
      sub: "text-neutral-400",
      bullet: "bg-neutral-300",
      item: "text-neutral-400 line-through decoration-neutral-300",
    },
  }[kind];

  return (
    <div className={`border rounded-2xl px-7 py-7 flex flex-col gap-6 ${styles.card}`}>
      <div className="flex items-center gap-4">
        <span
          className={`flex-none w-11 h-11 rounded-xl flex items-center justify-center ${styles.iconWrap}`}
        >
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <div className="flex flex-col">
          <span className={`text-[18px] font-medium leading-tight ${styles.heading}`}>
            {heading}
          </span>
          <span className={`text-[11px] tracking-[0.22em] uppercase mt-1.5 ${styles.sub}`}>
            {sub}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {items.map((text, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-[9px] flex-none w-1.5 h-1.5 rounded-full ${styles.bullet}`}
            />
            <span className={`text-[15px] leading-[1.5] ${styles.item}`}>
              {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="flex items-center gap-2 text-[13px] tracking-[0.2em] uppercase">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-neutral-300">·</span>}
          <button
            onClick={() => setLang(l)}
            className={
              lang === l
                ? "text-brand font-medium"
                : "text-neutral-400 hover:text-neutral-700 transition-colors"
            }
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
