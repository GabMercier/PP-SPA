import {
  Server,
  Wrench,
  Eye,
  FileCode2,
  Paintbrush,
  MousePointerClick,
  ShieldCheck,
  Plug,
  ArrowRight,
} from "lucide-react";

export default function Slide02_HowItRendersToday() {
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-neutral-900">
      {/* Eyebrow / title */}
      <header className="px-16 pt-12">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
          <span className="text-sm tracking-[0.2em] uppercase text-neutral-500">
            Power Pages website
          </span>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col px-16 pt-8 pb-2 gap-10 min-h-0">
        <FlowRow />
        <Annotations />
      </main>

      {/* Reserved footer space (intentionally empty) */}
      <footer className="h-20" aria-hidden="true" />
    </div>
  );
}

/* ---------- horizontal flow ---------- */

function FlowRow() {
  return (
    <div className="flex-1 flex items-stretch justify-between gap-8 min-h-0">
      <FlowCard
        tone="neutral"
        icon={Server}
        title="Power Pages platform"
        sub="Renders HTML from Liquid templates over Dataverse"
      />
      <FlowArrow />
      <CustomizationCard />
      <FlowArrow />
      <FlowCard
        tone="neutral"
        icon={Eye}
        title="What the user sees"
        sub="The final page, with every layer baked in"
      />
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex-none flex items-center justify-center w-12">
      <ArrowRight
        className="w-8 h-8 text-neutral-300"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  );
}

function FlowCard({ tone, icon: Icon, title, sub }) {
  const toneClass =
    tone === "brand"
      ? "bg-brand/[0.04] border-brand/40"
      : "bg-neutral-50 border-neutral-300";
  const iconWrap =
    tone === "brand"
      ? "bg-brand/15 text-brand"
      : "bg-white text-neutral-500 border border-neutral-200";

  return (
    <div
      className={`flex-1 max-w-[320px] border ${toneClass} rounded-2xl px-7 py-8 flex flex-col gap-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]`}
    >
      <span
        className={`flex-none w-12 h-12 rounded-xl flex items-center justify-center ${iconWrap}`}
      >
        <Icon className="w-6 h-6" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col">
        <span className="text-[20px] font-medium leading-tight text-neutral-800">
          {title}
        </span>
        <span className="text-[14px] text-neutral-500 mt-2 leading-relaxed">
          {sub}
        </span>
      </div>
    </div>
  );
}

/* The customization card is the centerpiece — a wider card whose body is a
   visible vertical stack of patches, so the "many layers piled up" idea
   still reads even though the overall flow goes left → right. */
function CustomizationCard() {
  const patches = [
    { label: "Custom CSS", icon: Paintbrush },
    { label: "Custom JS", icon: FileCode2 },
    { label: "DOM adjustments", icon: MousePointerClick },
    { label: "Validators", icon: ShieldCheck },
    { label: "API patches", icon: Plug },
  ];

  return (
    <div className="flex-[1.6] relative bg-brand/[0.04] border border-brand/30 rounded-2xl px-7 py-7 flex flex-col gap-5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="flex-none w-12 h-12 rounded-xl bg-brand/15 text-brand flex items-center justify-center">
          <Wrench className="w-6 h-6" strokeWidth={1.75} />
        </span>
        <div className="flex flex-col">
          <span className="text-[20px] font-medium text-neutral-800 leading-tight">
            Our customizations
          </span>
          <span className="text-[12px] tracking-[0.2em] uppercase text-brand/80 mt-1.5">
            layered on top
          </span>
        </div>
      </div>

      {/* Visible stack of patch strips */}
      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {patches.map((p, i) => (
          <PatchStrip key={p.label} index={i} total={patches.length} {...p} />
        ))}
      </div>
    </div>
  );
}

function PatchStrip({ label, icon: Icon, index, total }) {
  // Slight horizontal offset on alternating rows to suggest "stacked, not aligned"
  const offset = index % 2 === 0 ? "ml-0 mr-3" : "ml-3 mr-0";
  return (
    <div
      className={`${offset} bg-white border border-stone-300/80 rounded-md px-3 py-2 flex items-center gap-3 shadow-[0_1px_0_rgba(0,0,0,0.03)]`}
      style={{ zIndex: total - index }}
    >
      <Icon className="w-4 h-4 text-stone-500" strokeWidth={1.75} />
      <span className="text-[14px] text-stone-700">{label}</span>
      <span className="ml-auto text-[10px] tracking-[0.2em] uppercase text-stone-400">
        patch
      </span>
    </div>
  );
}

/* ---------- annotations ---------- */

function Annotations() {
  const points = [
    {
      n: "01",
      title: "Server renders first",
      body: "Power Pages emits a complete HTML page from Liquid before any of our code runs.",
    },
    {
      n: "02",
      title: "Then we patch it",
      body: "Our JS / CSS attach after the fact, observing the DOM, retrying, overriding what the platform produced.",
    },
    {
      n: "03",
      title: "User sees the sum of layers",
      body: "Every patch is still there at runtime. Load time, fragility and surface area all stack with it.",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-12 pt-2 border-t border-neutral-200">
      {points.map((p) => (
        <div key={p.n} className="flex gap-5 pt-6">
          <span className="text-[24px] font-light tabular-nums text-brand leading-none pt-0.5">
            {p.n}
          </span>
          <div className="flex flex-col">
            <span className="text-[16px] font-medium text-neutral-800 leading-snug">
              {p.title}
            </span>
            <span className="text-[14px] text-neutral-500 leading-relaxed mt-1.5">
              {p.body}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
