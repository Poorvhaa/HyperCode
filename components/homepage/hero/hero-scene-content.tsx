'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

type HeroSceneContentProps = {
  isMobile?: boolean;
};

const NODE_POSITIONS: [number, number, number][] = [
  [1.85, 0.35, 0.55],
  [-1.65, 0.55, 0.75],
  [0.45, -1.75, 0.65],
  [0.75, 1.55, -0.85],
  [-1.25, -1.15, -0.55],
  [1.55, -0.65, -1.05],
  [-0.85, 1.85, -0.45],
  [0.15, 0.25, 2.05],
];

export function HeroSceneContent({ isMobile = false }: HeroSceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const ringSegments = isMobile ? 48 : 80;
  const coreDetail = isMobile ? 1 : 2;

  const connectionLines = useMemo(() => {
    return NODE_POSITIONS.map((pos) => ({
      points: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...pos)],
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const parallaxX = pointer.x * 0.12;
    const parallaxY = pointer.y * 0.08;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        t * 0.025 + parallaxX,
        0.035,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        parallaxY * 0.5,
        0.035,
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.04;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.015;
      ringsRef.current.rotation.x = Math.PI * 0.35;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#030A14', 6, 14]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={1.4} color="#25B5FF" />
      <pointLight position={[-4, -2, 3]} intensity={0.65} color="#48B900" />
      <directionalLight position={[2, 4, 6]} intensity={0.45} color="#ffffff" />

      <group ref={groupRef}>
        {/* Core structure */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.72, coreDetail]} />
          <meshStandardMaterial
            color="#0A1F6B"
            emissive="#145BFF"
            emissiveIntensity={0.35}
            metalness={0.85}
            roughness={0.18}
            transparent
            opacity={0.92}
          />
        </mesh>

        <mesh>
          <icosahedronGeometry args={[0.88, coreDetail]} />
          <meshBasicMaterial color="#25B5FF" wireframe transparent opacity={0.22} />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.38, isMobile ? 16 : 24, isMobile ? 16 : 24]} />
          <meshStandardMaterial
            color="#145BFF"
            emissive="#25B5FF"
            emissiveIntensity={0.55}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        {/* Orbital rings */}
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI * 0.5, 0, 0]}>
            <torusGeometry args={[1.55, 0.012, 8, ringSegments]} />
            <meshBasicMaterial color="#25B5FF" transparent opacity={0.35} />
          </mesh>
          <mesh rotation={[Math.PI * 0.35, Math.PI * 0.25, 0]}>
            <torusGeometry args={[1.85, 0.01, 8, ringSegments]} />
            <meshBasicMaterial color="#48B900" transparent opacity={0.28} />
          </mesh>
          <mesh rotation={[Math.PI * 0.15, Math.PI * 0.55, Math.PI * 0.1]}>
            <torusGeometry args={[2.15, 0.008, 8, ringSegments]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
          </mesh>
        </group>

        {/* Data nodes */}
        {NODE_POSITIONS.map((pos, i) => (
          <group key={i} position={pos}>
            <mesh>
              <sphereGeometry args={[isMobile ? 0.055 : 0.065, 12, 12]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#25B5FF' : '#48B900'}
                emissive={i % 2 === 0 ? '#25B5FF' : '#48B900'}
                emissiveIntensity={0.7}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[isMobile ? 0.09 : 0.11, 8, 8]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? '#25B5FF' : '#48B900'}
                transparent
                opacity={0.12}
              />
            </mesh>
          </group>
        ))}

        {/* Connection lines */}
        {connectionLines.map((line, i) => (
          <Line
            key={`line-${i}`}
            points={line.points}
            color={i % 2 === 0 ? '#25B5FF' : '#48B900'}
            transparent
            opacity={0.18}
            lineWidth={1}
          />
        ))}

        {/* Ground reflection plane */}
        <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -1.65, 0]}>
          <circleGeometry args={[2.8, isMobile ? 32 : 48]} />
          <meshBasicMaterial color="#145BFF" transparent opacity={0.04} />
        </mesh>
      </group>
    </>
  );
}
