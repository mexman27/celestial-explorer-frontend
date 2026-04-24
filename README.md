# Celestial Explorer — Frontend

A 3D stellar-neighbourhood explorer. Click a star, see its details. Built in
vanilla TypeScript + Three.js, no UI framework.

Currently scoped to the Solar Neighbourhood (50 pc). See
[plans/PLAN.md](plans/PLAN.md) for the longer-term expansion roadmap
(Orion Arm → Milky Way → Local Group).

## Running it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. The full command list (typecheck, build,
test, preview) lives in [.claude/CLAUDE.md](.claude/CLAUDE.md#commands).

## Backend dependency

The frontend expects a Django API at `http://localhost:8000/api/v1` — that's
the sibling [`../backend`](../backend) service. The base URL is configured in
[.env](.env) (`VITE_API_BASE_URL`).

Without the backend running, static routes (Home, About, Design System) work
fine, but the 3D stars view will fail to load data.

## Main routes

| Route | What it shows |
|---|---|
| `#/home` | Landing page, project overview |
| `#/stars` | 3D star field — hover for tooltip, click a star → detail view |
| `#/stars?id=<id>` | Star detail view (grouped fields) |
| `#/planets`, `#/galaxies` | Stub sections (content TBD — see PLAN.md phase 4+) |
| `#/design-system` | Component showcase: buttons, cards, inputs — useful when touching shared components |

The full route list is in [src/router/paths.ts](src/router/paths.ts).

## Where things live

For a deep tour of the layout (per-layer directories, path aliases, type
colocation rules, the component contract, the Three.js integration map), read
[plans/PLAN.md](plans/PLAN.md).

For the rules you must follow when writing code here (strict DOM rules, style
rules, URL safety, CSS token discipline, layered file convention), read
[.claude/CLAUDE.md](.claude/CLAUDE.md).
