import { useState } from "react";
import {
  ServerCog,
  Wrench,
  AlertTriangle,
} from "lucide-react";

const translations = {
  en: {
    eyebrow: "Improvements and trade-offs",
    gainsHeading: "Concrete wins",
    gains: [
      {
        title: "Server Logic",
        sub: "GA April 2026",
        body: "Server-side JS endpoints on the Power Pages runtime. Secure API keys, server-side validation, external calls, Dataverse actions.",
      },
      {
        title: "Stack stays our choice",
        sub: "React · Vue · Angular · whichever fits",
        body: "The platform just hosts the compiled assets. The team picks the framework, bundler and testing tools, and can swap them later. No lock-in to a portal-specific way of working.",
      },
    ],
    tradeoffsHeading: "Trade-offs",
    tradeoffs: [
      {
        title: "No visual editor",
        body: "Pages and Style workspaces are disabled. Everything is code.",
      },
      {
        title: "SEO needs work",
        body: "Client-rendered. Meta tags via react-helmet; not for content sites.",
      },
      {
        title: "No PP Git integration",
        body: "Source lives in our repo. CI runs pac pages upload-code-site.",
      },
    ],
  },
  fr: {
    eyebrow: "Améliorations et compromis",
    gainsHeading: "Gains concrets",
    gains: [
      {
        title: "Server Logic",
        sub: "GA avril 2026",
        body: "Endpoints JS côté serveur sur le runtime Power Pages. Clés d'API sécurisées, validation côté serveur, appels externes, actions Dataverse.",
      },
      {
        title: "Le stack reste notre choix",
        sub: "React · Vue · Angular · selon le besoin",
        body: "La plateforme héberge les assets compilés. L'équipe choisit le framework, le bundler et les outils de test, et peut en changer plus tard. Pas de verrouillage dans une approche propre au portail.",
      },
    ],
    tradeoffsHeading: "Compromis",
    tradeoffs: [
      {
        title: "Pas d'éditeur visuel",
        body: "Les espaces Pages et Style sont désactivés. Tout est en code.",
      },
      {
        title: "Le SEO demande du travail",
        body: "Rendu client. Méta-tags via react-helmet ; pas pour un site de contenu.",
      },
      {
        title: "Pas d'intégration Git PP",
        body: "Le code vit dans notre dépôt. La CI exécute pac pages upload-code-site.",
      },
    ],
  },
};

const LANGS = ["en", "fr"];

const GAIN_ICONS = [ServerCog, Wrench];

export default function Slide04_WhatWeGetBack() {
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
        {/* Gains row */}
        <div className="flex flex-col gap-4">
          <SectionLabel text={t.gainsHeading} />
          <div className="grid grid-cols-2 gap-8">
            {t.gains.map((g, i) => (
              <GainCard key={i} icon={GAIN_ICONS[i]} {...g} />
            ))}
          </div>
        </div>

        {/* Trade-offs row */}
        <div className="flex flex-col gap-4 mt-2">
          <SectionLabel text={t.tradeoffsHeading} muted />
          <div className="grid grid-cols-3 gap-8">
            {t.tradeoffs.map((tr, i) => (
              <TradeoffItem key={i} {...tr} />
            ))}
          </div>
        </div>
      </main>

      {/* Reserved footer space (intentionally empty) */}
      <footer className="h-20" aria-hidden="true" />
    </div>
  );
}

/* ---------- helpers ---------- */

function SectionLabel({ text, muted = false }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full ${muted ? "bg-neutral-300" : "bg-brand"}`}
      />
      <span
        className={`text-[11px] tracking-[0.25em] uppercase ${muted ? "text-neutral-400" : "text-brand/80"}`}
      >
        {text}
      </span>
    </div>
  );
}

function GainCard({ icon: Icon, title, sub, body }) {
  return (
    <div className="bg-brand/[0.04] border border-brand/30 rounded-2xl px-7 py-7 flex flex-col gap-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <span className="flex-none w-11 h-11 rounded-xl bg-brand/15 text-brand flex items-center justify-center">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col">
        <span className="text-[20px] font-medium leading-tight text-neutral-900">
          {title}
        </span>
        <span className="text-[11px] tracking-[0.22em] uppercase text-brand/80 mt-1.5">
          {sub}
        </span>
      </div>
      <p className="text-[14px] leading-[1.55] text-neutral-700">{body}</p>
    </div>
  );
}

function TradeoffItem({ title, body }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="mt-[3px] flex-none w-6 h-6 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center">
        <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
      </span>
      <div className="flex flex-col">
        <span className="text-[14px] font-medium text-neutral-700 leading-snug">
          {title}
        </span>
        <span className="text-[13px] text-neutral-500 leading-relaxed mt-0.5">
          {body}
        </span>
      </div>
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
