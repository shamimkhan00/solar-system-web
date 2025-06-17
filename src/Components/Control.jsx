import { useState } from "react";

export const Control = ({ onPause, onThemeToggle, onTrailToggle }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showTrails, setShowTrails] = useState(true);

  const handlePause = () => {
    setIsPaused(!isPaused);
    onPause && onPause(!isPaused);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    onThemeToggle && onThemeToggle(!isDarkTheme);
  };

  const handleTrailToggle = () => {
    setShowTrails(!showTrails);
    onTrailToggle && onTrailToggle(!showTrails);
  };

  return (
    <div className="absolute right-4 top-4 bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700 z-10">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        Space Controls
      </h2>
      
      <div className="space-y-4">
        {/* Pause/Play Button */}
        <button
          onClick={handlePause}
          className="flex items-center justify-between w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200"
        >
          <span className="text-white font-medium">
            {isPaused ? "Play Simulation" : "Pause Simulation"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isPaused ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="flex items-center justify-between w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <span className="text-white font-medium">
            {isDarkTheme ? "Light Theme" : "Dark Theme"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isDarkTheme ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        </button>

        {/* Orbit Trail Toggle */}
        <button
          onClick={handleTrailToggle}
          className="flex items-center justify-between w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
        >
          <span className="text-white font-medium">
            {showTrails ? "Hide Trails" : "Show Trails"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};