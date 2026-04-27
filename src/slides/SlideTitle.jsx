import { ArrowLeft, ArrowRight } from 'lucide-react'

/**
 * Title / loading slide.
 *
 * The breathing dot anchors the screen; a single instruction line sits in the
 * footer and pulses in sync with it, so the call to action shares the same
 * rhythm as the visual.
 */
export default function SlideTitle() {
  return (
    <section className="relative w-full h-full bg-white flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-brand animate-breathe" />

      <div className="absolute inset-x-0 bottom-12 flex justify-center">
        <span className="inline-flex items-center gap-3 text-[18px] tracking-[0.18em] uppercase text-neutral-500 animate-breathe-fade">
          Press
          <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
          <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
          to walk through
        </span>
      </div>
    </section>
  )
}
