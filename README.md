# PP-SPA

Local React/Vite scaffold for building and presenting slide decks.

---

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173, press **F** for fullscreen, **← / →** to navigate.

## build

```bash
npm run build
```

Then open `dist/index.html` directly in Chrome. No network required, the bundle works fully offline.

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |

---

## Adding a slide

### 1. Create the file

Create `src/slides/MySlide.jsx`. Each slide is a default-exported React component that fills `100%` of its parent and receives three props from the deck:

| Prop | What it is |
|------|------------|
| `step` | Current sub-step index (0-based). Use it to reveal content progressively. |
| `lang` | Current language (`'en'` or `'fr'`). |
| `setLang` | Setter so the slide can render the `LangToggle` corner control. |

Minimal skeleton:

```jsx
import LangToggle from '../components/LangToggle'

const COPY = {
  en: { title: 'Hello' },
  fr: { title: 'Bonjour' },
}

export default function MySlide({ step = 0, lang = 'en', setLang }) {
  const t = COPY[lang] ?? COPY.en
  return (
    <section className="w-full h-full bg-white flex flex-col">
      <header className="px-20 pt-6 flex justify-end">
        {setLang && <LangToggle lang={lang} setLang={setLang} />}
      </header>
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-6xl font-medium text-neutral-900">{t.title}</h1>
      </main>
    </section>
  )
}
```

### 2. Register it in `App.jsx`

```jsx
import MySlide from './slides/MySlide'

const slides = [
  // ...existing slides
  { component: MySlide, title: 'My Slide', steps: 1 },
]
```

`steps` is how many stations the slide has. The deck walks through every `(slide, step)` pair with the arrow keys, so a slide with `steps: 3` will be visited three times before moving on.

### 3. Use `step` for progressive reveals (optional)

```jsx
{step === 0 && <Intro />}
{step >= 1 && <Details />}
{step >= 2 && <Summary />}
```

Bump `steps` in `App.jsx` to match.

### Conventions and tooling

- The deck is designed at a fixed 1536x864 logical viewport and scaled to fit the screen, so use absolute pixel sizes freely (`text-[26px]`, `px-20`, etc.). Below 900px wide the deck switches to a stacked flow, so add `max-[900px]:` Tailwind variants where layout would otherwise break.
- Use the `brand` Tailwind color (`bg-brand`, `text-brand`, `border-brand/30`) for the accent. It's mapped in `tailwind.config.js`.
- `recharts` and `lucide-react` are already installed. For other libraries: `npm install <name>` and you're good.
- For an offline demo, save images to `public/` and reference them as `/image.png` rather than external CDNs.
- For smooth morphs between steps, set a `viewTransitionName` style on paired elements. The deck wraps state changes in `document.startViewTransition` automatically.

---

## File structure

```
PP-SPA/
├── index.html
├── package.json
├── tailwind.config.js       ← brand color tokens defined here
├── vite.config.js
├── src/
│   ├── main.jsx             ← entry point
│   ├── App.jsx              ← slide registry, edit this to add slides
│   ├── index.css            ← Tailwind directives
│   ├── components/
│   │   ├── SlideDeck.jsx    ← navigation, keyboard, counter
│   │   └── Slide.jsx        ← optional per-slide wrapper
│   └── slides/              ← one file per slide
```

