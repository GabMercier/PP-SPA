import { useEffect, useState, useCallback } from 'react'

/**
 * SlideDeck — the presentation shell.
 *
 * Responsibilities:
 *   1. Render the current slide full-window
 *   2. Listen for arrow keys (← / →) and Home / End to navigate
 *   3. Show a minimal slide counter in the corner (hidden in pure fullscreen, see CSS)
 *   4. Allow F to toggle browser fullscreen (handy during the demo)
 *
 * Each slide is just a React component. To add a slide:
 *   - drop a file in src/slides/SlideXX.jsx exporting a default component
 *   - import it in App.jsx and add it to the `slides` array passed here
 *
 * The deck is intentionally framework-light: no router, no state library.
 * For a 10-slide presentation that's overkill; useState handles it fine.
 */
export default function SlideDeck({ slides }) {
  const [index, setIndex] = useState(0)

  // Clamp index when slides array changes length (e.g. during dev with HMR)
  useEffect(() => {
    if (index >= slides.length) setIndex(slides.length - 1)
  }, [slides.length, index])

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, slides.length - 1))
  }, [slides.length])

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const goFirst = useCallback(() => setIndex(0), [])
  const goLast = useCallback(() => setIndex(slides.length - 1), [slides.length])

  // Toggle browser fullscreen — F11 also works but this gives a one-key option
  // that doesn't trigger the browser's "press Esc to exit" banner as aggressively.
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }, [])

  // Keyboard handler — registered once on mount
  useEffect(() => {
    const handler = (e) => {
      // Ignore when user is typing in an input (defensive, slides shouldn't have inputs)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // spacebar — common "advance" key for clickers
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

  const CurrentSlide = slides[index]?.component
  const slideTitle = slides[index]?.title ?? ''

  return (
    <div className="w-screen h-screen bg-white relative overflow-hidden">
      {/* The slide itself fills the whole window */}
      <div className="w-full h-full">
        {CurrentSlide ? <CurrentSlide /> : <EmptyState />}
      </div>

      {/* Slide counter — bottom-right, low-opacity so it doesn't dominate.
          Hide it during real demo if you prefer by removing this block. */}
      <div className="absolute bottom-3 right-4 text-xs font-medium text-slate-400 select-none pointer-events-none">
        <span className="tabular-nums">
          {index + 1} / {slides.length}
        </span>
        {slideTitle && <span className="ml-2 text-slate-300">· {slideTitle}</span>}
      </div>

      {/* First-load hint — fades after 3s. Helps when you forget the shortcuts. */}
      <KeyboardHint />
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

function KeyboardHint() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [])
  if (!visible) return null
  return (
    <div className="absolute bottom-3 left-4 text-xs text-slate-400 select-none pointer-events-none transition-opacity">
      ← → to navigate · F for fullscreen
    </div>
  )
}
