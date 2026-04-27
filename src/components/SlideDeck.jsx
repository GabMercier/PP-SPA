import { useEffect, useState, useCallback } from 'react'
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

/**
 * SlideDeck — the presentation shell.
 *
 * Owns the (slideIndex, slideStep) cursor for the whole deck. Slides are
 * controlled: each receives `step` as a prop and renders accordingly. The
 * deck handles all keyboard navigation and renders a single progress bar
 * across the bottom that shows both the slide and sub-step position.
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
  const [slideIndex, setSlideIndex] = useState(0)
  const [slideStep, setSlideStep] = useState(0)

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

  const goNext = useCallback(() => {
    withTransition(() => {
      if (slideStep < currentSteps - 1) {
        setSlideStep((s) => s + 1)
      } else if (slideIndex < slides.length - 1) {
        setSlideIndex((i) => i + 1)
        setSlideStep(0)
      }
    })
  }, [slideIndex, slideStep, currentSteps, slides.length])

  const goPrev = useCallback(() => {
    withTransition(() => {
      if (slideStep > 0) {
        setSlideStep((s) => s - 1)
      } else if (slideIndex > 0) {
        const prev = slides[slideIndex - 1]
        const prevSteps = prev?.steps ?? 1
        setSlideIndex((i) => i - 1)
        setSlideStep(prevSteps - 1)
      }
    })
  }, [slideIndex, slideStep, slides])

  const goFirst = useCallback(() => {
    withTransition(() => {
      setSlideIndex(0)
      setSlideStep(0)
    })
  }, [])

  const goLast = useCallback(() => {
    withTransition(() => {
      const last = slides.length - 1
      const lastSteps = slides[last]?.steps ?? 1
      setSlideIndex(last)
      setSlideStep(lastSteps - 1)
    })
  }, [slides])

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

  return (
    <div className="w-screen h-screen bg-white relative overflow-hidden">
      {/* Slide region. Re-keyed on slideIndex so each new slide eases in;
          step changes within a slide do not remount. */}
      <div key={slideIndex} className="w-full h-full animate-slide-fade-in">
        {CurrentSlide ? (
          <CurrentSlide step={slideStep} />
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Deck-wide progress bar at the bottom. */}
      <ProgressBar slides={slides} slideIndex={slideIndex} slideStep={slideStep} />
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
      className="absolute top-6 left-16 right-16 pointer-events-none"
      style={{ viewTransitionName: 'deck-progress' }}
    >
      <div className="relative h-4">
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

function BoundaryMarker({ leftPct, active, past }) {
  const filled = active || past
  const size = active ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'
  const color = filled ? 'bg-brand' : 'bg-neutral-300'
  return (
    <span
      className={`absolute top-1/2 rounded-full ${size} ${color} transition-all duration-300 ease-out ${
        active ? 'ring-4 ring-brand/15' : ''
      }`}
      style={{ left: `${leftPct}%`, transform: 'translate(-50%, -50%)' }}
    />
  )
}

function SubstepMarker({ leftPct }) {
  return (
    <span
      className="absolute top-1/2 w-2 h-2 rounded-full bg-brand ring-2 ring-brand/20 transition-all duration-300 ease-out"
      style={{ left: `${leftPct}%`, transform: 'translate(-50%, -50%)' }}
    />
  )
}
