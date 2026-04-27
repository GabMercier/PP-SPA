# Client Portal - Site Portrait (Presentation Material)

## What It Is Today

A **bilingual (EN/FR) Power Pages customer portal** for Intelcom, built on top of Dataverse (the `incident` entity). It lets customers manage support cases, track packages, upload documents, and interact with agents — all through a browser UI rendered by the Power Pages platform.

---

## Site Map at a Glance

| Area | Pages | Purpose |
|------|-------|---------|
| **Case Management** | My Support, Case Details, Submit a Case, Contact Us | List, view/edit, create cases |
| **Tracking** | Tracking | Package tracking via external API |
| **Account** | Account, Profile, View Profile | User & account settings |
| **Utility** | Home, Claims, Report, Search, Notification Center, Feedback | Dashboard, reporting, search |
| **Auth** | Sign In (AAD B2C), Access Denied | Azure AD B2C login flow |
| **Backend (JSON endpoints)** | get-related-account-json, get-related-subject-translated-json, getcategory, get-filter-business-units-json | Liquid templates returning JSON for client-side consumption |

**Total: ~29 pages, 21 web templates, 9 basic forms, 1 advanced (multi-step) form, 31 content snippets.**

---

## Case Management Deep Dive

### 1. Case List — "My Support" (`/Cases`)

**What the user sees:** A filterable grid of their cases with columns for Status, Type, Subject, Customer, Country, Closed On. Supports view switching (Open / Closed / Resolved, each with 7/30/60-day windows). Account-switcher dropdown for multi-account users.

**How it works under the hood:**
- Power Pages `Entity List` component ("My Active Cases") queries the Dataverse `incident` entity
- 12 pre-built FetchXML views, page size 10, search enabled
- JS overrides (~264 lines EN, ~321 lines FR):
  - Intercepts "New Case" button click to redirect to `/Contact_Us` instead of native modal
  - Intercepts ticket number links to force same-tab navigation
  - Uses `MutationObserver` on `document.body` + `setInterval` polling to detect and restyle SharePoint modals (iframe `contentDocument` access)
  - Hides platform buttons inside iframes (New Folder, Update)

**Pain points:** iframe content styling via polling, fragile selectors, no control over grid rendering or pagination UX.

---

### 2. Case Details — "Case Details" (`/Case-Details`)

**What the user sees:** A two-panel layout — left side has a tab interface (Case Details | Related Documents), right side has the message/comment timeline. Header bar shows case title + status badge. Action buttons: Cancel Case, Reactivate Case.

**How it works under the hood:**
- Power Pages `Basic Form` ("Portal Case Form") in Edit mode on the `incident` entity
- **~1,800 lines of custom JS (EN)** that completely restructures the platform-rendered form:
  - `createTabInterface()` — tears apart the 3-column form layout, rebuilds it as a 2-tab interface (Case Details vs Related Documents/SharePoint grid)
  - `flattenHeader()` — extracts title + status from a fieldset, destroys the fieldset, injects a custom header bar
  - `moveButtonsToHeader()` — DOM-moves Cancel/Reactivate buttons from the bottom action bar to the header
  - `styleStatusBadges()` — merges status + state cells into styled badge elements
  - `controlCommentButton()` — disables "Add Comment" based on case state (Resolved/Cancelled) with retry loop (10 attempts x 500ms)
  - `setupFileValidation()` — restricts uploads to images + PDF, custom modal styling
  - Tracking ID validation — calls Power Automate flow via `$.ajax`, shows POD images, Confirm/Cancel workflow
  - Case reactivation — hijacks the native "Add Comment" modal, renames title/label, intercepts `XMLHttpRequest.prototype.send` to detect `AddPortalComment` API completion, then fires a second Flow call to reactivate
- **~420 lines of custom CSS (EN)** overriding buttons, modals, comment layout, SharePoint grid colors

**Pain points:**
- The entire UI is built by *destroying and rebuilding* the platform DOM after it renders (setTimeout 500ms)
- `XMLHttpRequest` prototype patching to intercept platform API calls
- `MutationObserver` on `.notes` container for live comment updates
- Duplicate function definition (`moveAuthorOrCreatedToIcon` defined twice)
- Inline styles via `.style.cssText` throughout — no component model
- Race conditions everywhere: retry loops, setTimeout chains, requestAnimationFrame polling

---

### 3. Case Creation — "Contact Us" (`/contact-us`) + "Submit a Case" (`/submit-a-case`)

**What the user sees:** A multi-step wizard: Step 1 (category selection) -> Step 2 (case details + tracking validation) -> Step 3 (file upload) -> redirect to case details.

**How it works under the hood:**
- Power Pages `Advanced Form` ("Contact-Us-Claims") — 3-step wizard with branching
- **~2,370 lines of custom JS (EN)** that:
  - Detects environment (dev/qa/preprod/prod) from URL to load correct GUID mappings for category dropdowns
  - Builds a category hierarchy (Claims > subcategories, Customer Service > subcategories, etc.) and dynamically filters Subject dropdowns
  - Injects tracking validation: calls Power Automate flow, checks 60-day claim eligibility window, shows inline POD images
  - Manipulates `Page_Validators[]` array (Power Pages internal validation framework) to add/remove required field rules dynamically
  - Uses `sessionStorage` to persist category selection across form steps
  - Contains hardcoded test tracking IDs (`TESTINVALID01`, `TESTCLAIM60DAYS`) still in code
- **~1,390 lines of custom CSS (EN)**

**Pain points:** Environment-specific GUIDs hardcoded in JS, sessionStorage for cross-step state, hardcoded test data, complex cascading show/hide logic for ~6+ fields.

---

## The Customization Tax

### What the numbers tell us

| Page | JS Lines (EN) | JS Lines (FR) | CSS Lines (EN) | CSS Lines (FR) |
|------|---------------|---------------|-----------------|-----------------|
| Case Details | 1,833 | 2,219 | 420 | 370 |
| Contact Us | 2,369 | 2,351 | 1,390 | 1,294 |
| My Support | 264 | 321 | 232 | 231 |
| Tracking | 742 | 798 | 261 | 204 |
| Submit a Case | 265 | — | — | — |
| **Totals** | **~5,500** | **~5,700** | **~2,300** | **~2,100** |

**~15,600 lines of custom JS+CSS**, duplicated across two languages, fighting the platform at every step.

### Recurring anti-patterns

| Pattern | Why it exists | Where |
|---------|--------------|-------|
| `setTimeout` / `setInterval` polling | Platform renders DOM asynchronously; no lifecycle hooks | Case Details (500ms), My Support (1000ms), Contact Us (300ms) |
| `MutationObserver` on large subtrees | Detecting when platform injects new content | Case Details (`.notes`), My Support (`document.body`) |
| DOM destruction & rebuild | Platform form layout doesn't match desired UX | Case Details (`createTabInterface`, `flattenHeader`) |
| `XMLHttpRequest` prototype patching | Need to detect when platform API calls complete | Case Details (reactivation flow) |
| iframe `contentDocument` styling | SharePoint grid renders in iframe; no API to style it | My Support modal, Case Details related docs |
| Retry loops with counters | Elements may not exist yet when JS runs | Case Details comment control (10x500ms) |
| `Page_Validators[]` manipulation | No proper form validation API | Contact Us (dynamic required fields) |
| Inline `.style.cssText` | No component/class system; CSS injected at runtime | Everywhere |
| Duplicated EN/FR files | No i18n system; entire JS files copied and translated | All pages |

### Dependencies

- **jQuery** — used in 100% of custom JS (`$.ajax`, selectors, event handling)
- **Bootstrap 5** — modals, grid, utility classes
- **Font Awesome** — icons
- **Liquid/FetchXML** — server-side data queries in web templates
- **Power Automate** — backend logic (tracking validation, case reactivation)
- **Azure AD B2C** — authentication
- **SharePoint** — document storage (rendered via platform iframe)

---

## Data Model Summary (Case Management)

**Primary entity:** `incident` (Dataverse Case)

| Field | Purpose | Used In |
|-------|---------|---------|
| `title` / `cr502_title` | Case title | Details, Creation |
| `description` | Case body | Details, Creation |
| `statuscode` | Status (New, In Progress, On Hold, etc.) | List, Details |
| `statecode` | State (Active=0, Resolved=1, Cancelled=2) | Details (comment control, reactivation) |
| `casetypecode` | Case type classification | List, Creation |
| `subjectid` | Subject/category lookup | List, Creation |
| `customerid` | Account lookup | List, Creation |
| `in_trackingid` | Tracking number | Details (validation) |
| `in_replytoemail` | Reply email | Creation |
| `deactivatedon` | Closure timestamp | List |

**Supporting entities:**
- `crd6a_cpcategory` — case categories
- `in_subjecttranslation` — bilingual subject labels
- `crea5_cp_accountsparameters` — per-account config (API keys, tracking URLs, POD URLs)
- `adx_portalcomment` — timeline comments
- `int_contact_account_many` — multi-account access (M:M)

**JSON API endpoints** (Liquid templates returning JSON):
- `/GetRelatedAccountJSON` — accounts accessible to current user
- `/GetRelatedSubjectTranslatedJSON` — translated subjects
- `/GetCategory` / `/GetFrenchCategory` — category lookups
- `/GetFilterBusinessUnitsJSON` — BU filters

---

## Key Takeaway for the Presentation

The portal works, but **the team is writing ~16K lines of JavaScript to fight the platform**, not to build features. Every interaction — tabs, badges, comment controls, form validation, tracking — is achieved by waiting for Power Pages to render, then tearing apart and reassembling the DOM. The code is duplicated across languages, riddled with timing hacks, and tightly coupled to platform internals that can break on any update.

A SPA with server logic would:
1. **Own the render** — build the UI you want directly, no DOM demolition
2. **Eliminate duplication** — one codebase with i18n, not copy-pasted JS files
3. **Replace hacks with architecture** — component lifecycle instead of setTimeout, state management instead of sessionStorage, typed API calls instead of XHR interception
4. **Unlock real UX** — instant navigation, optimistic updates, proper loading states, accessible components
5. **Keep the backend** — Dataverse + Power Automate flows stay; only the presentation layer changes