# Claude Design Prompts — Client Portal SPA Migration Presentation

Use these prompts in claude.ai (Claude Design / Artifacts). Each prompt is self-contained — paste it as-is and iterate from there.

---

## PROMPT 1 — Title Slide

```
Create a clean, modern presentation slide (React artifact) for a technical presentation.

Title: "Client Portal — From Power Pages to SPA"
Subtitle: "A path to owning our UI/UX"
Footer: "Intelcom — Internal Tech Presentation"

Design notes:
- Use a dark teal (#00a68f) as the primary accent color against a white or very light gray background
- Keep it minimal and professional
- No images needed, just strong typography
- Add a subtle geometric or abstract accent element
```

---

## PROMPT 2 — What We Have Today (Site Map)

```
Create a presentation slide (React artifact) showing an architecture overview of a Power Pages customer portal.

Title: "What We Have Today"

Show a visual site map with these areas as grouped blocks:

CASE MANAGEMENT (primary, highlighted):
- My Support (case list) — /Cases
- Case Details (view/edit) — /Case-Details  
- Contact Us (case creation wizard) — /contact-us
- Submit a Case — /submit-a-case

TRACKING:
- Tracking page — /tracking

ACCOUNT:
- Account, Profile, View Profile

UTILITY:
- Home, Claims, Report, Search, Notification Center, Feedback

AUTH:
- Azure AD B2C Sign-in

BACKEND (JSON endpoints served by Liquid templates):
- GetRelatedAccountJSON
- GetRelatedSubjectTranslatedJSON
- GetCategory / GetFrenchCategory
- GetFilterBusinessUnitsJSON

Below the map, add a stats bar:
"29 pages | 21 templates | 9 forms | 31 content snippets | Bilingual EN/FR"

Design: Use teal (#00a68f) to highlight the Case Management group. Other groups in neutral gray. Use a card or block layout, not a tree. Clean and scannable.
```

---

## PROMPT 3 — Case Management: The 3 Screens

```
Create a presentation slide (React artifact) that breaks down 3 case management screens side by side.

Title: "Case Management — 3 Core Screens"

Layout: 3 columns, one per screen. Each column has:
- Screen name and URL
- A simple wireframe-style diagram showing the layout
- Key features as bullet points
- Line count badge

COLUMN 1 — Case List (/Cases):
Wireframe: A table/grid with filter tabs above it (Open | Closed | Resolved) and an account-switcher dropdown
Features:
- Filterable grid with 12 pre-built views
- View switching (Open/Closed/Resolved + 7/30/60 day windows)
- Multi-account support via dropdown
- Search enabled, page size 10
Badge: "~580 lines JS (EN+FR)"

COLUMN 2 — Case Details (/Case-Details):
Wireframe: Left panel with 2 tabs (Case Details | Documents), right panel showing a message timeline. Header bar on top with title + status badge + action buttons
Features:
- Custom tab interface (details vs SharePoint docs)
- Header with status badges + Cancel/Reactivate buttons
- Comment timeline with author labels
- Tracking ID validation (calls Power Automate flow, shows POD images)
- File upload restricted to images + PDF
- Case reactivation workflow with modal
Badge: "~4,050 lines JS (EN+FR)" — use red/warning color for this badge

COLUMN 3 — Case Creation (/contact-us):
Wireframe: A multi-step form with progress indicator (Step 1 > Step 2 > Step 3)
Features:
- 3-step wizard: Category > Details + Tracking > File Upload
- Dynamic category hierarchy (Claims, Customer Service, IT, etc.)
- Tracking ID validation with 60-day eligibility check
- Environment-aware (dev/qa/preprod/prod GUID mappings)
- Dynamic field visibility and validation rules
Badge: "~4,700 lines JS (EN+FR)" — use red/warning color

Design: Use teal (#00a68f) accent. Wireframes should be simplified schematic boxes (not real UI), just enough to convey layout structure. Make it clear these are complex screens with heavy customization.
```

---

## PROMPT 4 — The Customization Tax (Anti-Patterns)

```
Create a presentation slide (React artifact) that visualizes the "customization tax" of building on Power Pages.

Title: "The Customization Tax"
Subtitle: "~15,600 lines of JS+CSS fighting the platform, not building features"

Section 1 — Line count breakdown (horizontal stacked bar chart or table):
| Page           | JS (EN) | JS (FR) | CSS (EN) | CSS (FR) |
|----------------|---------|---------|----------|----------|
| Case Details   | 1,833   | 2,219   | 420      | 370      |
| Contact Us     | 2,369   | 2,351   | 1,390    | 1,294    |
| My Support     | 264     | 321     | 232      | 231      |
| Tracking       | 742     | 798     | 261      | 204      |
| Submit a Case  | 265     | —       | —        | —        |

Section 2 — Anti-pattern gallery (icon + short label for each):
1. setTimeout / setInterval polling — "Waiting for platform to render"
2. MutationObserver on large subtrees — "Detecting injected content"  
3. DOM destruction & rebuild — "Tearing apart the form layout"
4. XMLHttpRequest prototype patching — "Intercepting platform API calls"
5. iframe contentDocument styling — "Reaching into SharePoint iframes"
6. Retry loops (10x500ms) — "Hoping elements exist by now"
7. Page_Validators[] manipulation — "Hacking the validation framework"
8. Duplicated EN/FR files — "No i18n, just copy-paste"

Design: Use red/orange tones for the anti-patterns to convey friction/cost. The data table should use a warm-to-hot color scale based on line count. Make this slide feel like a "weight" or "burden" visualization. Teal (#00a68f) for headers only.
```

---

## PROMPT 5 — How It Actually Works (The Hack Cycle)

```
Create a presentation slide (React artifact) with an animated or step-by-step flow diagram.

Title: "How Every Page Actually Works"
Subtitle: "The Power Pages customization cycle"

Show a circular or linear flow with these steps:

1. "Power Pages renders the form" — icon: server/cloud
2. "Wait 500-1000ms (setTimeout)" — icon: hourglass/clock  
3. "Query the DOM for elements" — icon: magnifying glass
4. "Element not found? Retry up to 10x" — icon: refresh/loop arrow
5. "Destroy the platform layout" — icon: demolition/break
6. "Rebuild the UI we actually want" — icon: construction/build
7. "Inject inline styles" — icon: paint brush
8. "Patch XHR / observe mutations" — icon: bandage/patch
9. "Hope nothing changes on platform update" — icon: crossed fingers / warning

Connect the steps with arrows. Make step 9 loop back to step 1 with a label "Next platform update..."

Design: Use a muted, slightly ominous feel. Gray background with steps in cards. Red accent for the "destroy" and "patch" steps. The overall message should be: this is fragile and unsustainable.
```

---

## PROMPT 6 — What a SPA Unlocks

```
Create a presentation slide (React artifact) showing a before/after comparison.

Title: "What a SPA with Server Logic Unlocks"

Layout: Two columns — "Today (Power Pages)" vs "Tomorrow (SPA)"

Row 1 — Rendering:
Today: "Platform renders → wait → destroy DOM → rebuild"
Tomorrow: "Components render exactly what we design"

Row 2 — Navigation:
Today: "Full page reload between every screen"  
Tomorrow: "Instant client-side routing, no reload"

Row 3 — Internationalization:
Today: "Entire JS files duplicated per language (~11K lines x2)"
Tomorrow: "Single codebase + i18n library (translation keys)"

Row 4 — State Management:
Today: "sessionStorage, localStorage, URL params, DOM attributes"
Tomorrow: "Centralized app state (React state / store)"

Row 5 — API Integration:
Today: "XHR patching, jQuery $.ajax, no types, no error boundaries"
Tomorrow: "Typed API client, proper error handling, loading states"

Row 6 — Form Validation:
Today: "Page_Validators[] array manipulation"
Tomorrow: "Schema-based validation (Zod, React Hook Form, etc.)"

Row 7 — Styling:
Today: "420+ lines of CSS overrides + inline .style.cssText injection"
Tomorrow: "Component-scoped styles, design system, theme tokens"

Row 8 — Testing:
Today: "Untestable (DOM manipulation on a live platform page)"
Tomorrow: "Unit tests, integration tests, Storybook, E2E"

Design: Use red/muted for the "Today" column and teal/green (#00a68f) for the "Tomorrow" column. Use checkmark and X icons. Make the contrast stark — this slide should make the case visually.
```

---

## PROMPT 7 — The Migration Path

```
Create a presentation slide (React artifact) showing a phased migration roadmap.

Title: "Proposed Path: Phased Migration"
Subtitle: "Keep the backend. Replace the presentation layer."

Show a horizontal timeline or phased roadmap with 3-4 phases:

PHASE 1 — "Foundation" (color: teal)
- Choose stack (e.g. Next.js / React + API layer)
- Set up project scaffold with i18n, auth (Azure AD B2C), routing
- Build API layer over Dataverse (OData / Web API) and existing Power Automate flows
- Design component library / design system (teal #00a68f theme)

PHASE 2 — "Case Management MVP" (color: teal, brighter)
- Case List screen (replace My Support entity list)
- Case Details screen (replace 1,800-line DOM hack)
- Case Creation wizard (replace 2,370-line form)
- Tracking validation integration
- Comment timeline component

PHASE 3 — "Full Portal" (color: teal, lighter)
- Account management, Profile
- Tracking page
- Home dashboard, Search, Reports
- Notification center

PHASE 4 — "Retire Power Pages" (color: green/success)
- Decommission Power Pages site
- Full SPA serves all routes
- Single deployment pipeline

Below the timeline, add a callout box:
"What stays: Dataverse (data), Power Automate (workflows), Azure AD B2C (auth), SharePoint (documents)"
"What goes: Power Pages rendering, Liquid templates, Entity Lists/Forms, 15K+ lines of DOM hacking JS"

Design: Clean horizontal timeline flowing left to right. Each phase is a card with bullets. Use teal gradient from dark to light across phases. The callout box at the bottom should feel reassuring — we're not throwing everything away.
```

---

## PROMPT 8 — Data Architecture (Optional / Appendix)

```
Create a presentation slide (React artifact) showing the data model for case management.

Title: "Data Model — What the SPA Would Talk To"

Show a simple entity relationship diagram with these entities as boxes:

INCIDENT (Case) — primary, highlighted:
Fields: title, description, statuscode, statecode, casetypecode, subjectid, customerid, in_trackingid, in_replytoemail, deactivatedon

ACCOUNT — connected to Incident via customerid:
Fields: name, address1_country

CONTACT — connected to Account via many-to-many (int_contact_account_many):
Fields: email, name

PORTAL COMMENT (adx_portalcomment) — connected to Incident:
Fields: description, adx_authorname, regardingobjectid

CATEGORY (crd6a_cpcategory):
Fields: name, parent category

SUBJECT TRANSLATION (in_subjecttranslation):
Fields: subject, language, translated label

ACCOUNT PARAMETERS (crea5_cp_accountsparameters):
Fields: API key, tracking URL, POD URL

Show relationships as lines between boxes with cardinality labels (1:N, M:N).

Below the diagram, list the API endpoints the SPA would call:
- Dataverse Web API: /api/data/v9.2/incidents, /accounts, /contacts
- Power Automate: Tracking validation flow, Case reactivation flow  
- SharePoint: Document library (existing integration)

Design: Clean ERD style with teal header bars on each entity box. Light gray background. Keep it readable — this is reference material, not the main pitch.
```

---

## Tips for Using These Prompts

1. **Paste one prompt at a time** into claude.ai — each creates one slide as a React artifact
2. **Iterate** — say "make the chart bigger", "use darker backgrounds", "add animation on hover", etc.
3. **Consistent theme** — if the first slide nails the look, tell subsequent prompts "match the style of the previous slide"
4. **Export** — screenshot the artifacts or use them as a base for Figma/PowerPoint
5. **Combine** — once you have all slides, you can ask Claude to "combine all these into a single multi-slide presentation artifact with navigation"