import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Repeat,
  X,
  ServerCog,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import LangToggle from "../components/LangToggle";
import NarrowAccordion from "../components/NarrowAccordion";

const translations = {
  en: {
    eyebrow: "Single page application",
    columns: {
      stays: {
        heading: "Stays",
        items: [
          "Entra ID / External ID auth",
          "Web roles & table permissions",
          "Dataverse model & business rules",
        ],
      },
      changes: {
        heading: "Changes",
        items: [
          "Routing · server pages → client router",
          "Data · Liquid fetch → Web API calls",
        ],
      },
      gone: {
        heading: "Gone",
        items: [
          "Liquid templating",
          "OOTB Forms (Basic / Advanced / Multistep)",
          "OOTB Lists (Entity Lists)",
          "Pages & Style design workspaces",
          "Built-in multilingual system",
          "Default /profile page",
        ],
      },
    },
    gainsHeading: "Improvements",
    gains: [
      {
        title: "Server Logic",
        sub: "GA April 2026",
        body: "Server-side JS endpoints on the Power Pages runtime. Secure API keys, server-side validation, external calls and Dataverse actions.",
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
    eyebrow: "Application single page",
    columns: {
      stays: {
        heading: "Reste",
        items: [
          "Authentification Entra ID / External ID",
          "Rôles web et permissions de table",
          "Modèle Dataverse et règles métier",
        ],
      },
      changes: {
        heading: "Change",
        items: [
          "Routage · pages serveur → routeur client",
          "Données · Liquid → appels Web API",
        ],
      },
      gone: {
        heading: "Disparaît",
        items: [
          "Templates Liquid",
          "Formulaires OOTB (Basic / Advanced / Multistep)",
          "Listes OOTB (Entity Lists)",
          "Espaces de design Pages et Style",
          "Système multilingue intégré",
          "Page /profile par défaut",
        ],
      },
    },
    gainsHeading: "Améliorations",
    gains: [
      {
        title: "Server Logic",
        sub: "GA avril 2026",
        body: "Endpoints JS côté serveur sur le runtime Power Pages. Clés d'API sécurisées, validation côté serveur, appels externes et actions Dataverse.",
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

const GAIN_ICONS = [ServerCog, Wrench];

export default function Slide03_StaysChangesGone({ step = 0, lang = "en", setLang }) {
  const t = translations[lang];
  // step 0 = Stays + Changes alone, centered (instant)
  // step 1 = full layout, with Gone and Trade-offs as 2s skeleton blocks

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-neutral-900 max-[900px]:h-auto">
      {/* Top strip: eyebrow + lang toggle */}
      <header className="px-20 pt-6 flex items-center justify-between max-[900px]:px-4 max-[900px]:pt-12">
        <div className="flex items-center gap-3">
          {t.eyebrow && (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-brand" />
              <span className="text-base tracking-[0.22em] uppercase text-neutral-500">
                {t.eyebrow}
              </span>
            </>
          )}
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </header>

      {/* Body. View Transitions handle the step change: Stays and Changes
          morph from the centered framing into the 3-column grid, and the new
          content (Gone + Improvements + Trade-offs) scrolls up as a unit. */}
      <main className="flex-1 flex flex-col px-20 pt-4 pb-6 gap-6 min-h-0 max-[900px]:px-4 max-[900px]:pt-4 max-[900px]:pb-6 max-[900px]:gap-4">
        {step === 0 ? (
          <CenteredStaysChanges t={t} />
        ) : (
          <FullLayout t={t} />
        )}
      </main>
    </div>
  );
}

/* Step 0: Stays and Changes only, centered as the focus of the slide.
   Cards size to their content rather than stretching, and the row is
   vertically centered in the body so the negative space sits evenly above
   and below. */
function CenteredStaysChanges({ t }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-0">
      <div className="grid grid-cols-2 gap-12 max-w-[1500px] w-full max-[900px]:grid-cols-1 max-[900px]:gap-4">
        <Column
          kind="stays"
          icon={ShieldCheck}
          heading={t.columns.stays.heading}
          items={t.columns.stays.items}
        />
        <Column
          kind="changes"
          icon={Repeat}
          heading={t.columns.changes.heading}
          items={t.columns.changes.items}
        />
      </div>
    </div>
  );
}

/* Step 1: full layout. Stays / Changes / Improvements appear instantly.
   Gone column and Trade-offs section come in as 2-second skeleton blocks.

   The whole layout is wrapped in a single named element so it can scroll up
   from below on entry. The Stays and Changes Columns inside carry their own
   view-transition-names, so they escape this wrapper and morph independently
   from the centered step-0 positions into their grid-cell positions. */
function FullLayout({ t }) {
  return (
    <div
      className="flex-1 flex flex-col gap-10 min-h-0 max-[900px]:gap-4"
      style={{ viewTransitionName: "slide3-content" }}
    >
      <div className="grid grid-cols-3 gap-8 flex-[3] min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-3">
        <Column
          kind="stays"
          icon={ShieldCheck}
          heading={t.columns.stays.heading}
          items={t.columns.stays.items}
        />
        <Column
          kind="changes"
          icon={Repeat}
          heading={t.columns.changes.heading}
          items={t.columns.changes.items}
        />
        <SkeletonBlock duration={2000}>
          <Column
            kind="gone"
            icon={X}
            heading={t.columns.gone.heading}
            items={t.columns.gone.items}
          />
        </SkeletonBlock>
      </div>

      <div className="grid grid-cols-5 gap-8 flex-[2] min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-4">
        <div className="col-span-3 flex flex-col gap-3 min-h-0 max-[900px]:col-span-1">
          <SectionLabel text={t.gainsHeading} />
          <div className="grid grid-cols-2 gap-5 flex-1 min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-3">
            {t.gains.map((g, i) => (
              <GainCard key={i} icon={GAIN_ICONS[i]} {...g} />
            ))}
          </div>
        </div>
        <div className="col-span-2 min-h-0 flex max-[900px]:col-span-1">
          <SkeletonBlock duration={2000} className="flex-1 flex">
            <NarrowAccordion summary={t.tradeoffsHeading} className="flex-1 flex">
              <div className="flex-1 flex flex-col gap-3 min-h-0">
                <SectionLabel text={t.tradeoffsHeading} muted className="max-[900px]:hidden" />
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  {t.tradeoffs.map((tr, i) => (
                    <TradeoffItem key={i} {...tr} />
                  ))}
                </div>
              </div>
            </NarrowAccordion>
          </SkeletonBlock>
        </div>
      </div>
    </div>
  );
}

/* Renders a shimmering placeholder for `duration` ms, then fades in children.
   Lets a section appear as a single loading block instead of per-item flicker. */
function SkeletonBlock({ duration = 2000, className = "", children }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!loaded) {
    return (
      <div
        className={`rounded-2xl animate-shimmer w-full h-full ${className}`}
        aria-hidden="true"
      />
    );
  }
  return <div className={`animate-step-fade-in ${className}`}>{children}</div>;
}

/* ---------- helpers ---------- */

function Column({ kind, icon: Icon, heading, items }) {
  // visual treatment per column
  const styles = {
    stays: {
      card: "bg-brand/[0.04] border-brand/30",
      iconWrap: "bg-brand/15 text-brand",
      heading: "text-neutral-900",
      bullet: "bg-brand",
      item: "text-neutral-800",
    },
    changes: {
      card: "bg-neutral-50 border-neutral-300",
      iconWrap: "bg-white text-neutral-600 border border-neutral-200",
      heading: "text-neutral-900",
      bullet: "bg-neutral-400",
      item: "text-neutral-700",
    },
    gone: {
      card: "bg-white border-neutral-200 border-dashed",
      iconWrap: "bg-neutral-100 text-neutral-400",
      heading: "text-neutral-500",
      bullet: "bg-neutral-300",
      item: "text-neutral-400",
    },
  }[kind];

  // Stays and Changes are paired across step 0 and step 1, so they morph
  // between the centered framing and the grid layout. Gone is unique to
  // step 1 and stays inside slide3-content (which scrolls up).
  const vtName = kind === "gone" ? undefined : `slide3-${kind}-card`;

  return (
    <div
      className={`border rounded-2xl px-7 py-6 flex flex-col gap-5 min-h-0 ${styles.card}`}
      style={vtName ? { viewTransitionName: vtName } : undefined}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex-none w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconWrap}`}
        >
          <Icon className="w-6 h-6" strokeWidth={1.75} />
        </span>
        <span
          className={`text-[26px] font-medium leading-tight ${styles.heading}`}
        >
          {heading}
        </span>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {items.map((text, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-[11px] flex-none w-2 h-2 rounded-full ${styles.bullet}`}
            />
            <span className={`text-[18px] leading-[1.5] ${styles.item}`}>
              {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionLabel({ text, muted = false, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          muted ? "bg-neutral-300" : "bg-brand"
        }`}
      />
      <span
        className={`text-[15px] tracking-[0.22em] uppercase ${
          muted ? "text-neutral-400" : "text-brand/80"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

function GainCard({ icon: Icon, title, sub, body }) {
  return (
    <div className="bg-brand/[0.04] border border-brand/30 rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] min-h-0">
      <div className="flex items-center gap-4">
        <span className="flex-none w-12 h-12 rounded-xl bg-brand/15 text-brand flex items-center justify-center">
          <Icon className="w-6 h-6" strokeWidth={1.75} />
        </span>
        <div className="flex flex-col">
          <span className="text-[22px] font-medium leading-tight text-neutral-900">
            {title}
          </span>
          <span className="text-[13px] tracking-[0.22em] uppercase text-brand/80 mt-1">
            {sub}
          </span>
        </div>
      </div>
      <p className="text-[17px] leading-[1.55] text-neutral-700">{body}</p>
    </div>
  );
}

function TradeoffItem({ title, body }) {
  return (
    <div className="flex gap-4 items-start">
      <span className="mt-[3px] flex-none w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center">
        <AlertTriangle className="w-4 h-4" strokeWidth={2} />
      </span>
      <div className="flex flex-col">
        <span className="text-[18px] font-medium text-neutral-700 leading-snug">
          {title}
        </span>
        <span className="text-[15px] text-neutral-500 leading-relaxed mt-1">
          {body}
        </span>
      </div>
    </div>
  );
}

