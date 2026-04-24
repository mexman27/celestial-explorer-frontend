# Celestial Explorer — Frontend

## Project Context

Vanilla TypeScript frontend (no React/Vue/Svelte). Built with Vite, Three.js for 3D visualization, CSS Modules for styling.

Refer to `.claude/plans/PLAN.md` for full architecture, project structure, and development phases.

## Path Aliases

- `@/` → `src/`
- `#/` → `public/`

Route hashes (`#/home`, `#/stars`) are unrelated to the `#/` alias — one is a URL fragment, the other is a Vite resolver prefix.

---

## Component Convention

All UI components are DOM-based classes with this contract:

```typescript
class ComponentName {
  constructor(props: Props);
  mount(parent: HTMLElement): void;
}
```

- Constructor creates and owns the DOM element (`this.el`).
- `mount()` is the only way to insert into the DOM.
- No base class — each component is self-contained.
- When a component has sub-components, the root file is `main.ts` and sub-components live in `./components/`. Otherwise the root file is `component-name.ts`.
- CSS Modules live next to the component as `*.module.css`, imported as `styles`.

### Naming

- Component files: `component-name.ts` + `component-name.module.css`
- Component with sub-components: `main.ts` + `main.module.css` + `components/` subfolder
- View files: `section-name.ts` (factory function, same name as export)
- CSS classes: kebab-case, accessed via `styles['class-name']`

### Element access

Components expose their root element as `this.el` (public property). A few older components use `getEl()` instead; both are tolerated for now, but new components use the `el` property.

---

## Directory Boundaries

| Directory | Owns | Does NOT own |
|-----------|------|-------------|
| `components/` | Reusable UI primitives | Business logic, data fetching |
| `views/` | Page content assembly (factory functions → HTMLElement) | Shared state, persistence, direct DOM creation |
| `http/` | REST client abstraction, API clients (gaia) | Domain logic, data transformation |
| `services/` | Domain logic, orchestration | HTTP requests directly (use `http/`) |
| `stores/` | Reactive state | DOM, rendering |
| `router/` | Route paths, route-to-view mapping, sidebar config | View rendering logic |
| `pages/` | Layout assembly (grid regions) | Route logic, view content |
| `integrations/` | Third-party library wrappers (Three.js) | Business logic, DOM outside the integration |

---

# Code Rules

## View DOM Rule (strict)

**Views must not use `document.*` directly.** All DOM in views comes from the component library.

Forbidden in views:
- `document.createElement(...)`
- `document.createElementNS(...)`
- `document.createTextNode(...)`
- Any other `document.*` DOM-construction API

If no existing component fits, extend one or create a new component first. Generic wrapping is covered by `Container` (plain block), `Flex` (flex row/column), and `Grid` (CSS grid).

**Why:** Views that call `createElement` smuggle styling and structure decisions out of the component layer. That breaks refactors (styles change but the view doesn't get the update), breaks visual consistency (ad-hoc divs bypass the design system), and makes it possible to inject raw HTML or classes without review.

**How to apply:** When touching a view, any `document.*` call is a defect — fix it in the same change, don't leave it.

## View Style Rule (strict)

**Views must not style elements directly.** No `el.classList.*`, no `el.style.*`, no `el.className = ...`, no `el.setAttribute('class', ...)`, no `el.setAttribute('style', ...)` inside views.

All styling goes through component props or component API methods.

**Why:** Same reason as the DOM rule — styling is a component responsibility, and views that reach into styles become invisible dependencies on DOM structure.

**How to apply:** If a view needs a visual variation, add a prop to the component (e.g. `variant`, `padding`, `color`) — not a class string escape hatch. Components never accept a `className` or `style` prop from views; they accept semantic props and map them to internal classes. If a genuinely new visual pattern is needed, add a new component.

## Component Styling Rule (strict)

**Components use CSS Module classes for all styling.** No `el.style.*`, no inline styles inside component classes. Style variants are defined as CSS classes and activated via props (e.g. `color?: 'primary' | 'secondary'` maps to `styles['primary']` / `styles['secondary']`).

**Exception:** layout components (`Flex`, `Grid`, `Container`) may accept layout props (`gap`, `padding`, `maxWidth`, `columns`) that map to inline CSS custom properties or computed styles, since these are dynamic values, not semantic variants.

## DOM Lookup Rule (strict)

**Components must not use `querySelector`, `querySelectorAll`, `getElementById`, `getElementsByClassName`, or `closest()` to find DOM they created.**

Store references to created elements on the class (or on a private state object) at creation time and update the UI through those references.

**Why:** DOM lookup from inside a component couples it to its own rendered output by selector — a rename in the CSS module or a structural change silently breaks the lookup, and the component keeps running with a `null` reference.

**How to apply:** Every DOM node a component needs to read or mutate later gets a named field assigned in the constructor.

## HTML Injection Rule (strict)

**Never assign dynamic data through HTML-parsing APIs.** The browser parses assigned strings as HTML, so any markup in the data executes as DOM (`<img onerror=...>`, `<svg onload=...>`). Even data that looks safe today becomes a stored XSS vector when the upstream source is compromised or reflects user input.

Forbidden patterns:
- `el.innerHTML = `…${value}…`` (template literal with substitution)
- `el.innerHTML = '…' + value` (concatenation)
- `el.innerHTML = fnReturningHtml()` (any non-literal RHS)
- `el.outerHTML = dynamicString`
- `el.insertAdjacentHTML(pos, dynamicString)`

Allowed:
- `el.innerHTML = ''` to clear children (no interpolation)
- `el.innerHTML = '<static markup with no interpolation>'` (rare; prefer `createElement`)

For dynamic content:
- `el.textContent = value` for text
- `document.createElement` + `appendChild` for structure (components only — views use the component library)
- `document.createElementNS('http://www.w3.org/2000/svg', ...)` for SVG (components only)
- `el.setAttribute(name, value)` or `el.dataset.x = value` for attributes
- Closures over the value for event handlers — no data-attribute round trip

## URL Safety Rule (strict)

**When assigning a dynamic value to `anchor.href` (or any URL sink), validate the scheme first.** Anything that isn't `http(s):` must render as plain text, not as an anchor. `javascript:` URLs in an href execute arbitrary JS with access to the page's origin.

---

# Third-Party Dependency Policy

**Principle:** Avoid runtime dependencies. Build your own instead of pulling in npm packages.

**Current runtime dependencies:** Only `three`.

**When evaluating whether to add a dependency:**
1. Can it be built in-house with reasonable effort? → Build it.
2. Is it a complex, security-critical domain (crypto, auth protocols)? → Consider a dependency.
3. Is it a dev-only tool (testing, bundling, linting)? → Dev dependencies are fine.

**Hard rule:** Do not add runtime dependencies to `package.json` without explicit discussion. `devDependencies` are acceptable for tooling.

---

# Layered File Convention

Simple components and views need only `component-name.ts` + `component-name.module.css` + `index.ts`. Add layers as the file grows.

```
component-name/
├── component-name.ts              # ALWAYS — composition + rendering
├── component-name.module.css      # ALWAYS — scoped styles
├── index.ts                       # ALWAYS — barrel export
│
├── component-name.http.ts         # IF it makes API calls
├── component-name.transform.ts    # IF it transforms data shapes
├── component-name.logic.ts        # IF it has business rules / calculations
├── component-name.store.ts        # IF it holds reactive state (services only)
├── component-name.config.ts       # IF it has constants, mappings, presets
├── component-name.types.ts        # IF types are shared across split files
├── component-name.test.ts         # IF tested
```

### File Responsibilities

| File | Contains | Must NOT contain |
|------|----------|------------------|
| `*.ts` (main) | DOM creation, child composition, event wiring, lifecycle | API calls, data transformation, business calculations |
| `*.http.ts` | API calls, pagination, request/response shaping | DOM access, business logic |
| `*.transform.ts` | Pure functions: shape conversions | Side effects, API calls, DOM access |
| `*.logic.ts` | Validation, derived calculations, domain decisions | DOM access, API calls |
| `*.store.ts` | Reactive state (services only) | DOM access, business logic |
| `*.config.ts` | Constants, mappings, presets | Functions with logic |
| `*.types.ts` | Shared types | Simple Props (keep in main `.ts`) |

### Splitting Threshold

**Mandatory:** Any API call goes in a `.http.ts` file.

Other layers split when:
- The main file exceeds ~150–200 lines, OR
- Logic is reused across multiple files, OR
- Clearly different concerns are mixed.

### Logic vs Transform

- **`.transform.ts`** — shape changes only, no domain meaning. Converting one structure to another.
- **`.logic.ts`** — has business semantics. Decisions, rules, calculations, domain-meaningful output.

Heuristic: if the function name contains domain language, it's logic.

### State Rule

State lives in the main `.ts` file. `.logic.ts` can compute or initialize state values, but never store them. No module-level variables in `.logic.ts` or `.transform.ts`.

### Migration Rule

Migrate on-touch: when modifying a file, split it at that point if it crosses a threshold. Don't rename or split preemptively.

---

# Code Style

- Semicolons required
- Single quotes in TypeScript
- 2-space indentation

### Import order

```typescript
// 1. Internal absolute imports (@/)
import { Button } from '@/components/button/button';

// 2. Local relative imports
import styles from './component-name.module.css';
import { helper } from './utils';
```

### Null checks

```typescript
if (value !== null && value !== undefined) { ... }
const result = value ?? defaultValue;
const nested = obj?.property?.deep;
```
