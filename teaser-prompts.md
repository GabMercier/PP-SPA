# Claude Design Prompts — Portal Teaser (Monday Meeting)

**Context:** 5-10 minute slot · Manager + a couple of devs · Goal = plant the idea, no commitment yet.

**Tone:** Curious, exploratory, low-pressure. We are NOT pitching a migration on Monday — we are asking for time to present a real proposal later.

**Visual system:**
- Brand teal: `#00a68f` (use as a single accent — never as a fill for big areas)
- White background, generous whitespace, clean sans-serif typography
- No images, no logos, no glossy effects
- The deck itself is a React SPA — let the medium reinforce the message

**Workflow:**
1. Paste each prompt into Claude Design, one at a time
2. Iterate in plain English ("make the headline bigger", "tighten the spacing")
3. Once a slide looks right, copy the component code into `src/slides/`
4. Tell subsequent prompts: *"match the visual style of the previous slide exactly"*
5. Add `"use only Tailwind classes and lucide-react, no shadcn"` to each prompt to avoid import issues in the local scaffold

---

## PROMPT 1 — The Hook

```
Create a presentation slide (React artifact) for a low-key, exploratory technical talk.

Use only Tailwind classes and lucide-react. No shadcn imports.

Title (smaller, top-left): "Client Portal"
Main headline (large, centered): "A thought experiment"
Subtitle below headline: "What if the portal was easier to build on?"
Footer (small, bottom): "Intelcom — Internal Tech Discussion"

Tone: curious, open, not pitchy. The phrase "thought experiment" should feel intentional — this is not a proposal, it's an invitation to think together.

Design:
- Clean white background, full window
- Use teal (#00a68f) as a single accent — maybe a thin underline under the headline, or a small geometric mark
- Generous whitespace
- Typography-driven — no images, no diagrams
- Headline should breathe; let it be the focal point
- Avoid anything that feels like a sales pitch (no big logos, no glossy effects)
- The slide should fill the entire browser window (use w-full h-full, not fixed dimensions)
```

---

## PROMPT 2 — The Visual Tease

```
Create a presentation slide (React artifact) showing a simple architectural diagram of how the current portal works.

Use only Tailwind classes and lucide-react. No shadcn imports. Match the visual style of the previous slide (white background, teal accent, clean typography).

Title (top-left, modest): "How a portal page renders today"

Main visual: Three horizontal bands stacked vertically, with thin downward arrows between them showing flow.

BAND 1 (top, slim) — labeled "Power Pages platform"
- Sub-label: "Renders the page from Liquid templates"
- Visual weight: light, neutral gray

BAND 2 (middle, VISUALLY DOMINANT — significantly thicker than the other two) — labeled "Our customizations"
- Sub-labels arranged inside the band: "Custom JS", "Custom CSS", "DOM adjustments", "API patches", "Validators"
- Visual weight: heavy — this is the focus of the diagram
- Use a slightly warmer/denser color than the other bands (a muted clay or warm gray) — NOT alarming red, just visually heavier
- The labels inside should feel a bit dense/cluttered, suggesting "lots happening here"

BAND 3 (bottom, slim) — labeled "What the user sees"
- Sub-label: "The final page in the browser"
- Visual weight: light, neutral gray

NO bullet points outside the diagram. NO line counts. NO statistics. The visual should speak for itself — the middle band's weight conveys "this is where the complexity lives."

Design:
- White background, full window
- Bands as full-width horizontal rectangles with rounded corners
- Teal (#00a68f) ONLY for the title underline or a small accent — bands stay neutral
- Clean sans-serif typography
- The whole thing should feel like a calm, observational diagram — not an alarm
- The slide should fill the entire browser window
```

---

## PROMPT 3 — The Soft Ask

```
Create a closing presentation slide (React artifact) for a no-commitment exploratory pitch.

Use only Tailwind classes and lucide-react. No shadcn imports. Match the visual style of the previous slides.

Title: "What I'm working on"

Four short lines, generously spaced, each with a small teal checkmark or dot bullet:

1. "A closer look at the portal's customization layer"
2. "Options for a lighter, more sustainable approach"
3. "Same backend — Dataverse, Power Automate, AAD B2C all stay"
4. "Can live alongside the existing portal — no migration"

Below those four lines, a soft call-to-action in slightly larger text:
"Looking for 20-30 minutes in the next couple weeks to walk through what I'm seeing."

Design:
- White background, full window
- Teal (#00a68f) for the bullet markers and the CTA emphasis
- Lots of whitespace
- Lines 3 AND 4 should be visually emphasized (slightly bolder, or a subtle teal underline). These are the reassurance lines that change how the audience perceives risk.
- Avoid anything that looks like a "next steps" slide from a corporate deck — keep it conversational
- The slide should fill the entire browser window
```

---

## Talking notes (your script for Monday)

**Slide 1 (~30 sec):**
> "I want to spend a few minutes on something I've been thinking about with the client portal. This isn't a proposal — more of a thought experiment I wanted to share early."

**Slide 2 (~3-4 min):**
> "Here's roughly how every page in the portal works today. Power Pages renders the page from Liquid templates, and then in the browser, we layer on a lot of customizations — JavaScript that adjusts the layout, CSS overrides, validation tweaks, that kind of thing. It works, and the team has done good work to make it work. But the more I look at the maintenance picture, the more I wonder if there's a lighter path."

[pause for any reactions/questions]

**Slide 3 (~1-2 min):**
> "So I'm taking a closer look — same backend, same data, same auth — just thinking about whether there's a more sustainable approach to the front-end layer. And the new app could live alongside the existing portal for as long as we want, no migration weekend, no big switch. We could stand up one screen, see how it feels, and decide from there.
>
> I'd love 20-30 minutes in the next couple weeks to walk you through what I'm finding. No commitment — I'd just rather hear your input early than show up with a finished proposal."

[pause, half-smile]

> **"By the way — this presentation you're looking at? It's a small React SPA. Local Chrome window, no server, no PowerPoint. Took me an afternoon. That's roughly the kind of thing I'm thinking about for the portal."**

---

## Q&A prep

**"What's the alternative?"**
> "Probably a small React app talking to the same Power Automate flows — but I want to validate that before I make any claim. That's what the deeper review is for."

**"The JS isn't that bad."**
> "You might be right — that's part of what I want to verify. Want to be in the deeper review when I do it?"

**"How hard would this actually be?"**
> "This deck took me an afternoon, including the scaffold. The portal is obviously bigger, but the per-screen complexity is similar to one of these slides. That's part of what I want to scope properly in the deeper review."

**"Do you have more?"**
> "I'm still organizing it — want to make sure I get it right before I share."

---

## Things to avoid on Monday

- ❌ Don't show line counts (15,600 lines, etc.) — save for the real deck
- ❌ Don't list anti-patterns — save for the real deck
- ❌ Don't say "Power Pages is bad" — frame as "we've outgrown a specific use of it"
- ❌ Don't announce upfront that the deck is a SPA — let it be discovered at the end
- ❌ Don't show DevTools or the file structure — the proof is them using it without noticing
- ❌ Don't commit to a timeline — the only ask is 20-30 min for a follow-up
