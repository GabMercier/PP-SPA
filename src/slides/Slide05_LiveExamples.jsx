import { useState, useEffect } from "react";
import {
  Loader2,
  Check,
  Plus,
  Minus,
  Mail,
  AlertCircle,
  CheckCircle2,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const translations = {
  en: {
    eyebrow: "",
    lede: "Same backend. Tabs, forms and feedback all live in one shell that never reloads.",
    url: "portal.intelcom.com/account",
    appName: "Intelcom Portal",
    pageTitle: "Account settings",
    nav: ["Home", "Cases", "Documents", "Account"],
    activeNav: "Account",
    tabs: [
      { id: "profile", label: "Profile" },
      { id: "notifications", label: "Notifications" },
      { id: "activity", label: "Activity" },
    ],
    profile: {
      emailLabel: "Email",
      emailPlaceholder: "you@intelcom.com",
      validOk: "Valid email",
      validBad: "Not a valid email",
      oooLabel: "Out of office",
      oooHint: "Click two days to set a range. Click again to reset.",
      oooEmpty: "No dates selected",
      saveIdle: "Save changes",
      saveLoading: "Saving…",
      saveDone: "Saved",
    },
    notifications: {
      enabledLabel: "Email notifications",
      countLabel: "Daily digest count",
    },
    activity: {
      title: "Recent activity",
      items: [
        { time: "2 min ago", text: "You updated your email" },
        { time: "1 hour ago", text: "Notifications enabled" },
        { time: "yesterday", text: "Signed in from a new device" },
      ],
    },
    features: [
      "Validation as you type",
      "Async without reload",
      "Custom controls (calendar) you can't build OOTB",
      "State persists across tabs and into the header",
      "The shell never reloads",
    ],
    weekdays: ["M", "T", "W", "T", "F", "S", "S"],
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    monthShort: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
  },
  fr: {
    eyebrow: "",
    lede: "Même backend. Onglets, formulaires et retours d'information vivent dans une seule coquille qui ne se recharge jamais.",
    url: "portail.intelcom.com/compte",
    appName: "Portail Intelcom",
    pageTitle: "Paramètres du compte",
    nav: ["Accueil", "Demandes", "Documents", "Compte"],
    activeNav: "Compte",
    tabs: [
      { id: "profile", label: "Profil" },
      { id: "notifications", label: "Notifications" },
      { id: "activity", label: "Activité" },
    ],
    profile: {
      emailLabel: "Courriel",
      emailPlaceholder: "vous@intelcom.com",
      validOk: "Adresse valide",
      validBad: "Adresse invalide",
      oooLabel: "Absence du bureau",
      oooHint: "Cliquez deux jours pour fixer la plage. Cliquez encore pour réinitialiser.",
      oooEmpty: "Aucune date sélectionnée",
      saveIdle: "Enregistrer",
      saveLoading: "Enregistrement…",
      saveDone: "Enregistré",
    },
    notifications: {
      enabledLabel: "Notifications par courriel",
      countLabel: "Nombre d'alertes quotidiennes",
    },
    activity: {
      title: "Activité récente",
      items: [
        { time: "il y a 2 min", text: "Vous avez modifié votre courriel" },
        { time: "il y a 1 h", text: "Notifications activées" },
        { time: "hier", text: "Connexion depuis un nouvel appareil" },
      ],
    },
    features: [
      "Validation pendant la saisie",
      "Asynchrone sans rechargement",
      "Contrôles personnalisés (calendrier) impossibles en OOTB",
      "L'état persiste entre les onglets et jusqu'à l'en-tête",
      "La coquille ne se recharge jamais",
    ],
    weekdays: ["L", "M", "M", "J", "V", "S", "D"],
    months: [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre",
    ],
    monthShort: [
      "jan", "fév", "mar", "avr", "mai", "juin",
      "juil", "août", "sep", "oct", "nov", "déc",
    ],
  },
};

const LANGS = ["en", "fr"];

export default function Slide05_LiveExamples() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  // App state held at the top so it survives tab switches: that is the point.
  const [activeTab, setActiveTab] = useState("profile");
  const [email, setEmail] = useState("gabriel@intelcom.com");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [digestCount, setDigestCount] = useState(3);
  // Out-of-office range — pre-seeded so the calendar shows a highlighted span
  // on first view.
  const [oooRange, setOooRange] = useState(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 7);
    const end = new Date(today);
    end.setDate(today.getDate() + 14);
    return { start, end };
  });

  // Bell badge tied to notifications state — toggling Notifications or
  // changing the digest count visibly updates the header bell. Demonstrates
  // that state in one tab propagates across the whole shell.
  const bellCount = notifEnabled ? digestCount : 0;

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-neutral-900">
      {/* Top strip: eyebrow + lang toggle */}
      <header className="px-16 pt-12 flex items-center justify-between">
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

      <main className="flex-1 flex flex-col px-16 pt-6 pb-8 gap-5 min-h-0">
        <p className="text-[20px] leading-[1.4] font-light text-neutral-700 max-w-[1100px]">
          {t.lede}
        </p>

        {/* Mockup browser frame + side feature column */}
        <div className="flex-1 flex gap-8 min-h-0">
          <div className="flex-1 flex flex-col rounded-2xl border border-neutral-300 shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden bg-white min-h-0">
            {/* Browser chrome */}
            <div className="flex-none flex items-center gap-3 bg-neutral-100 border-b border-neutral-200 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 max-w-[460px] mx-auto bg-white border border-neutral-200 rounded-md px-3 py-1 text-[12px] text-neutral-500 font-mono">
                {t.url}
              </div>
            </div>

            {/* App header */}
            <div className="flex-none flex items-center justify-between bg-white border-b border-neutral-200 px-7 py-3">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-md bg-brand flex items-center justify-center">
                    <span className="block w-2.5 h-2.5 bg-white rounded-sm" />
                  </span>
                  <span className="text-[14px] font-medium text-neutral-800">
                    {t.appName}
                  </span>
                </div>
                <nav className="flex items-center gap-5">
                  {t.nav.map((label) => {
                    const isActive = label === t.activeNav;
                    return (
                      <a
                        key={label}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className={`text-[13px] transition-colors ${
                          isActive
                            ? "text-neutral-900 font-medium"
                            : "text-neutral-500 hover:text-neutral-800"
                        }`}
                      >
                        {label}
                      </a>
                    );
                  })}
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="relative w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" strokeWidth={1.75} />
                  {bellCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center tabular-nums leading-none">
                      {bellCount}
                    </span>
                  )}
                </button>
                <span className="w-8 h-8 rounded-full bg-brand/15 text-brand text-[12px] font-medium flex items-center justify-center">
                  GMB
                </span>
              </div>
            </div>

            {/* Page area: title, tabs, tab content */}
            <div className="flex-1 flex flex-col px-8 py-6 gap-4 min-h-0 overflow-hidden">
              <h2 className="text-[24px] font-medium text-neutral-900 leading-tight">
                {t.pageTitle}
              </h2>
              <div className="flex gap-1 border-b border-neutral-200">
                {t.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-[14px] font-medium border-b-2 -mb-px transition-colors ${
                      activeTab === tab.id
                        ? "border-brand text-brand"
                        : "border-transparent text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 min-h-0 pt-2 overflow-auto">
                {activeTab === "profile" && (
                  <ProfilePanel
                    email={email}
                    setEmail={setEmail}
                    saveStatus={saveStatus}
                    setSaveStatus={setSaveStatus}
                    range={oooRange}
                    setRange={setOooRange}
                    labels={t.profile}
                    weekdays={t.weekdays}
                    months={t.months}
                    monthShort={t.monthShort}
                  />
                )}
                {activeTab === "notifications" && (
                  <NotificationsPanel
                    enabled={notifEnabled}
                    setEnabled={setNotifEnabled}
                    count={digestCount}
                    setCount={setDigestCount}
                    labels={t.notifications}
                  />
                )}
                {activeTab === "activity" && (
                  <ActivityPanel data={t.activity} />
                )}
              </div>
            </div>
          </div>

          {/* Side panel: what to look for */}
          <div className="flex-none w-[260px] flex flex-col gap-3 pt-2">
            <span className="text-[11px] tracking-[0.22em] uppercase text-neutral-400 mb-1">
              What you're seeing
            </span>
            {t.features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-[14px] text-neutral-700 leading-snug"
              >
                <span className="flex-none mt-[7px] w-1.5 h-1.5 rounded-full bg-brand" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Tab panels ---------- */

function ProfilePanel({
  email,
  setEmail,
  saveStatus,
  setSaveStatus,
  range,
  setRange,
  labels,
  weekdays,
  months,
  monthShort,
}) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showStatus = email.length > 0;

  useEffect(() => {
    if (saveStatus !== "success") return;
    const id = setTimeout(() => setSaveStatus("idle"), 1500);
    return () => clearTimeout(id);
  }, [saveStatus, setSaveStatus]);

  const save = () => {
    if (saveStatus !== "idle" || !isValid) return;
    setSaveStatus("loading");
    setTimeout(() => setSaveStatus("success"), 1100);
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-10 gap-y-5 max-w-[760px]">
      {/* Left column: email + save */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-neutral-600 uppercase tracking-wide">
            {labels.emailLabel}
          </label>
          <div
            className={`flex items-center gap-2 bg-white border rounded-lg px-3 py-2.5 transition-colors ${
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
              placeholder={labels.emailPlaceholder}
              className="flex-1 bg-transparent text-[14px] text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>
          <div className="h-4 flex items-center gap-1.5">
            {showStatus &&
              (isValid ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand" strokeWidth={2} />
                  <span className="text-[12px] text-brand">{labels.validOk}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" strokeWidth={2} />
                  <span className="text-[12px] text-red-500">{labels.validBad}</span>
                </>
              ))}
          </div>
        </div>

        <button
          onClick={save}
          disabled={saveStatus !== "idle" || !isValid}
          className={`self-start px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors text-[14px] font-medium ${
            saveStatus === "success"
              ? "bg-brand text-white"
              : saveStatus === "loading"
              ? "bg-brand/80 text-white cursor-wait"
              : !isValid
              ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              : "bg-brand text-white hover:bg-brand-dark"
          }`}
        >
          {saveStatus === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
          {saveStatus === "success" && <Check className="w-4 h-4" strokeWidth={3} />}
          <span>
            {saveStatus === "loading"
              ? labels.saveLoading
              : saveStatus === "success"
              ? labels.saveDone
              : labels.saveIdle}
          </span>
        </button>
      </div>

      {/* Right column: out-of-office calendar */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-neutral-600 uppercase tracking-wide">
          {labels.oooLabel}
        </label>
        <DateRangePicker
          range={range}
          onChange={setRange}
          weekdays={weekdays}
          months={months}
        />
        <div className="text-[12px] text-neutral-500 mt-1">
          {range.start && range.end
            ? `${formatRange(range.start, range.end, monthShort)}`
            : range.start
            ? `${formatDay(range.start, monthShort)} → …`
            : labels.oooEmpty}
        </div>
      </div>
    </div>
  );
}

function NotificationsPanel({ enabled, setEnabled, count, setCount, labels }) {
  const dim = enabled ? "opacity-100" : "opacity-40";
  return (
    <div className="flex flex-col gap-4 max-w-[480px]">
      <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-3">
        <span className="text-[14px] text-neutral-700">{labels.enabledLabel}</span>
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

      <div
        className={`flex items-center justify-between bg-white border border-neutral-200 rounded-lg px-4 py-3 transition-opacity ${dim}`}
      >
        <span className="text-[14px] text-neutral-700">{labels.countLabel}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => enabled && setCount((c) => Math.max(0, c - 1))}
            disabled={!enabled}
            className="w-8 h-8 rounded-md bg-brand/10 text-brand flex items-center justify-center hover:bg-brand/20 disabled:hover:bg-brand/10"
            aria-label="decrement"
          >
            <Minus className="w-4 h-4" strokeWidth={2.25} />
          </button>
          <span className="text-[18px] font-medium tabular-nums text-neutral-900 w-6 text-center">
            {count}
          </span>
          <button
            onClick={() => enabled && setCount((c) => c + 1)}
            disabled={!enabled}
            className="w-8 h-8 rounded-md bg-brand/10 text-brand flex items-center justify-center hover:bg-brand/20 disabled:hover:bg-brand/10"
            aria-label="increment"
          >
            <Plus className="w-4 h-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityPanel({ data }) {
  return (
    <div className="flex flex-col gap-3 max-w-[480px]">
      <h3 className="text-[12px] font-medium uppercase tracking-wide text-neutral-500">
        {data.title}
      </h3>
      <ul className="flex flex-col gap-2">
        {data.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-white border border-neutral-200 rounded-lg px-4 py-3"
          >
            <span className="flex-none mt-1.5 w-2 h-2 rounded-full bg-brand" />
            <div className="flex-1 flex flex-col">
              <span className="text-[14px] text-neutral-800">{item.text}</span>
              <span className="text-[12px] text-neutral-500 mt-0.5">{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- date range picker ----------
   A small inline month calendar with two-click range selection. The kind of
   custom control that's straightforward in React but not available in
   stock Power Pages forms. */

function DateRangePicker({ range, onChange, weekdays, months }) {
  const initial = range.start || new Date();
  const [view, setView] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  );
  const grid = buildMonthGrid(view.getFullYear(), view.getMonth());

  const handleDayClick = (day) => {
    const { start, end } = range;
    if (!start || (start && end)) {
      onChange({ start: day, end: null });
    } else if (day.getTime() < start.getTime()) {
      onChange({ start: day, end: start });
    } else if (isSameDay(day, start)) {
      onChange({ start: day, end: null });
    } else {
      onChange({ start, end: day });
    }
  };

  const goPrev = () =>
    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  const goNext = () =>
    setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-3 w-[280px]">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={goPrev}
          className="w-7 h-7 rounded-md hover:bg-neutral-100 flex items-center justify-center text-neutral-500"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        </button>
        <span className="text-[13px] font-medium text-neutral-800 capitalize">
          {months[view.getMonth()]} {view.getFullYear()}
        </span>
        <button
          onClick={goNext}
          className="w-7 h-7 rounded-md hover:bg-neutral-100 flex items-center justify-center text-neutral-500"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-[10px] text-neutral-400 uppercase mb-1">
        {weekdays.map((wd, i) => (
          <span key={i} className="text-center">
            {wd}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {grid.map((cell, i) => {
          const isStart = isSameDay(cell.date, range.start);
          const isEnd = isSameDay(cell.date, range.end);
          const inRange = isInRange(cell.date, range.start, range.end);
          const isEdge = isStart || isEnd;
          const onlyStart = isStart && !range.end;

          let cls =
            "h-8 flex items-center justify-center text-[12px] transition-colors";
          if (!cell.inMonth) {
            cls += " text-neutral-300";
          } else if (isEdge) {
            cls += " bg-brand text-white font-medium";
          } else if (inRange) {
            cls += " bg-brand/15 text-brand";
          } else {
            cls += " text-neutral-700 hover:bg-neutral-100";
          }

          // Round only the outer corners of the range
          if (isStart && range.end) cls += " rounded-l-md";
          if (isEnd) cls += " rounded-r-md";
          if (onlyStart) cls += " rounded-md";
          if (!isEdge && !inRange && cell.inMonth) cls += " rounded-md";

          return (
            <button
              key={i}
              onClick={() => handleDayClick(cell.date)}
              className={cls}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  // Monday-first: shift Sunday (0) to the end.
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const grid = [];
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    grid.push({
      date: new Date(year, month - 1, prevLastDate - i),
      inMonth: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({ date: new Date(year, month, d), inMonth: true });
  }
  let nextDay = 1;
  while (grid.length < 42) {
    grid.push({ date: new Date(year, month + 1, nextDay++), inMonth: false });
  }
  return grid;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(day, start, end) {
  if (!start || !end) return false;
  const t = day.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

function formatDay(date, monthShort) {
  return `${monthShort[date.getMonth()]} ${date.getDate()}`;
}

function formatRange(start, end, monthShort) {
  if (start.getMonth() === end.getMonth()) {
    return `${monthShort[start.getMonth()]} ${start.getDate()} → ${end.getDate()}`;
  }
  return `${formatDay(start, monthShort)} → ${formatDay(end, monthShort)}`;
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
