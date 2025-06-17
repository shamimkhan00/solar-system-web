import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export default function Planet({ distance, showTrails, isDarkTheme, size, speed, color, texture, name, isPaused }) {
    const planetRef = useRef();
    const orbitRef = useRef();
    const trailRef = useRef();
    const [hovered, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);
    const planetTexture = useLoader(TextureLoader, texture);
    const trailPoints = useRef([]);
    const maxTrailPoints = 100;

    // Calculate orbital period
    const orbitalPeriod = ((2 * Math.PI) / speed).toFixed(1);

    // Trail geometry with initial empty points
    const trailGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        // Initialize with empty positions
        const positions = new Float32Array(maxTrailPoints * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

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
        geometry.rotateX(-Math.PI / 2);
        geometry.translate(0, 0.1, 0);
        return geometry;
    }, [distance]);

    // Update trail points
    useFrame(({ clock }) => {
        if (!isPaused && planetRef.current) {
            const elapsedTime = clock.getElapsedTime();
            const angle = elapsedTime * speed;
            const x = Math.sin(angle) * distance;
            const z = Math.cos(angle) * distance;
            
            planetRef.current.position.set(x, 0, z);
            planetRef.current.rotation.y += 0.01;

            if (showTrails) {
                // Add current position to trail
                trailPoints.current.push(new THREE.Vector3(x, 0, z));
                
                // Limit trail length
                if (trailPoints.current.length > maxTrailPoints) {
                    trailPoints.current.shift();
                }
                
                // Update trail geometry only if we have points
                if (trailPoints.current.length > 0) {
                    trailGeometry.setFromPoints(trailPoints.current);
                }
            }
        }
    });

    // Clear trail when toggled off or paused
    useEffect(() => {
        if (!showTrails || isPaused) {
            trailPoints.current = [];
            // Reset geometry with empty positions
            const positions = new Float32Array(maxTrailPoints * 3);
            trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        }
    }, [showTrails, isPaused, trailGeometry]);

    return (
        <group>
            {/* Static orbit path */}
            {showTrails && (
                <line ref={orbitRef} geometry={orbitGeometry}>
                    <lineDashedMaterial
                        color={isDarkTheme ? 0x333333 : 0x6699ff}
                        dashSize={0.5}
                        gapSize={0.3}
                        linewidth={1}
                        transparent
                        opacity={isDarkTheme ? 0.3 : 0.2}
                    />
                </line>
            )}

            {/* Dynamic trail - only render if we have points */}
            {showTrails && trailPoints.current.length > 0 && (
                <line ref={trailRef} geometry={trailGeometry}>
                    <lineBasicMaterial
                        color={isDarkTheme ? 0x88aaff : 0x0066ff}
                        linewidth={2}
                        transparent
                        opacity={0.7}
                    />
                </line>
            )}

            {/* Planet */}
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
                    color={hovered ? 0xffffff : color}
                    metalness={0.1}
                    roughness={0.8}
                    emissive={hovered ? 0xaaaaaa : 0x000000}
                    emissiveIntensity={hovered ? 0.5 : 0}
                />

                {/* Info panel */}
                {(hovered || clicked) && (
                    <Html
                        distanceFactor={20}
                        center
                        zIndexRange={[100, 0]}
                        style={{ pointerEvents: 'none' }}
                        position={[0, size + 0.5, 0]}
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