import { useState } from "react";

export const Control = ({
  onPause,
  onThemeToggle,
  onTrailToggle,
  onAddPlanet,
  onDeletePlanet
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [showPlanetForm, setShowPlanetForm] = useState(false);
  const [planetForm, setPlanetForm] = useState({
    name: '',
    distance: 20,
    size: 0.5,
    speed: 0.1,
    color: '#ffffff',
    texture: ''
  });

  const handlePause = () => {
    const newState = !isPaused;
    setIsPaused(newState);
    onPause && onPause(newState);
  };

  const handleThemeToggle = () => {
    const newState = !isDarkTheme;
    setIsDarkTheme(newState);
    onThemeToggle && onThemeToggle(newState);
  };

  const handleTrailToggle = () => {
    const newState = !showTrails;
    setShowTrails(newState);
    onTrailToggle && onTrailToggle(newState);
  };

  const handleAddPlanet = () => {
    // Set default texture if empty
    const planetTexture = planetForm.texture || '/textures/moon.jpg';

    const newPlanet = {
      ...planetForm,
      texture: planetTexture
    };

    onAddPlanet && onAddPlanet(newPlanet);
    setShowPlanetForm(false);
    setPlanetForm({
      name: '',
      distance: 20,
      size: 0.5,
      speed: 0.1,
      color: '#ffffff',
      texture: ''
    });
  };

  const handleDeleteLastPlanet = () => {
    onDeletePlanet && onDeletePlanet();
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

        {/* Add Planet Button */}
        <button
          onClick={() => setShowPlanetForm(true)}
          className="flex items-center justify-between w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
        >
          <span className="text-white font-medium">Add Planet</span>
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        {/* Delete Last Planet Button */}
        <button
          onClick={handleDeleteLastPlanet}
          className="flex items-center justify-between w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
        >
          <span className="text-white font-medium">Delete Last Planet</span>
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Planet Form Modal */}
      {showPlanetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 top-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Add New Planet</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={planetForm.name}
                  onChange={(e) => setPlanetForm({ ...planetForm, name: e.target.value })}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Distance from Sun: {planetForm.distance}
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={planetForm.distance}
                  onChange={(e) => setPlanetForm({ ...planetForm, distance: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Size: {planetForm.size}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={planetForm.size}
                  onChange={(e) => setPlanetForm({ ...planetForm, size: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Speed: {planetForm.speed}
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={planetForm.speed}
                  onChange={(e) => setPlanetForm({ ...planetForm, speed: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Color</label>
                <input
                  type="color"
                  value={planetForm.color}
                  onChange={(e) => setPlanetForm({ ...planetForm, color: e.target.value })}
                  className="w-full h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Texture URL (optional)</label>
                <input
                  type="text"
                  value={planetForm.texture}
                  onChange={(e) => setPlanetForm({ ...planetForm, texture: e.target.value })}
                  className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                  placeholder="/textures/planet.jpg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPlanetForm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPlanet}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
              >
                Add Planet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};