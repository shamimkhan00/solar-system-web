import { useState } from 'react'
import { Space } from './Components/Space'
import { Control } from './Components/Control'
import './App.css'

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showTrails, setShowTrails] = useState(true);

  return (
    <div className={`mainPage ${isDarkTheme ? 'dark' : 'light'}`}>
      <Space 
        isPaused={isPaused} 
        isDarkTheme={isDarkTheme} 
        showTrails={showTrails}
      />
      <Control 
        onPause={setIsPaused}
        onThemeToggle={setIsDarkTheme}
        onTrailToggle={setShowTrails}
      />
    </div>
  )
}

export default App