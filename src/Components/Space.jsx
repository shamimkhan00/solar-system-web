import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Sun from './Sun';
import Planet from './Planet';

export const Space = () => {
  // Planet data: [distance from sun, size, speed, color, texture]
  const planets = [
    { distance: 5, size: 0.5, speed: 0.5, color: '#a3a3a3', texture: '/textures/mercury.jpg', name: 'Mercury' },
    { distance: 7, size: 0.8, speed: 0.4, color: '#e3c088', texture: '/textures/venus.jpg', name: 'Venus' },
    { distance: 10, size: 0.7, speed: 0.3, color: '#6b93d6', texture: '/textures/earth.jpg', name: 'Earth' },
    { distance: 13, size: 0.6, speed: 0.2, color: '#c1440e', texture: '/textures/mars.jpg', name: 'Mars' },
    { distance: 18, size: 1.2, speed: 0.1, color: '#d8b082', texture: '/textures/jupiter.jpg', name: 'Jupiter' }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas
        camera={{
          position: [0, 25, 30],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#ffaa00" />

        <Sun />

        <Stars radius={300} depth={60} count={8000} factor={6} saturation={0} fade speed={2} />

        {planets.map((planet, index) => (
          <Planet
            key={index}
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
            intensity={1.8}
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