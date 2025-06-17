# Solar System 3D Simulation 🌌

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://solar-system-web-iota.vercel.app/)
[![GitHub stars](https://img.shields.io/github/stars/shamimkhan00/solar-system-web)](https://github.com/shamimkhan00/solar-system-web/stargazers)

A beautiful 3D interactive solar system simulation built with React Three Fiber (R3F) and Three.js. Explore our solar system with realistic planet orbits, visual trails, and interactive controls.

![Solar System Screenshot](./public/screenshot.jpg)

## Features ✨

- 🪐 Realistic 3D rendering of planets with textures
- 🚀 Interactive orbit trails visualization
- ⏯️ Play/Pause simulation
- 🌓 Light/Dark mode toggle
- 🎮 Camera controls (zoom, pan, rotate)
- 🔍 Planet information on click/hover
- ➕ Add custom planets
- ❌ Delete planets
- ✨ Visual effects (bloom, ambient lighting)

## Technologies Used 🛠️

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Three.js](https://threejs.org/)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## Installation 💻

1. Clone the repository:
   ```bash
   git clone https://github.com/shamimkhan00/solar-system-web.git

solar-system-web/
├── public/                  # Static assets
│   └── textures/            # Planet textures
├── src/
│   ├── Components/          # React components
│   │   ├── Control.jsx      # Control panel
│   │   ├── Planet.jsx       # Planet component
│   │   ├── Space.jsx        # Main scene
│   │   └── Sun.jsx          # Sun component
│   ├── App.css              # Global styles
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── .gitignore
├── package.json
├── README.md
└── vite.config.js

