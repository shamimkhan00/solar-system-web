import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export default function Planet({ distance, size, speed, color, texture, name }) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const planetTexture = useLoader(TextureLoader, texture);
  
  // Orbit geometry
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
    geometry.rotateX(-Math.PI / 2); // Rotate orbit to be horizontal
    return geometry;
  }, [distance]);

  // Dotted line material
  const orbitMaterial = useMemo(() => new THREE.LineDashedMaterial({
    color: new THREE.Color(0xaaaaaa),
    dashSize: 0.5,
    gapSize: 0.3,
    linewidth: 1,
    transparent: true,
    opacity: 0.5
  }), []);

  // Animation frame for revolution
  useFrame(({ clock }) => {
    if (planetRef.current) {
      // Revolution around sun
      const elapsedTime = clock.getElapsedTime();
      const angle = elapsedTime * speed;
      planetRef.current.position.x = Math.sin(angle) * distance;
      planetRef.current.position.z = Math.cos(angle) * distance;
      
      // Rotation on axis
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Orbit path */}
      <line ref={orbitRef} geometry={orbitGeometry} material={orbitMaterial} computeLineDistances />
      
      {/* Planet */}
      <mesh ref={planetRef} position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          map={planetTexture}
          color={color}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}