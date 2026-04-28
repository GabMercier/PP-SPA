import { ArrowLeft, ArrowRight } from 'lucide-react'
import LangToggle from '../components/LangToggle'

const COPY = {
  en: {
    instruction: ['Press', 'to walk through'],
  },
  fr: {
    instruction: ['Appuyez sur', 'pour avancer'],
  },
}

/**
 * Title / loading slide.
 *
 * The breathing dot anchors the screen; a single instruction line sits in the
 * footer and pulses in sync with it, so the call to action shares the same
 * rhythm as the visual. The language toggle in the corner lets the user pick
 * a language before walking through; the choice is carried into every slide.
 */
export default function SlideTitle({ lang = 'en', setLang }) {
  const t = COPY[lang] ?? COPY.en

  return (
    <section className="relative w-full h-full bg-white flex items-center justify-center">
      <div className="absolute top-12 right-16 max-[900px]:right-4">
        {setLang && <LangToggle lang={lang} setLang={setLang} />}
      </div>

      <div className="w-24 h-24 rounded-full bg-brand animate-breathe" />

      <div className="absolute inset-x-0 bottom-12 flex justify-center">
        <span className="inline-flex items-center gap-3 text-[18px] tracking-[0.18em] uppercase text-neutral-500 animate-breathe-fade">
          {t.instruction[0]}
          <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
          <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
          {t.instruction[1]}
        </span>
      </div>
    </section>
  )
}
