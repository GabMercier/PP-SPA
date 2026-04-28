import { useEffect, useState, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'

// Wrap a state update in the View Transitions API when available so paired
// elements (e.g. the architecture titles) morph from one layout to the next
// instead of crossfading. Per-element animations are tuned in index.css.
// Falls back to a plain update on browsers without VT support.
function withTransition(fn) {
  if (typeof document !== 'undefined' && document.startViewTransition) {
    document.startViewTransition(() => flushSync(fn))
  } else {
    fn()
  }
}

const LANGS = ['en', 'fr']
const DEFAULT_LANG = 'en'

// URL hash format: #/<slide>/<step>/<lang>  (e.g. #/2/1/fr)
// Hash routing keeps deep-linking working on GitHub Pages without server config.
function parseHash() {
  if (typeof window === 'undefined') return {}
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [s, st, l] = raw.split('/')
  const slide = Number.parseInt(s, 10)
  const step = Number.parseInt(st, 10)
  return {
    slide: Number.isFinite(slide) ? slide : null,
    step: Number.isFinite(step) ? step : null,
    lang: LANGS.includes(l) ? l : null,
  }
}

function buildHash(slide, step, lang) {
  return `#/${slide}/${step}/${lang}`
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

// Design viewport for the scale-to-fit wrapper. Matches the logical viewport
// you'd get from ctrl-+ at 125% on a 1920×1080 monitor, so the deck reads at
// the same proportions on bigger screens (scaled up) and stays legible on
// smaller ones (scaled down) without re-flowing the layout. Only used above
// the 900px breakpoint; below that the deck switches to a stacked flow.
const DESIGN_W = 1536
const DESIGN_H = 864
const NARROW_BREAKPOINT = 900

/**
 * SlideDeck — the presentation shell.
 *
 * Owns the (slideIndex, slideStep, lang) cursor for the whole deck, mirrored
 * to the URL hash so any state can be deep-linked or shared. Slides are
 * controlled: each receives `step`, `lang`, and `setLang` as props. The deck
 * handles all keyboard navigation and renders a single progress bar.
 *
 * History model: every slide/step navigation is a pushState entry, so the
 * browser back button steps backward through the deck (and forward replays).
 * Language toggles are replaceState — they shouldn't pollute history.
 *
 * Slide registration (in App.jsx) declares each slide's number of sub-steps:
 *   { component: SlideX, title: '...', steps: N }
 *
 * Keyboard:
 *   ← / →     walk through every (slide, step) station, in order
 *   PageUp/Dn same
 *   Space     forward
 *   Home/End  jump to first/last station
 *   F         toggle browser fullscreen
 */
export default function SlideDeck({ slides }) {
  const initial = parseHash()
  const [slideIndex, setSlideIndex] = useState(() =>
    initial.slide != null ? clamp(initial.slide, 0, slides.length - 1) : 0,
  )
  const [slideStep, setSlideStep] = useState(() => {
    if (initial.step == null) return 0
    const startSlide = initial.slide ?? 0
    const maxStep = (slides[startSlide]?.steps ?? 1) - 1
    return clamp(initial.step, 0, maxStep)
  })
  const [lang, setLangState] = useState(initial.lang ?? DEFAULT_LANG)

  const currentSlide = slides[slideIndex]
  const currentSteps = currentSlide?.steps ?? 1

  // Clamp on HMR / slide-list edits so we never point past the end.
  useEffect(() => {
    if (slideIndex >= slides.length) {
      setSlideIndex(Math.max(0, slides.length - 1))
      setSlideStep(0)
    } else if (slideStep >= currentSteps) {
      setSlideStep(Math.max(0, currentSteps - 1))
    }
  }, [slides.length, slideIndex, slideStep, currentSteps])

  // Normalize the URL on first mount so it always reflects the current state
  // (e.g. arriving on `#` or a partial hash). replaceState — we don't want
  // the back button to undo this initial canonicalization.
  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    const hash = buildHash(slideIndex, slideStep, lang)
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash)
    }
  }, [slideIndex, slideStep, lang])

  // Latest-state ref for use inside event handlers (hashchange) so we don't
  // need to re-bind the listener on every state change.
  const stateRef = useRef({ slideIndex, slideStep, lang })
  useEffect(() => {
    stateRef.current = { slideIndex, slideStep, lang }
  }, [slideIndex, slideStep, lang])

  // URL → state. Fires on browser back/forward and on direct hash edits in
  // the URL bar; pushState/replaceState do NOT fire it, so we don't risk
  // echoing our own writes.
  useEffect(() => {
    const handler = () => {
      const parsed = parseHash()
      const cur = stateRef.current
      const nextSlide =
        parsed.slide != null
          ? clamp(parsed.slide, 0, slides.length - 1)
          : cur.slideIndex
      const maxStep = (slides[nextSlide]?.steps ?? 1) - 1
      const nextStep =
        parsed.step != null ? clamp(parsed.step, 0, maxStep) : 0
      const nextLang = parsed.lang != null ? parsed.lang : cur.lang
      withTransition(() => {
        setSlideIndex(nextSlide)
        setSlideStep(nextStep)
        setLangState(nextLang)
      })
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [slides])

  // Slide/step navigation — pushes a new history entry so browser back walks
  // backwards through the deck. Skips the push if the target equals current
  // state (we're already there) so dead-end keys don't clutter history.
  const navigate = useCallback(
    (newIndex, newStep) => {
      if (newIndex === slideIndex && newStep === slideStep) return
      withTransition(() => {
        setSlideIndex(newIndex)
        setSlideStep(newStep)
      })
      window.history.pushState(
        null,
        '',
        buildHash(newIndex, newStep, lang),
      )
    },
    [slideIndex, slideStep, lang],
  )

  const goNext = useCallback(() => {
    if (slideStep < currentSteps - 1) {
      navigate(slideIndex, slideStep + 1)
    } else if (slideIndex < slides.length - 1) {
      navigate(slideIndex + 1, 0)
    }
  }, [slideIndex, slideStep, currentSteps, slides.length, navigate])

  const goPrev = useCallback(() => {
    if (slideStep > 0) {
      navigate(slideIndex, slideStep - 1)
    } else if (slideIndex > 0) {
      const prev = slides[slideIndex - 1]
      const prevSteps = prev?.steps ?? 1
      navigate(slideIndex - 1, prevSteps - 1)
    }
  }, [slideIndex, slideStep, slides, navigate])

  const goFirst = useCallback(() => {
    navigate(0, 0)
  }, [navigate])

  const goLast = useCallback(() => {
    const last = slides.length - 1
    const lastSteps = slides[last]?.steps ?? 1
    navigate(last, lastSteps - 1)
  }, [slides, navigate])

  // Language change — replaceState, not pushState. Toggling FR/EN shouldn't
  // create a back-able history entry; the audience expects "back" to undo
  // the last slide/step move.
  const setLang = useCallback(
    (newLang) => {
      setLangState(newLang)
      window.history.replaceState(
        null,
        '',
        buildHash(slideIndex, slideStep, newLang),
      )
    },
    [slideIndex, slideStep],
  )

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          goPrev()
          break
        case 'Home':
          goFirst()
          break
        case 'End':
          goLast()
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev, goFirst, goLast, toggleFullscreen])

  const CurrentSlide = currentSlide?.component

  // Scale-to-fit. The .deck-scaled wrapper has a fixed CSS size of DESIGN_W ×
  // DESIGN_H. Above the breakpoint we set an inline transform that scales it
  // down (or up) to match the viewport, preserving the design proportions on
  // any screen size. Below the breakpoint we clear the transform and let CSS
  // unpin the wrapper to a normal block (see .deck-scaled @media in index.css).
  const deckRef = useRef(null)
  useEffect(() => {
    const node = deckRef.current
    if (!node) return
    const apply = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      if (vw < NARROW_BREAKPOINT) {
        node.style.transform = ''
        return
      }
      const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H)
      node.style.transform = `translate(-50%, -50%) scale(${scale})`
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  return (
    <div className="w-screen h-screen bg-white overflow-hidden relative max-[900px]:h-auto max-[900px]:overflow-visible">
      <div ref={deckRef} className="deck-scaled bg-white">
        {/* Slide region. Re-keyed on slideIndex so each new slide eases in;
            step changes within a slide do not remount. */}
        <div
          key={slideIndex}
          className="w-full h-full animate-slide-fade-in max-[900px]:h-auto max-[900px]:min-h-screen"
        >
          {CurrentSlide ? (
            <CurrentSlide step={slideStep} lang={lang} setLang={setLang} />
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Deck-wide progress bar at the top. */}
        <ProgressBar
          slides={slides}
          slideIndex={slideIndex}
          slideStep={slideStep}
        />

        {/* Home button — jumps back to the title slide. Hidden on the title
            itself since there is nowhere to go back to. */}
        {slideIndex > 0 && <HomeButton onClick={goFirst} lang={lang} />}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="w-full h-full flex items-center justify-center text-slate-400">
      No slides registered yet. Add one to <code className="mx-1">src/slides/</code> and
      register it in <code className="mx-1">App.jsx</code>.
    </div>
  )
}

/* Progress bar
 * --------------------------------------------------------------------------
 * Sits at the top of the deck. Hidden on the title slide so it doesn't
 * compete with the breathing dot — the title doesn't count toward progress.
 *
 * The boundary markers (one per non-title slide) are evenly distributed
 * across the bar. Sub-steps are NOT part of the equal distribution: they
 * sit at proportional positions inside the gap between their slide's
 * boundary and the next, and only become visible when the user is actually
 * stopped on that sub-step. The fill line still extends to the current
 * position so the audience sees progress smoothly.
 */
function ProgressBar({ slides, slideIndex, slideStep }) {
  // Hide entirely on the title slide.
  if (slideIndex === 0) return null

  // Boundaries = every slide except the title.
  const boundaries = slides.slice(1).map((s, i) => ({
    deckIndex: i + 1,
    steps: s?.steps ?? 1,
  }))
  const denom = Math.max(1, boundaries.length - 1)
  const currentBoundaryIdx = boundaries.findIndex(
    (b) => b.deckIndex === slideIndex,
  )
  const currentBoundary = boundaries[currentBoundaryIdx]

  // Where the playhead sits (0..1 of bar width).
  let activePos
  if (slideStep === 0 || !currentBoundary) {
    activePos = currentBoundaryIdx / denom
  } else {
    // Place sub-step proportionally inside the gap to the next boundary so
    // the fill line slides smoothly through it.
    const stepFraction = slideStep / currentBoundary.steps
    activePos = (currentBoundaryIdx + stepFraction) / denom
  }
  const fillPct = activePos * 100

  return (
    <div
      className="absolute top-2 left-16 right-16 pointer-events-none max-[900px]:left-4 max-[900px]:right-4"
      style={{ viewTransitionName: 'deck-progress' }}
    >
      <div className="relative h-3">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-200 -translate-y-1/2" />
        {/* Filled portion up to the playhead */}
        <div
          className="absolute left-0 top-1/2 h-[2px] bg-brand -translate-y-1/2 transition-all duration-300 ease-out"
          style={{ width: `${fillPct}%` }}
        />
        {/* Boundary markers, evenly distributed */}
        {boundaries.map((b, i) => {
          const onThisBoundary =
            b.deckIndex === slideIndex && slideStep === 0
          const isPast =
            b.deckIndex < slideIndex ||
            (b.deckIndex === slideIndex && slideStep > 0)
          return (
            <BoundaryMarker
              key={b.deckIndex}
              leftPct={(i / denom) * 100}
              active={onThisBoundary}
              past={isPast}
            />
          )
        })}
        {/* Active sub-step marker — only rendered when stopped on a sub-step */}
        {slideStep > 0 && currentBoundary && (
          <SubstepMarker leftPct={fillPct} />
        )}
      </div>
    </div>
  )
}

function HomeButton({ onClick, lang }) {
  const label = lang === 'fr' ? 'Retour au début' : 'Back to start'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="absolute top-1.5 left-3 w-6 h-6 flex items-center justify-center rounded text-neutral-400 hover:text-brand hover:bg-neutral-100 transition-colors max-[900px]:left-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </svg>
    </button>
  )
}

function BoundaryMarker({ leftPct, active, past }) {
  const filled = active || past
  const size = active ? 'w-3 h-3' : 'w-2 h-2'
  const color = filled ? 'bg-brand' : 'bg-neutral-300'
  return (
    <span
      className={`absolute top-1/2 rounded-full ${size} ${color} transition-all duration-300 ease-out ${
        active ? 'ring-2 ring-brand/15' : ''
      }`}
      style={{ left: `${leftPct}%`, transform: 'translate(-50%, -50%)' }}
    />
  )
}

function SubstepMarker({ leftPct }) {
  return (
    <span
      className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-brand ring-2 ring-brand/20 transition-all duration-300 ease-out"
      style={{ left: `${leftPct}%`, transform: 'translate(-50%, -50%)' }}
    />
  )
}
