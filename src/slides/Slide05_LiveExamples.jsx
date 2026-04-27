import { useState, useEffect } from "react";
import {
  Loader2,
  Check,
  Plus,
  Minus,
  Mail,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const translations = {
  en: {
    eyebrow: "How it actually behaves",
    lede: "Same backend. State stays in the page. Feedback is instant.",
    cards: [
      {
        n: "01",
        title: "Async action with loading state",
        caption:
          "Click the button. The UI updates in place: idle → loading → success. No page reload, no DOM swap.",
      },
      {
        n: "02",
        title: "Reactive state",
        caption:
          "Counter and toggle live in component state. No round-trip, no URL change, no lost context.",
      },
      {
        n: "03",
        title: "Validation as you type",
        caption:
          "The form reacts to every keystroke. No 'submit, full reload, see the error' loop.",
      },
      {
        n: "04",
        title: "Content swap, shell stays",
        caption:
          "Click the tabs. Only the panel changes. The shell, header and tab state are preserved.",
      },
    ],
    tabs: [
      { id: "overview", label: "Overview", body: "Headless Power Pages site. Dataverse and identity untouched. The browser owns the UI." },
      { id: "data", label: "Data", body: "Web API at /_api/{table}. Same OData filters, same security via web roles." },
      { id: "auth", label: "Auth", body: "Entra ID flow unchanged. User context available client-side via window.Microsoft." },
    ],
  },
  fr: {
    eyebrow: "Comment ça se comporte vraiment",
    lede: "Même backend. L'état vit dans la page. Le retour est instantané.",
    cards: [
      {
        n: "01",
        title: "Action asynchrone avec état de chargement",
        caption:
          "Cliquez le bouton. L'UI se met à jour sur place : repos → chargement → succès. Pas de rechargement.",
      },
      {
        n: "02",
        title: "État réactif",
        caption:
          "Le compteur et le bouton vivent dans l'état du composant. Pas d'aller-retour, pas de perte de contexte.",
      },
      {
        n: "03",
        title: "Validation pendant la saisie",
        caption:
          "Le formulaire réagit à chaque frappe. Plus de boucle « valider, recharger, voir l'erreur ».",
      },
      {
        n: "04",
        title: "Le contenu change, la coquille reste",
        caption:
          "Cliquez les onglets. Seul le panneau change. La coquille, l'en-tête et l'état des onglets sont conservés.",
      },
    ],
    tabs: [
      { id: "overview", label: "Aperçu", body: "Site Power Pages headless. Dataverse et identité intacts. Le navigateur possède l'UI." },
      { id: "data", label: "Données", body: "Web API sur /_api/{table}. Mêmes filtres OData, même sécurité via les rôles web." },
      { id: "auth", label: "Auth", body: "Le flow Entra ID est inchangé. Contexte utilisateur côté client via window.Microsoft." },
    ],
  },
};

const LANGS = ["en", "fr"];

export default function Slide05_LiveExamples() {
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
      <main className="flex-1 flex flex-col px-16 pt-8 pb-2 gap-8 min-h-0">
        {/* Lede */}
        <p className="text-[24px] leading-[1.3] font-light text-neutral-800 max-w-[1400px]">
          {t.lede}
        </p>

        {/* 2x2 demo grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 flex-1 min-h-0">
          <DemoCard meta={t.cards[0]}>
            <AsyncButtonDemo lang={lang} />
          </DemoCard>
          <DemoCard meta={t.cards[1]}>
            <ReactiveStateDemo lang={lang} />
          </DemoCard>
          <DemoCard meta={t.cards[2]}>
            <ValidationDemo lang={lang} />
          </DemoCard>
          <DemoCard meta={t.cards[3]}>
            <TabSwapDemo tabs={t.tabs} />
          </DemoCard>
        </div>
      </main>

      {/* Reserved footer space (intentionally empty) */}
      <footer className="h-20" aria-hidden="true" />
    </div>
  );
}

/* ---------- card shell ---------- */

function DemoCard({ meta, children }) {
  return (
    <div className="bg-brand/[0.04] border border-brand/30 rounded-2xl px-6 py-5 flex flex-col gap-4 min-h-0">
      {/* meta row */}
      <div className="flex items-baseline gap-3">
        <span className="text-[18px] font-light tabular-nums text-brand leading-none">
          {meta.n}
        </span>
        <span className="text-[15px] font-medium text-neutral-900 leading-snug">
          {meta.title}
        </span>
      </div>

      {/* demo area */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        {children}
      </div>

      {/* caption */}
      <p className="text-[12px] leading-[1.5] text-neutral-500">
        {meta.caption}
      </p>
    </div>
  );
}

/* ---------- demo 01: async button ---------- */

function AsyncButtonDemo({ lang }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const labels = {
    en: { idle: "Save", loading: "Saving…", success: "Saved" },
    fr: { idle: "Enregistrer", loading: "Enregistrement…", success: "Enregistré" },
  }[lang];

  // auto-reset after success
  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 1400);
    return () => clearTimeout(t);
  }, [status]);

  const handleClick = () => {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1100);
  };

  const styles =
    status === "success"
      ? "bg-brand text-white"
      : status === "loading"
      ? "bg-brand/80 text-white cursor-wait"
      : "bg-brand text-white hover:bg-brand-dark";

  return (
    <button
      onClick={handleClick}
      disabled={status !== "idle"}
      className={`px-7 py-3 rounded-lg flex items-center gap-2.5 transition-colors text-[15px] font-medium ${styles}`}
    >
      {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
      {status === "success" && <Check className="w-4 h-4" strokeWidth={3} />}
      <span>{labels[status]}</span>
    </button>
  );
}

/* ---------- demo 02: reactive state (counter + toggle) ---------- */

function ReactiveStateDemo({ lang }) {
  const [count, setCount] = useState(3);
  const [enabled, setEnabled] = useState(false);
  const labels = {
    en: { items: "items", notifs: "Notifications" },
    fr: { items: "articles", notifs: "Notifications" },
  }[lang];

  return (
    <div className="flex flex-col gap-5 items-stretch w-full max-w-[280px]">
      {/* counter */}
      <div className="flex items-center justify-between gap-3 bg-white border border-brand/20 rounded-lg px-3 py-2">
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="w-8 h-8 rounded-md bg-brand/10 text-brand flex items-center justify-center hover:bg-brand/20"
          aria-label="decrement"
        >
          <Minus className="w-4 h-4" strokeWidth={2.25} />
        </button>
        <div className="flex items-baseline gap-2">
          <span className="text-[24px] font-medium tabular-nums text-neutral-900 leading-none">
            {count}
          </span>
          <span className="text-[12px] uppercase tracking-wider text-neutral-500">
            {labels.items}
          </span>
        </div>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-8 h-8 rounded-md bg-brand/10 text-brand flex items-center justify-center hover:bg-brand/20"
          aria-label="increment"
        >
          <Plus className="w-4 h-4" strokeWidth={2.25} />
        </button>
      </div>

      {/* toggle */}
      <div className="flex items-center justify-between bg-white border border-brand/20 rounded-lg px-3 py-2.5">
        <span className="text-[14px] text-neutral-700">{labels.notifs}</span>
        <button
          onClick={() => setEnabled((v) => !v)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            enabled ? "bg-brand" : "bg-neutral-300"
          }`}
          role="switch"
          aria-checked={enabled}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/* ---------- demo 03: inline validation ---------- */

function ValidationDemo({ lang }) {
  const [email, setEmail] = useState("");
  const labels = {
    en: { ok: "Valid email", bad: "Not a valid email", placeholder: "you@intelcom.com" },
    fr: { ok: "Adresse valide", bad: "Adresse invalide", placeholder: "vous@intelcom.com" },
  }[lang];

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showStatus = email.length > 0;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      <div
        className={`relative flex items-center gap-2 bg-white border rounded-lg px-3 py-2.5 transition-colors ${
          !showStatus
            ? "border-neutral-300"
            : isValid
            ? "border-brand"
            : "border-red-400"
        }`}
      >
        <Mail
          className={`w-4 h-4 flex-none ${
            !showStatus ? "text-neutral-400" : isValid ? "text-brand" : "text-red-500"
          }`}
          strokeWidth={1.75}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.placeholder}
          className="flex-1 bg-transparent text-[14px] text-neutral-900 outline-none placeholder:text-neutral-400"
        />
      </div>
      <div className="h-5 flex items-center gap-1.5">
        {showStatus &&
          (isValid ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-brand" strokeWidth={2} />
              <span className="text-[12px] text-brand">{labels.ok}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-red-500" strokeWidth={2} />
              <span className="text-[12px] text-red-500">{labels.bad}</span>
            </>
          ))}
      </div>
    </div>
  );
}

/* ---------- demo 04: tab swap (no reload) ---------- */

function TabSwapDemo({ tabs }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active);

  return (
    <div className="flex flex-col gap-3 w-full max-w-[420px]">
      {/* tab strip */}
      <div className="flex gap-1 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors ${
              active === tab.id
                ? "border-brand text-brand"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* panel */}
      <div className="bg-white border border-neutral-200 rounded-lg px-4 py-3 min-h-[64px]">
        <p className="text-[13px] leading-[1.5] text-neutral-700">{current?.body}</p>
      </div>
    </div>
  );
}

/* ---------- lang toggle ---------- */

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
