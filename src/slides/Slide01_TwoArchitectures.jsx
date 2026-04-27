import { useState } from "react";
import {
  AlertCircle,
  LayoutGrid,
  ClipboardList,
  Table,
  KeyRound,
  Code2,
  Layers,
  ArrowLeftRight,
} from "lucide-react";

const PP_PARENT_ICON = LayoutGrid;
const PP_MODULE_ICONS = [ClipboardList, Table, KeyRound];
const SPA_PARENT_ICON = Code2;
const SPA_MODULE_ICONS = [Layers, ArrowLeftRight, KeyRound];

const translations = {
  en: {
    eyebrow: "",
    headers: { pp: "Power Pages", spa: "Single page app" },
    subheaders: {
      pp: "An office with many purpose-built rooms.",
      spa: "An open-space office, ready for any type of framework.",
    },
    ppIntro: {
      tagline:
        "Power Pages covers content, navigation, forms, lists and identity for a standard portal.",
      studio: {
        title: "Low-code studio",
        components: [
          "Pages",
          "Page templates",
          "Code snippets",
          "Site parameters",
          "Weblink sets",
          "Web files",
          "Web templates",
        ],
      },
      modules: [
        {
          title: "Dataverse forms",
          desc: [
            "Bind directly to tables",
            "Validation and security inherited from the data model",
          ],
          limits: ["Layout, field types and validation are platform-driven"],
        },
        {
          title: "Lists and views",
          desc: [
            "Paging, sort and filter included",
            "Render directly from Dataverse views",
          ],
          limits: ["Customizations layer on top of what the platform renders"],
        },
        {
          title: "Identity",
          desc: [
            "Azure AD, B2C and social providers",
            "External user invitations, no code required",
          ],
          limits: [],
        },
      ],
      page: {
        header: { label: "Page template" },
        snippet: { label: "Code snippet" },
        form: { label: "Dataverse form" },
        list: { label: "Dataverse list" },
        footer: { label: "Page template" },
      },
    },
    spaIntro: {
      tagline:
        "Same Power Pages backend. The browser becomes ours: layout and data calls are code we write.",
      studio: {
        title: "Built in code",
        components: [
          "Components",
          "Routes",
          "Layouts",
          "API client",
          "State stores",
          "Styles",
          "Build config",
        ],
      },
      modules: [
        {
          title: "UI layout",
          desc: [
            "Every page is composed from components we build",
            "We design the default layout and behaviour",
          ],
          limits: [],
        },
        {
          title: "Data operations",
          desc: [
            "The Power Pages Web API still serves the data",
            "We write the fetch, loading and error handling",
          ],
          limits: [],
        },
        {
          title: "Identity",
          desc: [
            "Same Entra ID / External ID auth as Power Pages",
            "User session inherited from the PP shell",
          ],
          limits: [],
        },
      ],
      page: {
        header: { label: "Layout" },
        snippet: { label: "Component" },
        form: { label: "Form component" },
        list: { label: "Table component" },
        footer: { label: "Layout" },
      },
    },
    concepts: [
      {
        label: "Where the UI is built",
        pp: "The server builds the finished page and sends it to the browser.",
        spa: "The browser builds the page from JavaScript. The server only sends data.",
      },
      {
        label: "Navigation",
        pp: "Every navigation reloads the whole page from the server.",
        spa: "The app loads once. Navigation swaps the view without leaving the page.",
      },
      {
        label: "State & lifecycle",
        pp: "Each page is a fresh start. To remember anything across navigation, we have to stash it outside the page. Our code only runs after the platform finishes drawing.",
        spa: "The app stays loaded. State lives in memory, and components own when they appear, update and leave.",
      },
    ],
  },
  fr: {
    eyebrow: "",
    headers: { pp: "Power Pages", spa: "Application single page" },
    subheaders: {
      pp: "Un bureau dont chaque pièce est aménagée pour un usage précis.",
      spa: "Un open space, prêt pour n'importe quel plan.",
    },
    ppIntro: {
      tagline:
        "Power Pages couvre contenu, navigation, formulaires, listes et identité pour un portail standard.",
      studio: {
        title: "Studio low code",
        components: [
          "Pages",
          "Modèles de page",
          "Extraits de contenu",
          "Paramètres du site",
          "Ensembles de liens",
          "Fichiers web",
          "Modèles web",
        ],
      },
      modules: [
        {
          title: "Formulaires Dataverse",
          desc: [
            "Liés directement aux tables",
            "Validation et sécurité héritées du modèle de données",
          ],
          limits: [
            "Disposition, types de champs et validation sont dictés par la plateforme",
          ],
        },
        {
          title: "Listes et vues",
          desc: [
            "Pagination, tri et filtre inclus",
            "Rendues directement à partir des vues Dataverse",
          ],
          limits: [
            "Les personnalisations s'ajoutent par-dessus ce que la plateforme rend",
          ],
        },
        {
          title: "Identité",
          desc: [
            "Azure AD, B2C et fournisseurs sociaux",
            "Invitations d'utilisateurs externes, sans code",
          ],
          limits: [],
        },
      ],
      page: {
        header: { label: "Modèle de page" },
        snippet: { label: "Extrait de contenu" },
        form: { label: "Formulaire Dataverse" },
        list: { label: "Liste Dataverse" },
        footer: { label: "Modèle de page" },
      },
    },
    spaIntro: {
      tagline:
        "Même backend Power Pages. Le navigateur devient le nôtre : mise en page et appels de données sont du code que nous écrivons.",
      studio: {
        title: "Construit dans le code",
        components: [
          "Composants",
          "Routes",
          "Mises en page",
          "Client API",
          "Stores d'état",
          "Styles",
          "Config de build",
        ],
      },
      modules: [
        {
          title: "Mise en page",
          desc: [
            "Chaque page est composée à partir de composants que nous écrivons",
            "Mise en page, espacement et comportement sont entièrement les nôtres",
          ],
          limits: [],
        },
        {
          title: "Opérations de données",
          desc: [
            "L'API Web Power Pages sert toujours les données",
            "Nous écrivons le fetch, le chargement et la gestion d'erreur",
          ],
          limits: [],
        },
        {
          title: "Identité",
          desc: [
            "Même authentification Entra ID / External ID que Power Pages",
            "Session utilisateur héritée de la coquille PP",
          ],
          limits: [],
        },
      ],
      page: {
        header: { label: "Mise en page" },
        snippet: { label: "Composant" },
        form: { label: "Composant formulaire" },
        list: { label: "Composant tableau" },
        footer: { label: "Mise en page" },
      },
    },
    concepts: [
      {
        label: "Où l'interface est construite",
        pp: "Le serveur construit la page finale et l'envoie au navigateur.",
        spa: "Le navigateur construit la page à partir de JavaScript. Le serveur n'envoie que des données.",
      },
      {
        label: "Navigation",
        pp: "Chaque navigation recharge toute la page depuis le serveur.",
        spa: "L'application se charge une seule fois. La navigation change la vue sans quitter la page.",
      },
      {
        label: "État et cycle de vie",
        pp: "Chaque page repart à zéro. Pour conserver quelque chose entre les navigations, nous le rangeons en dehors de la page. Notre code ne s'exécute qu'après que la plateforme a fini de dessiner.",
        spa: "L'application reste chargée. L'état vit en mémoire, et les composants savent quand ils apparaissent, se mettent à jour et disparaissent.",
      },
    ],
  },
};

const LANGS = ["en", "fr"];

const DIAGRAMS = [
  { pp: RenderPP, spa: RenderSPA },
  { pp: NavigationPP, spa: NavigationSPA },
  { pp: StatePP, spa: StateSPA },
];

export default function Slide01_TwoArchitectures({ step = 0 }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  // step 0 = central-concept intro
  // step 1 = Power Pages framing (low-code studio + built-in modules)
  // step 2 = SPA framing (built in code, custom layout + data + auth)
  // steps 3..N+2 = the N concepts revealed in order

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-neutral-900">
      {/* Top strip: eyebrow + lang toggle */}
      <header className="px-20 pt-12 flex items-center justify-between">
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

      {/* Body. The View Transitions API handles step-to-step fades and morphs
          paired elements (titles + subheaders), so we no longer remount per
          step or run a CSS fade — both would fight the snapshot capture. */}
      <main className="flex-1 flex flex-col px-20 pt-8 pb-10 min-h-0">
        {step === 0 && <IntroView t={t} />}
        {step === 1 && (
          <ArchIntroSection
            title={t.headers.pp}
            titleClass="text-neutral-900"
            subheader={t.subheaders.pp}
            tagline={t.ppIntro.tagline}
            studio={t.ppIntro.studio}
            modules={t.ppIntro.modules}
            page={t.ppIntro.page}
            ParentIcon={PP_PARENT_ICON}
            moduleIcons={PP_MODULE_ICONS}
            transitionPrefix="arch-pp"
          />
        )}
        {step === 2 && (
          <ArchIntroSection
            title={t.headers.spa}
            titleClass="text-brand"
            subheader={t.subheaders.spa}
            tagline={t.spaIntro.tagline}
            studio={t.spaIntro.studio}
            modules={t.spaIntro.modules}
            page={t.spaIntro.page}
            ParentIcon={SPA_PARENT_ICON}
            moduleIcons={SPA_MODULE_ICONS}
            transitionPrefix="arch-spa"
          />
        )}
        {step >= 3 && (
          <>
            {/* Architecture column headers + per-column metaphor subtitle */}
            <div className="grid grid-cols-[100px_1fr_1fr] gap-x-14 pb-6 border-b-2 border-neutral-900">
              <div />
              <div>
                <div className="text-[44px] font-medium leading-[1.05] tracking-tight text-neutral-900">
                  {t.headers.pp}
                </div>
                <div className="mt-3 text-[22px] italic text-neutral-500 leading-snug">
                  {t.subheaders.pp}
                </div>
              </div>
              <div>
                <div className="text-[44px] font-medium leading-[1.05] tracking-tight text-brand">
                  {t.headers.spa}
                </div>
                <div className="mt-3 text-[22px] italic text-neutral-500 leading-snug">
                  {t.subheaders.spa}
                </div>
              </div>
            </div>

            {/* Concept rows — progressive reveal. step 3..N+2 maps to concepts[0..N-1]. */}
            <div className="flex flex-col flex-1 min-h-0">
              {t.concepts.map((c, i) => {
                const activeConcept = step - 3;
                if (i > activeConcept) return null;
                return (
                  <ConceptRow
                    key={i}
                    index={i}
                    concept={c}
                    Diagram={DIAGRAMS[i]}
                    expanded={i === activeConcept}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* Single-side framing used for both step 1 (Power Pages) and step 2 (SPA).
   Two columns: a Legend (parent card with chips + module sub-cards explaining
   each component) and a Map (a wireframe page placing the named components
   in their actual positions). Both intros share the same map structure so the
   parallel reads at a glance — the page is the same, only the labels differ. */
function ArchIntroSection({
  title,
  titleClass,
  subheader,
  tagline,
  studio,
  modules,
  page,
  ParentIcon,
  moduleIcons,
  transitionPrefix,
}) {
  return (
    <div className="flex-1 flex flex-col gap-6 min-h-0 pt-2">
      <div>
        <div
          className={`text-[60px] font-medium leading-[1.02] tracking-tight ${titleClass}`}
          style={{ viewTransitionName: `${transitionPrefix}-title` }}
        >
          {title}
        </div>
        <div
          className="mt-3 text-[26px] italic text-neutral-500 leading-snug max-w-[60ch]"
          style={{ viewTransitionName: `${transitionPrefix}-subheader` }}
        >
          {subheader}
        </div>
      </div>

      {/* Tagline + Legend + Wireframe form a single "info" block. Naming the
          wrapper lets the Power Pages variant scroll up as one unit when the
          user advances from step 0; the SPA variant uses the default
          crossfade. */}
      <div
        className="flex-1 flex flex-col gap-5 min-h-0"
        style={{ viewTransitionName: `${transitionPrefix}-info` }}
      >
        <div className="text-[20px] text-neutral-500 leading-snug max-w-[70ch]">
          {tagline}
        </div>
        <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
          <Legend
            studio={studio}
            modules={modules}
            ParentIcon={ParentIcon}
            moduleIcons={moduleIcons}
          />
          <WireframePage page={page} />
        </div>
      </div>
    </div>
  );
}

function Legend({ studio, modules, ParentIcon, moduleIcons }) {
  return (
    <div className="flex flex-col gap-4 min-h-0">
      {/* Parent card with chips */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50/60 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="flex-none w-12 h-12 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-700">
            <ParentIcon className="w-6 h-6" strokeWidth={1.5} />
          </span>
          <div className="text-[24px] font-medium text-neutral-900 leading-tight">
            {studio.title}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {studio.components.map((name) => (
            <span
              key={name}
              className="px-3 py-1 rounded-full bg-white border border-neutral-200 text-[15px] text-neutral-700"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Module sub-cards stacked vertically */}
      <div className="flex flex-col gap-3 flex-1 min-h-0">
        {modules.map((m, i) => (
          <ModuleCard key={i} module={m} icon={moduleIcons[i]} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ module: m, icon: Icon }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 flex gap-4 flex-1 min-h-0">
      <span className="flex-none w-11 h-11 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-700">
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </span>
      <div className="flex-1 flex flex-col">
        <div className="text-[18px] font-medium text-neutral-900 leading-tight mb-2">
          {m.title}
        </div>
        <ul className="flex flex-col gap-1.5">
          {m.desc.map((d, j) => (
            <BulletItem key={`d${j}`} text={d} />
          ))}
          {m.limits.map((l, j) => (
            <BulletItem key={`l${j}`} text={l} limit />
          ))}
        </ul>
      </div>
    </div>
  );
}

function BulletItem({ text, limit = false }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] leading-snug">
      {limit ? (
        <AlertCircle
          className="flex-none mt-[3px] w-4 h-4 text-amber-600"
          strokeWidth={1.75}
          aria-label="Limits us"
        />
      ) : (
        <span className="flex-none mt-[9px] w-1.5 h-1.5 rounded-full bg-neutral-400" />
      )}
      <span className={limit ? "text-neutral-800" : "text-neutral-600"}>
        {text}
      </span>
    </li>
  );
}

function WireframePage({ page }) {
  return (
    <div className="flex flex-col gap-3 min-h-0">
      <Region label={page.header.label}>
        <MockHeader />
      </Region>
      <Region label={page.snippet.label}>
        <MockSnippet />
      </Region>
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        <Region label={page.form.label}>
          <MockForm />
        </Region>
        <Region label={page.list.label}>
          <MockList />
        </Region>
      </div>
      <Region label={page.footer.label}>
        <MockFooter />
      </Region>
    </div>
  );
}

function Region({ label, children }) {
  return (
    <div className="relative border border-dashed border-neutral-300 rounded-lg bg-neutral-50/50 px-3 pt-4 pb-2.5 flex flex-col min-h-0">
      <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full bg-brand/15 text-brand text-[12px] font-semibold uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

function MockHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-6 h-6 bg-neutral-300 rounded" />
        <div className="flex gap-2">
          <span className="w-9 h-1.5 bg-neutral-300 rounded-full" />
          <span className="w-9 h-1.5 bg-neutral-300 rounded-full" />
          <span className="w-9 h-1.5 bg-neutral-300 rounded-full" />
        </div>
      </div>
      <span className="w-6 h-6 bg-neutral-300 rounded-full" />
    </div>
  );
}

function MockSnippet() {
  return (
    <div className="h-5 rounded bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200" />
  );
}

function MockForm() {
  return (
    <div className="flex flex-col gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="w-10 h-1.5 bg-neutral-300 rounded-full" />
          <span className="h-4 bg-white border border-neutral-200 rounded" />
        </div>
      ))}
      <span className="self-start mt-1 px-2.5 py-0.5 bg-neutral-300 rounded text-[9px] text-white">
        ▓▓▓▓
      </span>
    </div>
  );
}

function MockList() {
  return (
    <div className="flex flex-col">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2 py-1 border-b border-neutral-200 last:border-0"
        >
          <span className="w-2.5 h-2.5 bg-neutral-300 rounded-sm" />
          <span className="flex-1 h-1.5 bg-neutral-200 rounded-full" />
          <span className="w-8 h-1.5 bg-neutral-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function MockFooter() {
  return (
    <div className="flex items-center justify-between">
      <span className="w-24 h-1.5 bg-neutral-200 rounded-full" />
      <div className="flex gap-2">
        <span className="w-8 h-1.5 bg-neutral-200 rounded-full" />
        <span className="w-8 h-1.5 bg-neutral-200 rounded-full" />
      </div>
    </div>
  );
}

/* Step 0 — centered "two architectures" framing before drilling into concepts.
   The title + subheader on each side are tagged with view-transition-names that
   match the next step's ArchIntroSection so the View Transitions API morphs
   them in place when the user advances. */
function IntroView({ t }) {
  return (
    <div className="flex-1 grid grid-cols-2 gap-x-24 items-center">
      <div className="flex flex-col items-start">
        <div
          className="text-[112px] font-medium leading-[0.98] tracking-tight text-neutral-900"
          style={{ viewTransitionName: "arch-pp-title" }}
        >
          {t.headers.pp}
        </div>
        <div
          className="mt-10 text-[32px] italic text-neutral-500 leading-snug max-w-[24ch]"
          style={{ viewTransitionName: "arch-pp-subheader" }}
        >
          {t.subheaders.pp}
        </div>
      </div>
      <div className="flex flex-col items-start border-l border-neutral-200 pl-20">
        <div
          className="text-[112px] font-medium leading-[0.98] tracking-tight text-brand"
          style={{ viewTransitionName: "arch-spa-title" }}
        >
          {t.headers.spa}
        </div>
        <div
          className="mt-10 text-[32px] italic text-neutral-500 leading-snug max-w-[24ch]"
          style={{ viewTransitionName: "arch-spa-subheader" }}
        >
          {t.subheaders.spa}
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function ConceptRow({ index, concept, Diagram, expanded }) {
  // Expanded row stretches to fill remaining vertical space; collapsed rows
  // shrink down but keep the PP / SPA descriptions visible as a running
  // summary so audience can re-scan what was already covered.
  const wrapper = expanded
    ? "flex-1 flex flex-col justify-center py-5 border-b border-neutral-200 transition-all duration-300"
    : "py-4 border-b border-neutral-200 transition-all duration-300";

  return (
    <div className={wrapper}>
      {/* Row header: number + label */}
      <div
        className={`grid grid-cols-[100px_1fr] gap-x-14 items-baseline transition-all duration-300 ${
          expanded ? "mb-5" : "mb-2"
        }`}
      >
        <span
          className={`font-light tabular-nums leading-none transition-all duration-300 ${
            expanded ? "text-[48px] text-brand" : "text-[22px] text-brand/60"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`tracking-[0.18em] uppercase font-medium transition-all duration-300 ${
            expanded
              ? "text-[22px] text-neutral-900"
              : "text-[14px] text-neutral-500"
          }`}
        >
          {concept.label}
        </span>
      </div>

      {/* Body: text always visible; diagrams only on the expanded row. */}
      <div className="grid grid-cols-[100px_1fr_1fr] gap-x-14 items-start">
        <div />
        <div className={`flex flex-col ${expanded ? "gap-5" : ""}`}>
          <p
            className={`transition-all duration-300 ${
              expanded
                ? "text-[28px] leading-[1.45] font-light text-neutral-700"
                : "text-[16px] leading-[1.45] font-light text-neutral-500"
            }`}
          >
            {concept.pp}
          </p>
          {expanded && <Diagram.pp />}
        </div>
        <div className={`flex flex-col ${expanded ? "gap-5" : ""}`}>
          <p
            className={`transition-all duration-300 ${
              expanded
                ? "text-[28px] leading-[1.45] font-light text-neutral-700"
                : "text-[16px] leading-[1.45] font-light text-neutral-500"
            }`}
          >
            {concept.spa}
          </p>
          {expanded && <Diagram.spa />}
        </div>
      </div>
    </div>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <div className="flex items-center gap-2 text-[15px] tracking-[0.22em] uppercase">
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
        className="w-full h-[120px]"
        preserveAspectRatio="xMinYMid meet"
      >
        {children}
      </svg>
      <span className="text-[13px] tracking-[0.2em] uppercase text-neutral-400">
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

/* Row 2 — Navigation */

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
      {/* reload arrows between pages — arrowhead rotated to match the
          Bezier's tangent at the endpoint (≈49° below horizontal) so it
          reads as an arrow tip, not a flag stuck on a curve. */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${75 + i * 90}, 28)`}>
          <path d="M0 0 Q 7 -8 14 0" fill="none" stroke={NEUTRAL} />
          <polygon
            points="0,0 -3,-3 -3,3"
            fill={NEUTRAL}
            transform="translate(14, 0) rotate(49)"
          />
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

/* Row 3 — State & lifecycle */

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
  // No pill borders: the icons stand on their own with labels underneath.
  // Distinct shapes carry the meaning so the three phases read as different.
  //   mount   = downward arrow (component appears)
  //   update  = circular refresh (state changes)
  //   unmount = X (component leaves)
  return (
    <DiagramFrame label="Lifecycle and state inside the component">
      {/* component frame */}
      <rect x="2" y="4" width="276" height="50" rx="3" fill="none" stroke={BRAND} />
      <text x="10" y="14" fontSize="8" fill={BRAND}>{`<Component>`}</text>

      {/* Phase 1 — mount */}
      <g transform="translate(62, 30)">
        <line x1="0" y1="-8" x2="0" y2="3" stroke={BRAND} strokeWidth="2" />
        <polygon points="0,8 -5,2 5,2" fill={BRAND} />
        <text x="0" y="22" textAnchor="middle" fontSize="9" fill={BRAND}>mount</text>
      </g>

      {/* arrow → */}
      <line x1="78" y1="30" x2="124" y2="30" stroke={BRAND} strokeOpacity="0.4" />
      <polygon points="124,30 119,28 119,32" fill={BRAND} fillOpacity="0.4" />

      {/* Phase 2 — update: 270° clockwise arc ending at the left, with the
          arrowhead aligned to the tangent (pointing up) so the curve reads
          as a continuous circular motion rather than a flag stuck on. */}
      <g transform="translate(140, 30)">
        <path d="M 0 -7 A 7 7 0 1 1 -7 0" fill="none" stroke={BRAND} strokeWidth="2" />
        <polygon points="-7,-4 -10,0 -4,0" fill={BRAND} />
        <text x="0" y="22" textAnchor="middle" fontSize="9" fill={BRAND}>update</text>
      </g>

      {/* arrow → */}
      <line x1="156" y1="30" x2="202" y2="30" stroke={BRAND} strokeOpacity="0.4" />
      <polygon points="202,30 197,28 197,32" fill={BRAND} fillOpacity="0.4" />

      {/* Phase 3 — unmount */}
      <g transform="translate(218, 30)">
        <line x1="-7" y1="-7" x2="7" y2="7" stroke={BRAND} strokeWidth="2" />
        <line x1="7" y1="-7" x2="-7" y2="7" stroke={BRAND} strokeWidth="2" />
        <text x="0" y="22" textAnchor="middle" fontSize="9" fill={BRAND}>unmount</text>
      </g>
    </DiagramFrame>
  );
}
