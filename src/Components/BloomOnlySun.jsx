// BloomOnlySun.jsx
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BloomOnlySun() {
  const { scene, camera, size } = useThree();

  // Use a new ref for the composer if needed, but the React components handle sizing.
  // Layers logic remains the same.
  const bloomLayer = new THREE.Layers();
  bloomLayer.set(1);

  const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
  const materials = {};

  const darkenNonBloomed = (obj) => {
    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
      materials[obj.uuid] = obj.material;
      obj.material = darkMaterial;
    }
  };

  const restoreMaterials = (obj) => {
    if (materials[obj.uuid]) {
      obj.material = materials[obj.uuid];
      delete materials[obj.uuid];
    }
  };

  // Ensure objects are darkened before bloom pass renders
  return (
    <>
      <primitive
        object={scene}
        onBeforeRender={() => scene.traverse(darkenNonBloomed)}
        onAfterRender={() => scene.traverse(restoreMaterials)}
      />
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
    </>
  );
}
