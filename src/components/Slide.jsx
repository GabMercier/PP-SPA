/**
 * Slide — optional wrapper to give every slide a consistent frame.
 *
 * Use it like:
 *   export default function Slide0A() {
 *     return (
 *       <Slide>
 *         <h1>...</h1>
 *         ...
 *       </Slide>
 *     )
 *   }
 *
 * It's NOT required — slides can render anything they want. This is just a
 * convenience for the common case: padded, white background, content centered.
 *
 * If a Claude Design artifact already includes its own outer container,
 * skip this wrapper and just paste the component directly.
 */
export default function Slide({ children, className = '', bg = 'bg-white' }) {
  return (
    <section
      className={`w-full h-full ${bg} flex flex-col px-12 py-10 ${className}`}
    >
      {children}
    </section>
  )
}
