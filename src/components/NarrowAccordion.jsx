import { useEffect, useState } from "react";

const NARROW_BREAKPOINT = 900;

function useIsNarrow() {
  const get = () =>
    typeof window !== "undefined" && window.innerWidth < NARROW_BREAKPOINT;
  const [narrow, setNarrow] = useState(get);
  useEffect(() => {
    const handler = () => setNarrow(get());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return narrow;
}

/**
 * Renders children inline at wide viewports; on viewports under 900px the same
 * content is wrapped in a native <details> so the audience can collapse the
 * dense secondary block out of the way.
 *
 * The summary is only shown on narrow — wide-viewport layouts already have
 * their own section labels and don't need a redundant title.
 */
export default function NarrowAccordion({
  summary,
  children,
  defaultOpen = false,
  className = "",
}) {
  const narrow = useIsNarrow();
  if (!narrow) return <div className={className}>{children}</div>;
  return (
    <details
      open={defaultOpen}
      className={`group rounded-lg border border-neutral-200 bg-neutral-50/40 ${className}`}
    >
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-[14px] font-medium text-neutral-700 select-none">
        <span>{summary}</span>
        <span className="text-neutral-400 transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="px-4 pb-4 pt-1">{children}</div>
    </details>
  );
}
