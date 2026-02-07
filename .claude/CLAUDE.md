# Celestial Explorer — Frontend

## Project Context

Vanilla TypeScript frontend (no React/Vue/Svelte). Built with Vite, Three.js for 3D visualization, CSS Modules for styling.

Refer to `PLAN.md` at the repo root for full architecture, project structure, and development phases.

## Component Convention

All UI components are DOM-based classes following this contract:

```typescript
class ComponentName {
  constructor(props: Props);
  mount(parent: HTMLElement): void;
}
```

- Constructor creates and owns the DOM element (`this.el`)
- `mount()` appends to parent — this is the only way to insert into DOM
- No base class — each component is self-contained
- Sub-components live in a `components/` folder inside the parent component
- CSS Modules with `*.module.css` files, imported as `styles`

## Directory Boundaries

| Directory | Owns | Does NOT own |
|-----------|------|-------------|
| `components/` | Reusable UI primitives | Business logic, data fetching |
| `views/` | Page content assembly (factory functions → HTMLElement) | Shared state, persistence |
| `http/` | REST client abstraction, API clients (gaia) | Domain logic, data transformation |
| `services/` | Domain logic, orchestration | HTTP requests directly (use http/) |
| `stores/` | Reactive state | DOM, rendering |
| `router/` | Route paths, route-to-view mapping, sidebar config | View rendering logic |
| `pages/` | Layout assembly (grid regions) | Route logic, view content |

## Naming Conventions

- Component files: `component-name.ts` + `component-name.module.css`
- Component with sub-components: `main.ts` + `main.module.css` + `components/` subfolder
- View files: `section-name.ts` (factory function, same name as export)
- CSS classes: kebab-case, accessed via `styles['class-name']`
- Path aliases: `@/` → `src/`, `#/` → `public/`
