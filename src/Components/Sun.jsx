import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Sun() {
  const sunRef = useRef();
  const texture = useLoader(TextureLoader, '/textures/sun.jpg');

  useFrame(() => {
    sunRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive="#ff9900"
        emissiveIntensity={2}
        roughness={0.5}
        metalness={0.1}
        toneMapped={false}
      />
    </mesh>
  );
}