import SlideDeck from './components/SlideDeck'

import SlideTitle from './slides/SlideTitle'
import Slide01_TwoArchitectures from './slides/Slide01_TwoArchitectures'
import Slide02_HowItRendersToday from './slides/Slide02_HowItRendersToday'
import Slide03_StaysChangesGone from './slides/Slide03_StaysChangesGone'
import Slide04_WhatWeGetBack from './slides/Slide04_WhatWeGetBack'
import Slide05_LiveExamples from './slides/Slide05_LiveExamples'

/**
 * The slide registry. Order in this array = order in the deck.
 *
 * Tight version: drop the last two entries (Slide04 + Slide05) to end on
 * Slide03. That leaves the deck at Title → Two Architectures → How It Renders
 * Today → What Stays / Changes / Gone, which is the natural narrative landing.
 *
 * To add a new slide:
 *   1. Create src/slides/SlideXX.jsx
 *   2. Import it above
 *   3. Add { component: SlideXX, title: '...' } to the array below
 */
const slides = [
  { component: SlideTitle, title: 'Title' },
  { component: Slide01_TwoArchitectures, title: 'Two Architectures' },
  { component: Slide02_HowItRendersToday, title: 'How It Renders Today' },
  { component: Slide03_StaysChangesGone, title: 'Stays / Changes / Gone' },
  { component: Slide04_WhatWeGetBack, title: 'What We Get Back' },
  { component: Slide05_LiveExamples, title: 'How It Behaves' },
]

export default function App() {
  return <SlideDeck slides={slides} />
}
