# Astronaut Waste → Resource
### Closed-Loop Energy Recovery for Long-Duration Mars Habitats

An interactive "Mission Control" web prototype visualizing how astronaut urine, feces, and food waste can be collected, separated, processed, and converted into water, nutrients, and auxiliary electricity aboard a Mars habitat.

This is an **engineering concept / educational prototype** — it does not claim that waste conversion can replace primary Mars habitat power. Figures are explicitly labeled as theoretical, reported-experimental, or realistic auxiliary output.

---

## Tech stack

- React 18
- Vite 5
- Framer Motion (animations, modals, scroll reveals)
- lucide-react (icon set)
- Plain CSS (no framework) — custom design system in `src/index.css`
- No backend, no database, no API keys required

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Then open the URL Vite prints in your terminal (usually **http://localhost:5173**). The dev server also auto-opens your browser.

### 3. Build for production (optional)

```bash
npm run build
npm run preview
```

`npm run build` outputs a static production bundle to `dist/`, which you can deploy to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).

---

## Opening in VS Code

1. Extract the ZIP.
2. Open VS Code → **File → Open Folder...** → select the extracted `astronaut-waste-mars-habitat` folder.
3. Open the integrated terminal (``Ctrl+` `` / ``Cmd+` ``).
4. Run `npm install`, then `npm run dev`.
5. Ctrl/Cmd-click the local URL in the terminal to open it in your browser.

---

## Project structure

```
astronaut-waste-mars-habitat/
├── package.json
├── vite.config.js
├── index.html
├── README.md
├── public/
│   └── assets/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Starfield.jsx
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── MissionDashboard.jsx
    │   ├── WasteFlow.jsx
    │   ├── WasteStreams.jsx
    │   ├── TechnologyCards.jsx
    │   ├── TechnologyModal.jsx
    │   ├── EnergySection.jsx
    │   ├── Challenges.jsx
    │   ├── SafetyDashboard.jsx
    │   ├── Roadmap.jsx
    │   ├── MarsHabitat.jsx
    │   ├── Simulation.jsx
    │   └── Footer.jsx
    └── data/
        ├── technologies.js
        ├── wasteFlow.js
        ├── challenges.js
        ├── roadmap.js
        └── safety.js
```

## Sections

1. **Hero** — mission headline, animated flow chain, entry buttons
2. **Mission Control Dashboard** — system status + key metrics (theoretical/reported values clearly labeled)
3. **Interactive Waste Flow** — 6-stage clickable process diagram
4. **Waste Streams** — urine stream vs. solid organic stream, side by side
5. **Technologies** — 4 clickable cards (MFC, DUFC, anaerobic digestion + fuel cell, thermochemical processing) opening detail modals
6. **Realistic Energy** — "Feasibility ≠ Primary Power," loss factors, and realistic auxiliary applications
7. **Engineering Challenges** — 8 expandable mission-risk cards + net energy equation
8. **Safety Dashboard** — monitored containment parameters
9. **Development Roadmap** — Lab → Optimize → Microgravity → Ground Analog → Flight Demo → Habitat
10. **Mars Habitat** — closed-loop resource diagram
11. **Mission Simulation** — runnable step-by-step conceptual simulation
12. **Footer**

## Notes on scientific framing

- All energy figures distinguish **theoretical**, **reported experimental**, and **realistic net auxiliary** output.
- The system is explicitly framed as **auxiliary power + resource recovery**, not a replacement for primary Mars habitat power.
- The mission simulation is labeled **"CONCEPTUAL SYSTEM SIMULATION"** and does not represent validated Mars performance.
