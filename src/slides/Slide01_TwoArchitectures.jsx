import { useState, useEffect } from "react";

const translations = {
  en: {
    eyebrow: "Where they diverge",
    headers: { pp: "Power Pages", spa: "Single page app" },
    subheaders: {
      pp: "An office with many purpose-built rooms.",
      spa: "An open-space office, ready for any type of framework.",
    },
    concepts: [
      {
        label: "Where the UI is built",
        pp: "Server renders HTML from Liquid templates over Dataverse.",
        spa: "Browser renders components from JavaScript; the server returns data, not pages.",
      },
      {
        label: "How customization fits in",
        pp: "Layered on top of the platform's output. JS / CSS applied after the page has rendered.",
        spa: "Authored directly. Your code is the render. There is no platform DOM to override.",
      },
      {
        label: "Navigation",
        pp: "Each navigation is a full page reload; the server returns a new HTML page.",
        spa: "One page load. Client-side routing swaps components without a round-trip.",
      },
      {
        label: "State & lifecycle",
        pp: "State in URL / cookies / sessionStorage. After render, JS runs once via setTimeout, MutationObserver, retry loops.",
        spa: "In-memory app state. Components have explicit mount / update / unmount hooks.",
      },
    ],
  },
  fr: {
    eyebrow: "Où elles divergent",
    headers: { pp: "Power Pages", spa: "Application monopage" },
    subheaders: {
      pp: "Un bureau avec plusieurs pièces dédiées.",
      spa: "Un open space, prêt pour n'importe quel framework.",
    },
    concepts: [
      {
        label: "Où l'interface est construite",
        pp: "Le serveur génère le HTML à partir de modèles Liquid sur Dataverse.",
        spa: "Le navigateur affiche les composants à partir du JavaScript ; le serveur retourne des données, pas des pages.",
      },
      {
        label: "Comment s'intègre la personnalisation",
        pp: "Superposée à la sortie de la plateforme. JS / CSS appliqués après le rendu de la page.",
        spa: "Écrite directement. Votre code est le rendu. Aucun DOM de plateforme à surcharger.",
      },
      {
        label: "Navigation",
        pp: "Chaque navigation est un rechargement complet ; le serveur retourne une nouvelle page HTML.",
        spa: "Un seul chargement de page. Le routage côté client échange les composants sans aller-retour.",
      },
      {
        label: "État et cycle de vie",
        pp: "État dans l'URL / cookies / sessionStorage. Après le rendu, le JS s'exécute une fois via setTimeout, MutationObserver, boucles de relance.",
        spa: "État applicatif en mémoire. Les composants ont des cycles explicites de montage / mise à jour / démontage.",
      },
    ],
  },
};

const LANGS = ["en", "fr"];

const DIAGRAMS = [
  { pp: RenderPP, spa: RenderSPA },
  { pp: CustomizationPP, spa: CustomizationSPA },
  { pp: NavigationPP, spa: NavigationSPA },
  { pp: StatePP, spa: StateSPA },
];

export default function Slide01_TwoArchitectures() {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(0);
  const t = translations[lang];
  const maxStep = t.concepts.length - 1;

  /**
   * Intercept ArrowRight / ArrowLeft / Space in the capture phase so the
   * deck-level handler in SlideDeck doesn't advance the slide until we've
   * walked through all four sub-steps. We only consume the event when there
   * is more (or earlier) sub-state to reveal; otherwise we let it bubble up
   * and the deck navigates as usual.
   */
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      const isForward =
        e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ";
      const isBack = e.key === "ArrowLeft" || e.key === "PageUp";

      if (isForward && step < maxStep) {
        e.stopImmediatePropagation();
        e.preventDefault();
        setStep((s) => Math.min(s + 1, maxStep));
      } else if (isBack && step > 0) {
        e.stopImmediatePropagation();
        e.preventDefault();
        setStep((s) => Math.max(s - 1, 0));
      }
    };
    // Capture phase so this fires before SlideDeck's bubble-phase listener.
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [step, maxStep]);

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
        <div className="flex items-center gap-6">
          <StepDots count={t.concepts.length} active={step} />
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col px-16 pt-6 pb-2 min-h-0">
        {/* Architecture column headers + per-column metaphor subtitle */}
        <div className="grid grid-cols-[80px_1fr_1fr] gap-x-12 pb-4 border-b-2 border-neutral-900">
          <div />
          <div>
            <div className="text-[26px] font-medium leading-tight text-neutral-900">
              {t.headers.pp}
            </div>
            <div className="mt-2 text-[14px] italic text-neutral-500 leading-snug">
              {t.subheaders.pp}
            </div>
          </div>
          <div>
            <div className="text-[26px] font-medium leading-tight text-neutral-900">
              {t.headers.spa}
            </div>
            <div className="mt-2 text-[14px] italic text-neutral-500 leading-snug">
              {t.subheaders.spa}
            </div>
          </div>
        </div>

        {/* Concept rows — progressive reveal */}
        <div className="flex flex-col flex-1 min-h-0">
          {t.concepts.map((c, i) => {
            if (i > step) return null;
            return (
              <ConceptRow
                key={i}
                index={i}
                concept={c}
                Diagram={DIAGRAMS[i]}
                expanded={i === step}
              />
            );
          })}
        </div>
      </main>

      {/* Reserved footer space (intentionally empty) */}
      <footer className="h-20" aria-hidden="true" />
    </div>
  );
}

/* ---------- helpers ---------- */

function ConceptRow({ index, concept, Diagram, expanded }) {
  // Expanded row stretches to fill remaining vertical space; collapsed rows
  // shrink down but keep the PP / SPA descriptions visible as a running
  // summary so audience can re-scan what was already covered.
  const wrapper = expanded
    ? "flex-1 flex flex-col justify-center py-3 border-b border-neutral-200"
    : "py-2.5 border-b border-neutral-200";

  return (
    <div className={wrapper}>
      {/* Row header: number + label */}
      <div
        className={`grid grid-cols-[80px_1fr] gap-x-12 items-baseline ${
          expanded ? "mb-3" : "mb-1.5"
        }`}
      >
        <span
          className={`font-light tabular-nums leading-none transition-colors ${
            expanded ? "text-[28px] text-brand" : "text-[16px] text-brand/60"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`tracking-[0.18em] uppercase font-medium transition-colors ${
            expanded
              ? "text-[15px] text-neutral-900"
              : "text-[11px] text-neutral-500"
          }`}
        >
          {concept.label}
        </span>
      </div>

      {/* Body: text always visible; diagrams only on the expanded row. */}
      <div className="grid grid-cols-[80px_1fr_1fr] gap-x-12 items-start">
        <div />
        <div className={`flex flex-col ${expanded ? "gap-3" : ""}`}>
          <p
            className={
              expanded
                ? "text-[18px] leading-[1.5] font-light text-neutral-700"
                : "text-[13px] leading-[1.4] font-light text-neutral-500"
            }
          >
            {concept.pp}
          </p>
          {expanded && <Diagram.pp />}
        </div>
        <div className={`flex flex-col ${expanded ? "gap-3" : ""}`}>
          <p
            className={
              expanded
                ? "text-[18px] leading-[1.5] font-light text-neutral-700"
                : "text-[13px] leading-[1.4] font-light text-neutral-500"
            }
          >
            {concept.spa}
          </p>
          {expanded && <Diagram.spa />}
        </div>
      </div>
    </div>
  );
}

function StepDots({ count, active }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Step ${active + 1} of ${count}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`block w-1.5 h-1.5 rounded-full transition-colors ${
            i <= active ? "bg-brand" : "bg-neutral-300"
          }`}
        />
      ))}
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

/* ---------- mini-diagrams ----------
   Conventions:
   - 1px strokes, no fills except for brand accent
   - PP diagrams use neutral grays; SPA diagrams use the brand teal as the differentiator
   - All diagrams render at h-[60px], full width of their column
*/

const NEUTRAL = "#737373";   // neutral-500
const NEUTRAL_LIGHT = "#d4d4d4"; // neutral-300
const BRAND = "#00a68f";

function DiagramFrame({ children, label }) {
  return (
    <div className="flex flex-col gap-2">
      <svg
        viewBox="0 0 280 60"
        className="w-full h-[88px]"
        preserveAspectRatio="xMinYMid meet"
      >
        {children}
      </svg>
      <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400">
        {label}
      </span>
    </div>
  );
}

/* Row 1 — Where the UI is built */

function RenderPP() {
  return (
    <DiagramFrame label="Server emits HTML">
      {/* Server */}
      <rect x="4" y="18" width="44" height="24" rx="3" fill="none" stroke={NEUTRAL} />
      <line x1="12" y1="26" x2="40" y2="26" stroke={NEUTRAL} />
      <line x1="12" y1="32" x2="40" y2="32" stroke={NEUTRAL} />
      <line x1="12" y1="38" x2="40" y2="38" stroke={NEUTRAL} />
      <text x="26" y="56" textAnchor="middle" fontSize="8" fill={NEUTRAL}>server</text>

      {/* Arrow + payload label */}
      <line x1="52" y1="30" x2="118" y2="30" stroke={NEUTRAL} />
      <polygon points="118,27 124,30 118,33" fill={NEUTRAL} />
      <text x="85" y="22" textAnchor="middle" fontSize="9" fill={NEUTRAL}>HTML page</text>

      {/* Browser w/ baked-in page */}
      <rect x="128" y="14" width="92" height="32" rx="3" fill="none" stroke={NEUTRAL} />
      <line x1="128" y1="22" x2="220" y2="22" stroke={NEUTRAL} />
      <circle cx="134" cy="18" r="1.2" fill={NEUTRAL} />
      <circle cx="139" cy="18" r="1.2" fill={NEUTRAL} />
      <circle cx="144" cy="18" r="1.2" fill={NEUTRAL} />
      {/* page lines (already filled in) */}
      <line x1="134" y1="28" x2="214" y2="28" stroke={NEUTRAL_LIGHT} />
      <line x1="134" y1="33" x2="200" y2="33" stroke={NEUTRAL_LIGHT} />
      <line x1="134" y1="38" x2="208" y2="38" stroke={NEUTRAL_LIGHT} />
      <text x="174" y="56" textAnchor="middle" fontSize="8" fill={NEUTRAL}>browser displays</text>
    </DiagramFrame>
  );
}

function RenderSPA() {
  return (
    <DiagramFrame label="Server returns data">
      {/* Server */}
      <rect x="4" y="18" width="44" height="24" rx="3" fill="none" stroke={NEUTRAL} />
      <line x1="12" y1="26" x2="40" y2="26" stroke={NEUTRAL} />
      <line x1="12" y1="32" x2="40" y2="32" stroke={NEUTRAL} />
      <line x1="12" y1="38" x2="40" y2="38" stroke={NEUTRAL} />
      <text x="26" y="56" textAnchor="middle" fontSize="8" fill={NEUTRAL}>server</text>

      {/* Arrow + JSON label */}
      <line x1="52" y1="30" x2="118" y2="30" stroke={BRAND} />
      <polygon points="118,27 124,30 118,33" fill={BRAND} />
      <text x="85" y="22" textAnchor="middle" fontSize="9" fill={BRAND}>{`{ JSON }`}</text>

      {/* Browser composing components */}
      <rect x="128" y="14" width="92" height="32" rx="3" fill="none" stroke={NEUTRAL} />
      <line x1="128" y1="22" x2="220" y2="22" stroke={NEUTRAL} />
      <circle cx="134" cy="18" r="1.2" fill={NEUTRAL} />
      <circle cx="139" cy="18" r="1.2" fill={NEUTRAL} />
      <circle cx="144" cy="18" r="1.2" fill={NEUTRAL} />
      {/* component blocks */}
      <rect x="134" y="26" width="22" height="6" rx="1" fill="none" stroke={BRAND} />
      <rect x="160" y="26" width="34" height="6" rx="1" fill="none" stroke={BRAND} />
      <rect x="134" y="35" width="60" height="6" rx="1" fill="none" stroke={BRAND} />
      <rect x="198" y="26" width="16" height="15" rx="1" fill="none" stroke={BRAND} />
      <text x="174" y="56" textAnchor="middle" fontSize="8" fill={NEUTRAL}>browser composes UI</text>
    </DiagramFrame>
  );
}

/* Row 2 — Customization */

function CustomizationPP() {
  // Platform = solid filled block on the left (foundation, given to you).
  // Patches  = dashed outlined strips on the right (added on top, your bolt-ons).
  // Visual treatment carries the distinction; layout reads left → right.
  const patches = [
    { x: 152, y: 8,  w: 124 },
    { x: 146, y: 17, w: 130 },
    { x: 154, y: 26, w: 122 },
    { x: 148, y: 35, w: 128 },
    { x: 152, y: 44, w: 124 },
  ];
  return (
    <DiagramFrame label="Platform + patches on top">
      {/* Platform — LEFT — solid filled block */}
      <rect
        x="2"
        y="12"
        width="118"
        height="36"
        rx="3"
        fill="#e5e5e5"
        stroke="#525252"
      />
      <text
        x="61"
        y="34"
        textAnchor="middle"
        fontSize="11"
        fontWeight="500"
        fill="#404040"
      >
        platform
      </text>

      {/* Plus connector */}
      <g stroke={NEUTRAL_LIGHT} strokeWidth="1.5">
        <line x1="128" y1="30" x2="142" y2="30" />
        <line x1="135" y1="23" x2="135" y2="37" />
      </g>

      {/* Patches — RIGHT — dashed outlined strips, offset to read as stacked */}
      {patches.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.w}
          height="6"
          rx="1.5"
          fill="none"
          stroke={NEUTRAL}
          strokeDasharray="3 2"
        />
      ))}
    </DiagramFrame>
  );
}

function CustomizationSPA() {
  return (
    <DiagramFrame label="One layer, your code">
      {/* single solid block */}
      <rect x="40" y="14" width="200" height="32" rx="3" fill="none" stroke={BRAND} />
      <line x1="48" y1="22" x2="232" y2="22" stroke={BRAND} strokeOpacity="0.5" />
      <line x1="48" y1="28" x2="220" y2="28" stroke={BRAND} strokeOpacity="0.5" />
      <line x1="48" y1="34" x2="232" y2="34" stroke={BRAND} strokeOpacity="0.5" />
      <line x1="48" y1="40" x2="200" y2="40" stroke={BRAND} strokeOpacity="0.5" />
      <text x="140" y="56" textAnchor="middle" fontSize="8" fill={BRAND}>your code = the render</text>
    </DiagramFrame>
  );
}

/* Row 3 — Navigation */

function NavigationPP() {
  return (
    <DiagramFrame label="Full reload per click">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${10 + i * 90}, 8)`}>
          <rect width="60" height="40" rx="3" fill="none" stroke={NEUTRAL} />
          <line x1="0" y1="8" x2="60" y2="8" stroke={NEUTRAL} />
          <circle cx="4" cy="4" r="1" fill={NEUTRAL} />
          <circle cx="8" cy="4" r="1" fill={NEUTRAL} />
          <circle cx="12" cy="4" r="1" fill={NEUTRAL} />
          <line x1="6" y1="16" x2="50" y2="16" stroke={NEUTRAL_LIGHT} />
          <line x1="6" y1="22" x2="42" y2="22" stroke={NEUTRAL_LIGHT} />
          <line x1="6" y1="28" x2="46" y2="28" stroke={NEUTRAL_LIGHT} />
        </g>
      ))}
      {/* reload arrows between pages */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${75 + i * 90}, 28)`}>
          <path d="M0 0 Q 7 -8 14 0" fill="none" stroke={NEUTRAL} />
          <polygon points="14,0 11,-3 11,3" fill={NEUTRAL} />
          <text x="7" y="-10" textAnchor="middle" fontSize="7" fill={NEUTRAL}>reload</text>
        </g>
      ))}
    </DiagramFrame>
  );
}

function NavigationSPA() {
  return (
    <DiagramFrame label="One shell, content swaps">
      {/* single shell */}
      <rect x="20" y="6" width="240" height="44" rx="3" fill="none" stroke={BRAND} />
      <line x1="20" y1="14" x2="260" y2="14" stroke={BRAND} />
      <circle cx="26" cy="10" r="1" fill={BRAND} />
      <circle cx="30" cy="10" r="1" fill={BRAND} />
      <circle cx="34" cy="10" r="1" fill={BRAND} />
      {/* sidebar */}
      <rect x="26" y="20" width="40" height="24" rx="2" fill="none" stroke={BRAND} strokeOpacity="0.5" />
      <line x1="32" y1="26" x2="60" y2="26" stroke={BRAND} strokeOpacity="0.5" />
      <line x1="32" y1="32" x2="60" y2="32" stroke={BRAND} strokeOpacity="0.5" />
      <line x1="32" y1="38" x2="54" y2="38" stroke={BRAND} strokeOpacity="0.5" />
      {/* content area with swap */}
      <rect x="74" y="20" width="180" height="24" rx="2" fill="none" stroke={BRAND} />
      <text x="164" y="35" textAnchor="middle" fontSize="9" fill={BRAND}>content swaps in place</text>
      {/* swap glyph */}
      <g transform="translate(80, 26)">
        <path d="M0 0 L8 0" stroke={BRAND} />
        <polygon points="8,0 5,-2 5,2" fill={BRAND} />
        <path d="M8 6 L0 6" stroke={BRAND} />
        <polygon points="0,6 3,4 3,8" fill={BRAND} />
      </g>
    </DiagramFrame>
  );
}

/* Row 4 — State & lifecycle */

function StatePP() {
  return (
    <DiagramFrame label="State lives outside the page">
      {/* page */}
      <rect x="84" y="14" width="112" height="32" rx="3" fill="none" stroke={NEUTRAL} />
      <line x1="84" y1="22" x2="196" y2="22" stroke={NEUTRAL} />
      <line x1="92" y1="30" x2="188" y2="30" stroke={NEUTRAL_LIGHT} />
      <line x1="92" y1="36" x2="170" y2="36" stroke={NEUTRAL_LIGHT} />
      <text x="140" y="44" textAnchor="middle" fontSize="7" fill={NEUTRAL_LIGHT}>page</text>

      {/* external storage chips with arrows pointing into page */}
      <g>
        <rect x="6" y="6" width="46" height="14" rx="2" fill="none" stroke={NEUTRAL} />
        <text x="29" y="16" textAnchor="middle" fontSize="8" fill={NEUTRAL}>?url=…</text>
        <line x1="52" y1="14" x2="84" y2="20" stroke={NEUTRAL_LIGHT} />
      </g>
      <g>
        <rect x="6" y="40" width="46" height="14" rx="2" fill="none" stroke={NEUTRAL} />
        <text x="29" y="50" textAnchor="middle" fontSize="8" fill={NEUTRAL}>cookie</text>
        <line x1="52" y1="46" x2="84" y2="40" stroke={NEUTRAL_LIGHT} />
      </g>
      <g>
        <rect x="228" y="6" width="48" height="14" rx="2" fill="none" stroke={NEUTRAL} />
        <text x="252" y="16" textAnchor="middle" fontSize="8" fill={NEUTRAL}>storage</text>
        <line x1="228" y1="14" x2="196" y2="20" stroke={NEUTRAL_LIGHT} />
      </g>
      <g>
        <rect x="228" y="40" width="48" height="14" rx="2" fill="none" stroke={NEUTRAL} />
        <text x="252" y="50" textAnchor="middle" fontSize="8" fill={NEUTRAL}>retry…</text>
        <line x1="228" y1="46" x2="196" y2="40" stroke={NEUTRAL_LIGHT} />
      </g>
    </DiagramFrame>
  );
}

function StateSPA() {
  return (
    <DiagramFrame label="State lives inside the component">
      {/* component frame */}
      <rect x="20" y="8" width="240" height="40" rx="3" fill="none" stroke={BRAND} />
      <text x="28" y="18" fontSize="8" fill={BRAND}>{`<Component>`}</text>

      {/* lifecycle bubbles inside */}
      <g>
        <circle cx="80" cy="32" r="10" fill="none" stroke={BRAND} />
        <text x="80" y="35" textAnchor="middle" fontSize="7" fill={BRAND}>mount</text>
      </g>
      <g>
        <circle cx="140" cy="32" r="10" fill="none" stroke={BRAND} />
        <text x="140" y="35" textAnchor="middle" fontSize="7" fill={BRAND}>state</text>
      </g>
      <g>
        <circle cx="200" cy="32" r="10" fill="none" stroke={BRAND} />
        <text x="200" y="35" textAnchor="middle" fontSize="7" fill={BRAND}>unmount</text>
      </g>

      {/* connecting lines */}
      <line x1="90" y1="32" x2="130" y2="32" stroke={BRAND} strokeOpacity="0.4" />
      <line x1="150" y1="32" x2="190" y2="32" stroke={BRAND} strokeOpacity="0.4" />
    </DiagramFrame>
  );
}
