# NEXUS // Next-Gen Cyber Arcade & Gaming Portal

A modern, high-performance gaming website built purely with **HTML5, CSS3, and Vanilla JavaScript**. Featuring dark cyberpunk neon aesthetics, interactive WebGL/Canvas effects, responsive layouts, synthesized Web Audio sound FX, and **three fully playable browser arcade games**.

![Nexus Gaming Banner](https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80)

---

## 🎮 Key Features

### 1. 🕹️ Three Built-In Canvas Arcade Games
- **CYBER STRIKE (Sector 7)**:
  - Retro sci-fi space shooter.
  - Pilot a neon fighter with plasma lasers, thruster particle effects, enemy drones, splitting asteroids, score multipliers, and dynamic shield tracking.
  - Controls: `WASD` or `Arrow Keys` to move, `Spacebar` to shoot.
- **NEON SNAKE 2088**:
  - Grid-based cyberpunk snake with glowing energy orbs, particle bursts, and dynamic speed scaling.
  - Controls: `WASD` or `Arrow Keys` to turn.
- **CHRONO REFLEX**:
  - Millisecond precision human reaction tester with target rings and visual signal detection.
  - Awards pilot classifications from **[S-TIER] CYBER GOD** (<200ms) to **[C-TIER] ROOKIE**.
  - Controls: `Click` or `Spacebar` when the signal flashes green.

### 2. 🎵 Zero-Dependency Synthesized Audio Engine (`js/audio.js`)
- Employs the native **Web Audio API** to synthesize arcade sound effects directly in the browser (lasers, explosions, scores, power-ups, retro game overs, and beeps).
- **100% offline & zero asset dependencies**: no broken external MP3 links, no CORS errors, zero latency.
- Floating sound control toggle (`SFX: ON / OFF`) with persistent state in `localStorage`.

### 3. 🌌 Visual Aesthetics & Atmosphere
- **Interactive Cyber Particles Canvas (`js/particles.js`)**: Constellation mesh with proximity lines connecting glowing neon nodes and reacting to cursor movement.
- **Glowing Follower Cursor**: Smooth neon radial glow tracking the mouse.
- **3D Holographic Card Tilt**: Interactive Hero card tilting dynamically in 3D perspective based on mouse coordinates.
- **Cyberpunk UI**: Glassmorphism, chamfered corner cuts (`clip-path`), neon glow filters, pulse badges, and custom scrollbars.

### 4. 📦 Game Catalog & Store Explorer
- Filter by genres: **All, Action, Sci-Fi, Racing, RPG, Arcade**.
- Real-time search query matching titles, developers, and genres.
- Full Game Detail Modal with developer metadata, player stats, and launch buttons.

### 5. ❤️ Wishlist & Favorites Engine
- Click the heart icon on any game card to add or remove it from your personal collection.
- Persistent across page reloads via `localStorage`.
- Sliding drawer modal to view, inspect, or clear favorites.

### 6. 🏆 Global Leaderboards & Tournaments
- Interactive weekly and all-time ranking podiums for top pilots.
- Active esports tournament registration with squad confirmation and custom toast notifications.

### 7. 👤 Pilot Profile & Stats Tracker
- Editable Gamer Tag saved to `localStorage`.
- Avatar switcher with custom profile badges.
- Dynamic XP bar, total score counter, and unlocked achievements list.

---

## 📂 Project Structure

```text
f:\New Folder\
├── index.html                  # Semantic, accessible HTML5 layout
├── css/
│   └── style.css               # Cyberpunk styling, responsive design & animations
├── js/
│   ├── audio.js                # Web Audio API sound generator
│   ├── particles.js            # Background particle constellation canvas
│   ├── app.js                  # App orchestrator, catalog, modals & storage
│   └── games/
│       ├── spaceShooter.js     # Cyber Strike canvas shooter game
│       ├── neonSnake.js        # Neon Snake 2088 canvas game
│       └── cyberReflex.js      # Chrono Reflex reaction tester
└── README.md                   # Documentation & guide
```

---

## 🚀 How to Run

No installations, build steps, or package managers required!

1. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari):
   ```bash
   # In Windows PowerShell:
   Start-Process .\index.html
   ```
2. Or use any local static server (e.g. VS Code Live Server, Python, or Node):
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your web browser.

---

## 🛠️ Customization & Extensibility

- **Add New Games**: Add entries to the `GAMES_CATALOG` array in `js/app.js`.
- **Change Colors**: Modify CSS custom properties in `:root` inside `css/style.css` (`--neon-cyan`, `--neon-pink`, `--neon-green`, etc.).
- **Add Sound Effects**: Call `window.soundFX.playLaser()`, `window.soundFX.playExplosion()`, or define new synth tones in `js/audio.js`.
