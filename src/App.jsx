import SlideDeck from './components/SlideDeck'

import SlideTitle from './slides/SlideTitle'
import Slide01_TwoArchitectures from './slides/Slide01_TwoArchitectures'
import Slide03_StaysChangesGone from './slides/Slide03_StaysChangesGone'
import Slide05_LiveExamples from './slides/Slide05_LiveExamples'


// `steps` is the number of sub-steps each slide walks through. The deck owns
// the (slideIndex, slideStep) cursor and renders a progress bar that shows
// both, so each slide just receives `step` as a prop.
const slides = [
  { component: SlideTitle, title: 'Loading', steps: 1 },
  { component: Slide01_TwoArchitectures, title: 'Two Architectures', steps: 6 },
  { component: Slide03_StaysChangesGone, title: 'Single page application', steps: 2 },
  { component: Slide05_LiveExamples, title: 'How It Behaves', steps: 1 },
]

export default function App() {
  return <SlideDeck slides={slides} />
}
