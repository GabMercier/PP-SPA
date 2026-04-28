const LANGS = ["en", "fr"];

export default function LangToggle({ lang, setLang, className = "" }) {
  return (
    <div
      className={`flex items-center gap-2 text-[13px] tracking-[0.2em] uppercase ${className}`}
    >
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
