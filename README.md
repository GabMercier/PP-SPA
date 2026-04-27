# Portal Pitch — SPA Migration Presentation

Local React/Vite scaffold for the **Client Portal: From Power Pages to SPA** presentation.

Slides are designed in Claude Design, then dropped into `src/slides/` as React components.

---

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173, press **F** for fullscreen, **← / →** to navigate.

## Demo build (offline-safe)

```bash
npm run build
```

Then open `dist/index.html` directly in Chrome. **No network required** — bundle works fully offline. This is what to use for the actual Monday demo.

> Tip: drop the `dist` folder somewhere stable (Desktop, OneDrive, USB) so you have a fallback if the dev server has issues.

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

1. Design the slide in [Claude Design](https://claude.ai/) — one prompt = one slide
2. Copy the React component code from the artifact
3. Create a new file: `src/slides/SlideX.jsx`
4. Paste the component code, ensure `export default function ...`
5. Open `src/App.jsx` and:
   - Import the slide at the top
   - Add it to the `slides` array

That's it — Vite hot-reloads, you'll see it immediately.

### Things to watch when pasting from Claude Design

- **Imports from `@/components/ui/...`** (shadcn) won't work out of the box. Either install shadcn (`npx shadcn@latest init`) or ask Claude to rewrite without it.
- **Image URLs** referencing external CDNs are fine but require internet. For an offline demo, save images to `public/` and reference them as `/image.png`.
- **`recharts`, `lucide-react`** are already installed. Other libs: `npm install <name>` and you're good.
- **Use the `brand` Tailwind color** (`bg-brand`, `text-brand`) for the teal accent — it's mapped to `#00a68f` in `tailwind.config.js`.

---

## File structure

```
portal-pitch/
├── index.html
├── package.json
├── tailwind.config.js       ← brand color tokens defined here
├── vite.config.js
├── src/
│   ├── main.jsx             ← entry point
│   ├── App.jsx              ← slide registry — edit this to add slides
│   ├── index.css            ← Tailwind directives
│   ├── components/
│   │   ├── SlideDeck.jsx    ← navigation, keyboard, counter
│   │   └── Slide.jsx        ← optional per-slide wrapper
│   └── slides/
│       ├── SlideTitle.jsx   ← example, hand-written
│       ├── Slide0A.jsx      ← placeholder — replace with Claude Design
│       ├── Slide0B.jsx      ← placeholder
│       └── Slide0C.jsx      ← placeholder
```

---

## Pre-demo checklist

- [ ] `npm run build` runs cleanly with no errors
- [ ] Open `dist/index.html` in Chrome — slides render correctly
- [ ] Test all arrow-key navigation
- [ ] Test fullscreen toggle (F)
- [ ] Verify on the actual screen/projector resolution you'll be using
- [ ] Have the `dist` folder backed up somewhere offline
# PP-SPA
