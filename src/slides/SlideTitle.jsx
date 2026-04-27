import Slide from '../components/Slide'

/**
 * EXAMPLE SLIDE — the title slide.
 *
 * This is hand-written to show the pattern. When you generate a real slide
 * in Claude Design, you'll typically:
 *   1. Copy the component code from the artifact
 *   2. Paste it into a new file in this folder (e.g. Slide0A.jsx)
 *   3. Make sure it has `export default function ...`
 *   4. Register it in App.jsx
 *
 * Most Claude Design artifacts will use Tailwind classes that work as-is here.
 * If they import from '@/components/ui/...' (shadcn), either install shadcn
 * or ask Claude to rewrite without it.
 */
export default function SlideTitle() {
  return (
    <Slide className="items-center justify-center text-center">
      {/* Subtle accent bar above the title */}
      <div className="w-20 h-1 bg-brand mb-8" />

      <h1 className="text-6xl font-bold text-slate-900 tracking-tight max-w-4xl">
        Client Portal
        <span className="block text-brand mt-2">From Power Pages to SPA</span>
      </h1>

      <p className="mt-8 text-2xl text-slate-500 font-light">
        A path to owning our UI/UX
      </p>

      <p className="mt-4 text-sm text-brand tracking-wide">
        GA February 8, 2026 · supported runtime, not preview
      </p>

      <p className="mt-16 text-sm text-slate-400 uppercase tracking-widest">
        Intelcom · Internal Tech Presentation
      </p>
    </Slide>
  )
}
