export default function Slide01_ThoughtExperiment() {
  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-neutral-900">
      {/* Top bar: eyebrow title */}
      <header className="px-16 pt-12">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
          <span className="text-sm tracking-[0.2em] uppercase text-neutral-500">
            Client Portal
          </span>
        </div>
      </header>

      {/* Main stage */}
      <main className="flex-1 flex flex-col items-center justify-center px-16 -mt-8">
        <p className="text-base tracking-[0.3em] uppercase text-neutral-400 mb-10">
          A thought experiment
        </p>

        <h1 className="text-center text-[120px] leading-[1.05] font-light tracking-tight text-neutral-900 max-w-[1400px]">
          What if the portal
          <br />
          was <span className="relative inline-block">
            <span className="relative z-10">easier</span>
            <span className="absolute left-0 right-0 bottom-2 h-[6px] bg-brand/90 z-0" />
          </span>{" "}
          to build on?
        </h1>

        <p className="mt-14 text-2xl text-neutral-500 font-light max-w-[900px] text-center">
          Not a proposal. Not a roadmap. Just a question worth sitting with.
        </p>
      </main>

      {/* Footer */}
      <footer className="px-16 pb-10 flex items-end justify-between">
        <div className="text-sm text-neutral-400 tracking-wide">
          Intelcom — Internal Tech Discussion
        </div>
        <div className="text-sm text-neutral-300 tabular-nums">
          01
        </div>
      </footer>
    </div>
  );
}
