# Power Pages SPA Architecture: What Stays, What Goes, What Changes

*Research compiled April 2026 — SPA support reached GA on February 8, 2026 (site version 9.8.1.x+)*

---

## The Mental Model

Think of traditional Power Pages as an **apartment heavily divided into many rooms, each with a single purpose** — this room has a form, that room has a list, this one has page copy. The hallway between them is fixed (server-side routing, full page reloads), and you can't knock down walls — the Web Template → Page Template → Web Page chain *is* the architecture. You work within that room structure or you fight it. The upside: someone already decided where the kitchen goes and there's a bathroom ready to use (OOB forms, lists, content snippets, Liquid templating).

An SPA Power Pages site is a **big open loft in the same building** — same address (Power Pages hosting), same plumbing (Dataverse), same security system (authentication, table permissions, web roles), same landlord (Microsoft managed hosting). But the interior is a blank open space. You decide if you want rooms at all, how many, how big, and what happens in each one. Client-side routing means you never walk through a hallway — you just turn around in the same space. The trade-off: total freedom, but you're building your own kitchen.

The platform becomes **headless** — you interact with Dataverse exclusively through APIs, and the entire UI layer is your code.

---

## What STAYS (Platform Layer — Unchanged)

These are the **backend pillars** that SPA sites inherit fully from the Power Pages platform.

### Authentication & Identity Providers

- Full support for **Microsoft Entra ID**, **Entra External ID**, and all configured identity providers.
- The authentication *flow* is the same — the platform handles login/logout redirects.
- User context is available client-side via `window["Microsoft"].Dynamic365.Portal.User` (userName, firstName, lastName, tenant ID).
- Anti-forgery tokens still work — fetch from `/_layout/tokenhtml`.
- The `CodeSite/DisablePostLoginRedirect` site setting prevents the default `/profile` redirect that would break SPA navigation.

### Table Permissions & Web Roles

- **Enforced on every Web API call** — this is server-side, non-negotiable.
- Global, Contact, Account, Self, and Parent access types all work identically.
- Web roles still link to contacts, table permissions, and (where applicable) page-level security.
- The `Authenticated Users` and `Anonymous Users` built-in roles remain.

### Power Pages Web API (`/_api/`)

- This is your **primary data channel** in an SPA.
- Full CRUD operations on Dataverse tables.
- Same endpoint pattern: `/_api/{table_logical_name}`.
- Same OData query parameters ($select, $filter, $expand, $orderby, $top).
- Same security enforcement via table permissions + web roles.

### Cloud Flow Integration (`/_api/cloudflow/`)

- Power Automate flows triggered via `/_api/cloudflow/v1.0/trigger/{guid}` work identically.
- Flows must still be solution-aware, registered to the site, and assigned web roles.
- The only difference is *how you call them* — instead of `shell.ajaxSafePost()` (which relied on jQuery from the traditional portal), you use `fetch()` or your framework's HTTP client.
- CSRF token handling still required.

### Server Logic (GA April 2026)

- Native server-side JavaScript (ECMAScript 2023) that executes on the Power Pages server.
- Available in both traditional and SPA sites.
- Enables secure API key storage, server-side validation, external service calls, and Dataverse operations — without deploying Azure Functions.
- Invoked via HTTP endpoints from client code.
- Governed by web roles and table permissions.
- Supports unbound Dataverse custom actions (added in GA).

### Dataverse as Backend

- Your data model is entirely yours — no forced D365 schema dependency.
- Custom tables serve the SPA via Web APIs directly.
- Business rules, calculated fields, and rollup fields on Dataverse tables still execute server-side.
- Power Automate triggers (on create/update/delete) on Dataverse tables still fire.

### Hosting & Infrastructure

- Power Pages still handles provisioning, hosting, CDN, SSL, and scaling.
- Site URLs remain `*.powerappsportals.com` (or custom domains).
- Public/private site visibility configurations still apply.
- Governance settings (anonymous data access controls) still apply.

### Site Settings

- Site settings stored in Dataverse still function.
- Key SPA-specific setting: `CodeSite/Enabled = true` (activates SPA mode).
- `CodeSite/DisablePostLoginRedirect` — prevents post-login redirect to `/profile`.
- Authentication settings (Bearer authentication, identity provider config) managed the same way.

### ALM & Deployment

- PAC CLI remains the deployment tool — but with SPA-specific commands:
  - `pac pages upload-code-site` (deploy)
  - `pac pages download-code-site` (pull)
- Solutions can still package site components.
- **Caveat:** Power Platform Git integration is **NOT supported** for SPA sites — only compiled web files are tracked, not source code.

---

## What GOES (No Longer Available in SPA Mode)

These traditional Power Pages constructs are **not supported** in SPA sites. They don't error out — they simply don't exist.

### Liquid Templating

- **Completely gone.** No `{{ snippets['...'] }}`, no `{% fetchxml %}`, no `{{ user.id }}`, no `{% include %}`.
- Liquid was server-side rendered by the ASP.NET engine — SPA sites are client-side rendered, so there's no Liquid processing step.
- **Replacement:** Use your framework's template engine + Web API calls for data.

### Web Templates / Page Templates / Web Pages Hierarchy

- The traditional chain of `Web Template → Page Template → Web Page` is irrelevant.
- In SPA mode, there's effectively **one root page** (`/`). All sub-routes are handled by your client-side router (React Router, Vue Router, etc.).
- A server-side refresh on any route always returns the root page — the client-side router then renders the correct view.

### Content Snippets

- Not available. Content snippets are Liquid-dependent (`{{ snippets['...'] }}`).
- **Replacement:** Build your own content management — e.g., a custom Dataverse table of key-value content records queried via Web API. Or use a static i18n library (react-i18next, vue-i18n) with JSON resource files bundled into your build.

### OOB Forms (Basic Forms / Advanced Forms / Multistep Forms)

- The platform's built-in form rendering (entity forms, web forms) does not function in SPA mode.
- **Replacement:** Build custom forms with your framework (React Hook Form, Formik, VeeValidate, etc.) and submit data via Web API or server logic endpoints.

### OOB Lists (Entity Lists)

- The platform's built-in list/grid component doesn't render.
- **Replacement:** Build custom data grids/tables. Fetch data via `/_api/`, render with your component library (AG Grid, TanStack Table, Vuetify DataTable, etc.).

### Pages Workspace (Design Studio Visual Editor)

- The WYSIWYG page editor in make.powerpages.microsoft.com is disabled for SPA sites.
- You'll see the "SPA" badge on the site, and Pages/Styling workspaces are grayed out.

### Style Workspace

- The visual styling tools (theme picker, CSS editor in studio) are not available.
- **Replacement:** Full ownership — CSS, CSS-in-JS, Tailwind, your framework's styling system.
- **Note (GA fix):** Platform styles no longer override your custom CSS. This was a bug in preview that was resolved at GA.

### Built-in Multilingual Support

- Power Pages' native multi-language system (website languages, localized content snippets, language-specific web pages) does not apply.
- **Replacement:** Client-side i18n — load resource bundles per locale, detect language from URL/cookie/browser preference.
- Single-language is the default out-of-the-box for SPA.

### Page Permissions (Web Page Access Control Rules)

- Since there are no web pages in the traditional sense, WPACRs don't apply.
- **Replacement:** Client-side route guards. Check user's web roles via the `window["Microsoft"].Dynamic365.Portal.User` object and conditionally render UI. Security is still enforced server-side on API calls via table permissions.

### Header/Footer Web Templates

- The platform's default header and footer (with navigation, logo, language picker) are not rendered.
- **Replacement:** Build your own navigation components.

### Profile Page

- The built-in `/profile` page doesn't exist.
- Disable the post-login redirect to it with `CodeSite/DisablePostLoginRedirect`.

---

## What CHANGES (Same Concept, Different Implementation)

### Routing

| Traditional | SPA |
|---|---|
| Server-side routing — each URL maps to a Web Page record in Dataverse | Client-side routing — React Router / Vue Router / Angular Router |
| 404 → Page Not Found web page | 404 → your framework's catch-all route |
| Hard refresh loads correct page from server | **Hard refresh always returns root page** — client router re-renders the correct view |

**Important:** Because the server always returns the root HTML for any route, deep linking and bookmarking work through your client-side router, not through Dataverse web page records.

### Data Access Pattern

| Traditional | SPA |
|---|---|
| Liquid `{% fetchxml %}` for server-side data queries | Web API `/_api/` for all data operations |
| Entity forms auto-bind to Dataverse tables | Custom forms + manual Web API POST/PATCH |
| `shell.ajaxSafePost()` (jQuery-based helper) | `fetch()` or Axios/framework HTTP client |
| Server-side rendering of data into HTML | Client-side fetch → state → render cycle |

### Security Implementation

| Traditional | SPA |
|---|---|
| Page-level security via WPACRs | Route guards in client code (UI-only, not true security) |
| Liquid `{% if user.roles contains '...' %}` | `window["Microsoft"].Dynamic365.Portal.User` + conditional rendering |
| Table permissions enforced on forms/lists/Liquid/Web API | Table permissions enforced **only on Web API** (your sole data channel) |

**Key insight:** In SPA mode, your *only* real security enforcement point is table permissions on Web API calls. Client-side route guards are UX, not security. A user could bypass them with dev tools. The API layer prevents unauthorized data access regardless.

### Local Development

| Traditional | SPA |
|---|---|
| Edit in VS Code extension → deploy → clear cache → test | Local dev server (Vite/Webpack) with hot reload |
| No local testing with real auth | **Full local dev with auth** — configure Entra v1 SPA redirect URI to `localhost`, proxy `/_api` calls to your portal |
| Minutes-long feedback loop | Seconds-long feedback loop |

**Local dev setup (Vite example):**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/_api': {
        target: 'https://your-site.powerappsportals.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
```

**Requirements:**
- Entra app registration must have SPA platform configured with `http://localhost:<port>/` as redirect URI.
- Site settings: `Authentication/BearerAuthentication/Enabled = true`, Protocol = `OpenIdConnect`, Provider = `AzureAD`.
- Must use **ADAL.js** (not MSAL.js) — Power Pages uses Entra v1 endpoints.
- Bearer auth requires portal version 9.7.6.6+.
- Site visibility must be Public for localhost access.

### SEO

| Traditional | SPA |
|---|---|
| Server-side rendered HTML — crawlable by default | Client-side rendered — **limited SEO support** |
| Meta tags via Liquid/web page properties | Must inject meta tags client-side (react-helmet, etc.) |

This is a known trade-off. If SEO is critical, traditional Power Pages or a hybrid approach may be more appropriate.

### Deployment Workflow

| Traditional | SPA |
|---|---|
| VS Code extension syncs individual files | `pac pages upload-code-site --rootPath ./src --compiledPath ./build` |
| Power Platform Git integration supported | Git integration **NOT supported** — only compiled files go to Dataverse |
| Design studio for quick edits | Code-only — no visual editor |

**Project structure:**
```
/your-project
├── src/                      ← Source code (React/Angular/Vue)
├── build/                    ← Compiled output (what gets uploaded)
├── powerpages.config.json    ← Optional CLI config
└── README.md
```

The `powerpages.config.json` can specify `siteName`, `defaultLandingPage`, and `compiledPath` so you only need to pass `--rootPath` to the upload command.

### Framework Support

- **GA-supported frameworks:** React, Angular, Vue.
- React is the primary framework in Microsoft's documentation and examples.
- You bring your own bundler (Vite, Webpack, etc.) — the platform just hosts compiled static assets.

---

## Architecture Diagram (Conceptual)

```
┌─────────────────────────────────────────────┐
│              CLIENT (Browser)               │
│  ┌───────────────────────────────────────┐  │
│  │  React / Angular / Vue Application    │  │
│  │  ┌─────────┐  ┌──────────┐  ┌─────┐  │  │
│  │  │ Router  │  │ Forms    │  │ UI  │  │  │
│  │  │ (CSR)   │  │ (custom) │  │     │  │  │
│  │  └────┬────┘  └────┬─────┘  └──┬──┘  │  │
│  │       │            │           │      │  │
│  │       └────────────┴───────────┘      │  │
│  │                    │                   │  │
│  │            fetch() / HTTP client       │  │
│  └────────────────────┼──────────────────┘  │
│                       │                      │
│   window["Microsoft"].Dynamic365.Portal.User │
└───────────────────────┼──────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   /_api/{table}   /_api/cloudflow/  /api/serverlogic/
   (Web API)       (Power Automate)  (Server Logic)
        │               │               │
┌───────┴───────────────┴───────────────┴──────┐
│           POWER PAGES PLATFORM               │
│  ┌──────────────────────────────────────┐    │
│  │  Authentication (Entra ID / Ext ID)  │    │
│  │  Table Permissions + Web Roles       │    │
│  │  CSRF Token Validation               │    │
│  └──────────────────────────────────────┘    │
│                       │                      │
│              ┌────────┴────────┐             │
│              │    DATAVERSE    │             │
│              │  (Your tables)  │             │
│              └─────────────────┘             │
│                                              │
│  Hosting · CDN · SSL · Scaling · Governance  │
└──────────────────────────────────────────────┘
```

---

## Decision Matrix: When to Use SPA vs. Traditional

| Factor | SPA | Traditional |
|---|---|---|
| **UI complexity** | Highly interactive, app-like UX | Form/list-centric portal |
| **Dev team** | Pro-dev with React/Angular/Vue skills | Citizen dev or low-code focus |
| **SEO requirements** | Low / not important | Critical (content sites) |
| **Iteration speed** | Fast (local dev, hot reload) | Slower (deploy-test cycle) |
| **Multilingual** | Roll your own i18n | Built-in language support |
| **CMS-style content** | Build your own or use custom tables | Content snippets, page copy |
| **Design studio** | Not available | Full visual editing |
| **OOB components** | None — build everything | Forms, lists, profile page |
| **Licensing** | Same Power Pages license | Same Power Pages license |

---

## Potential Issues & Next Steps to Consider

1. **ADAL.js is deprecated** — Power Pages currently requires Entra v1 endpoints for local dev bearer auth, which means MSAL.js is *not compatible*. Watch for Microsoft to update this.

2. **No Git integration** — your source code lives in your own repo. Only compiled assets go to Dataverse. This means your CI/CD pipeline needs to handle build + `pac pages upload-code-site`.

3. **Content management gap** — if your portal has significant editable content (like SÉDAC/SOCCA might), you'll need to architect a content management strategy. A custom "Content" Dataverse table with key/value/language columns queried via Web API is a common pattern.

4. **Anti-forgery token handling** — the traditional `shell.ajaxSafePost()` is gone. You need to fetch the token from `/_layout/tokenhtml`, parse it from the HTML response, and include it in your API headers manually.

5. **Existing site conversion** — you *can* flip an existing site to SPA mode by adding `CodeSite/Enabled = true` in site settings, but this disables all traditional constructs. It's generally cleaner to create a new SPA site.

6. **Power Pages plugin for Claude Code** — the preview plugin (February 2026) provides 9 conversational skills covering the full SPA lifecycle: `/create-site`, `/integrate-webapi`, `/setup-auth`, `/add-server-logic`, `/add-cloud-flow`, `/integrate-backend`, `/create-webroles`, `/add-seo`, and deployment commands.
