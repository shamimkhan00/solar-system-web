import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Sun from './Sun';
import Planet from './Planet';

export const Space = ({ isPaused, showTrails, isDarkTheme, planets }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: isDarkTheme ? 'black' : '#e0f2fe' }}>
      <Canvas
        camera={{
          position: [0, 15, 40],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isDarkTheme ? 0.3 : 0.7} color={isDarkTheme ? '#ffffff' : '#f0f9ff'} />
        
        <pointLight 
          position={[0, 0, 0]} 
          intensity={3} 
          color={isDarkTheme ? "#ffaa00" : "#ffcc00"} 
        />

        <Sun isPaused={isPaused} isDarkTheme={isDarkTheme} />

        {isDarkTheme && (
          <Stars 
            radius={300} 
            depth={60} 
            count={8000} 
            factor={6} 
            saturation={0} 
            fade 
            speed={isPaused ? 0 : 2} 
          />
        )}

        {planets.map((planet, index) => (
          <Planet
            key={index}
            isPaused={isPaused}
            isDarkTheme={isDarkTheme}
            showTrails={showTrails}
            distance={planet.distance}
            size={planet.size}
            speed={planet.speed}
            color={planet.color}
            texture={planet.texture}
            name={planet.name}
          />
        ))}

        <OrbitControls
          minDistance={10}
          maxDistance={100}
          enablePan={true}
        />

        <EffectComposer>
          <Bloom
            intensity={isDarkTheme ? 1.8 : 1.2}
            width={400}
            height={400}
            kernelSize={5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.05}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}