import { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export default function Planet({ distance, size, speed, color, texture, name }) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const planetTexture = useLoader(TextureLoader, texture);
  
  // Calculate orbital period
  const orbitalPeriod = ((2 * Math.PI) / speed).toFixed(1);

  // Orbit geometry with slight elevation to prevent z-fighting
  const orbitGeometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,
      distance, distance,
      0, 2 * Math.PI,
      false,
      0
    );
    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, 0.1, 0); // Slightly elevate the orbit
    return geometry;
  }, [distance]);

  // Animation frame with delta for smooth movement
  useFrame(({ clock }) => {
    if (planetRef.current) {
      const elapsedTime = clock.getElapsedTime();
      const angle = elapsedTime * speed;
      planetRef.current.position.x = Math.sin(angle) * distance;
      planetRef.current.position.z = Math.cos(angle) * distance;
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Orbit path - now slightly elevated */}
      <line ref={orbitRef} geometry={orbitGeometry} material={
        new THREE.LineDashedMaterial({
          color: hovered ? new THREE.Color(0xffffff) : new THREE.Color(0x888888),
          dashSize: 0.5,
          gapSize: 0.3,
          linewidth: 1,
          transparent: true,
          opacity: hovered ? 0.8 : 0.5
        })
      } computeLineDistances />
      
      {/* Planet with interaction improvements */}
      <mesh 
        ref={planetRef} 
        position={[distance, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={() => setHover(false)}
        onClick={(e) => {
          e.stopPropagation();
          setClicked(!clicked);
        }}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          map={planetTexture}
          color={hovered ? new THREE.Color(0xffffff) : color}
          metalness={0.1}
          roughness={0.8}
          emissive={hovered ? new THREE.Color(0xaaaaaa) : new THREE.Color(0x000000)}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
        
        {/* Info panel with z-index and positioning fixes */}
        {(hovered || clicked) && (
          <Html
            distanceFactor={20}
            center
            zIndexRange={[100, 0]} // Ensure HTML stays on top
            style={{
              pointerEvents: 'none',
              transformStyle: 'preserve-3d',
            }}
            position={[0, size + 0.5, 0]} // Position above the planet
          >
            <div className={`
              bg-black/70 text-white p-2.5 rounded-md min-w-[150px] 
              transition-all duration-300 ${clicked ? 'scale-110' : 'scale-100'}
              backdrop-blur-sm border border-white/20 shadow-lg
            `}>
              <h3 className="m-0 text-amber-400 mb-2">{name}</h3>
              <p className="m-1 text-sm">Distance: {distance} AU</p>
              <p className="m-1 text-sm">Orbital Period: {orbitalPeriod} days</p>
              <p className="m-1 text-sm">Diameter: {(size * 2).toFixed(2)} units</p>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}