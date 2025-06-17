import { useState } from 'react'
import { Space } from './Components/Space'
import { Control } from './Components/Control'
import './App.css'

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [planets, setPlanets] = useState([
    { distance: 5, size: 0.5, speed: 0.5, color: '#a3a3a3', texture: '/textures/mercury.jpg', name: 'Mercury' },
    { distance: 7, size: 0.8, speed: 0.4, color: '#e3c088', texture: '/textures/venus.jpg', name: 'Venus' },
    { distance: 10, size: 0.7, speed: 0.3, color: '#6b93d6', texture: '/textures/earth.jpg', name: 'Earth' },
    { distance: 13, size: 0.6, speed: 0.2, color: '#c1440e', texture: '/textures/mars.jpg', name: 'Mars' },
    { distance: 18, size: 1.2, speed: 0.1, color: '#d8b082', texture: '/textures/jupiter.jpg', name: 'Jupiter' }
  ]);

  const handleAddPlanet = (newPlanet) => {
    setPlanets([...planets, newPlanet]);
  };

  const handleDeletePlanet = () => {
    if (planets.length > 0) {
      setPlanets(planets.slice(0, -1));
    }
  };

  return (
    <div className={`mainPage ${isDarkTheme ? 'dark' : 'light'}`}>
      <Space 
        isPaused={isPaused} 
        isDarkTheme={isDarkTheme} 
        showTrails={showTrails}
        planets={planets}
      />
      <Control 
        onPause={setIsPaused}
        onThemeToggle={setIsDarkTheme}
        onTrailToggle={setShowTrails}
        onAddPlanet={handleAddPlanet}
        onDeletePlanet={handleDeletePlanet}
      />
    </div>
  )
}

export default App