'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import {
  CAPABILITY_COUNT,
  getAllNodeProgress,
  getCapabilityPosition,
} from './constants';

type EngineSceneContentProps = {
  scrollProgress: number;
  isMobile?: boolean;
};

function CapabilityNode({
  progress,
  active,
  isMobile,
}: {
  progress: number;
  active: boolean;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = (0.35 + progress * 0.65) * (active ? 1.12 : 1);
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08,
    );
  });

  if (progress <= 0.01) return null;

  const color = active ? '#145BFF' : '#25B5FF';
  const emissive = active ? 0.65 : 0.35;

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[isMobile ? 0.11 : 0.13, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissive * progress}
          metalness={0.55}
          roughness={0.28}
          transparent
          opacity={0.4 + progress * 0.6}
        />
      </mesh>
      {active && (
        <mesh>
          <sphereGeometry args={[isMobile ? 0.17 : 0.2, 12, 12]} />
          <meshBasicMaterial color="#145BFF" transparent opacity={0.08} />
        </mesh>
      )}
    </group>
  );
}

function ConnectionLine({
  target,
  progress,
  color,
}: {
  target: THREE.Vector3;
  progress: number;
  color: string;
}) {
  const points = useMemo(() => {
    const end = new THREE.Vector3().lerpVectors(new THREE.Vector3(0, 0, 0), target, progress);
    return [new THREE.Vector3(0, 0, 0), end];
  }, [target, progress]);

  if (progress <= 0.001) return null;

  return (
    <Line
      points={points}
      color={color}
      transparent
      opacity={0.15 + progress * 0.35}
      lineWidth={1}
    />
  );
}

export function EngineSceneContent({
  scrollProgress,
  isMobile = false,
}: EngineSceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeProgress = getAllNodeProgress(scrollProgress);
  const activeIndex = Math.min(
    CAPABILITY_COUNT - 1,
    scrollProgress >= 1 ? CAPABILITY_COUNT - 1 : Math.floor(scrollProgress * CAPABILITY_COUNT),
  );

  const positions = useMemo(
    () => Array.from({ length: CAPABILITY_COUNT }, (_, i) => getCapabilityPosition(i)),
    [],
  );

  const targets = useMemo(
    () => positions.map((p) => new THREE.Vector3(...p)),
    [positions],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const targetTilt = -0.12 + scrollProgress * 0.06;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTilt, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollProgress * 0.18,
      0.03,
    );
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-2, 1, 3]} intensity={0.5} color="#25B5FF" />
      <pointLight position={[2, -1, 2]} intensity={0.35} color="#48B900" />

      <group ref={groupRef}>
        <mesh rotation={[Math.PI * 0.5, 0, 0]}>
          <torusGeometry args={[2.15, 0.006, 8, isMobile ? 64 : 96]} />
          <meshBasicMaterial color="#145BFF" transparent opacity={0.1} />
        </mesh>

        {targets.map((target, i) => (
          <ConnectionLine
            key={`line-${i}`}
            target={target}
            progress={nodeProgress[i]}
            color={i === activeIndex ? '#145BFF' : '#25B5FF'}
          />
        ))}

        {positions.map((pos, i) => (
          <group key={`node-${i}`} position={pos}>
            <CapabilityNode
              progress={nodeProgress[i]}
              active={i === activeIndex}
              isMobile={isMobile}
            />
          </group>
        ))}

        <mesh>
          <icosahedronGeometry args={[0.52, isMobile ? 0 : 1]} />
          <meshStandardMaterial
            color="#0A1F6B"
            emissive="#145BFF"
            emissiveIntensity={0.45}
            metalness={0.88}
            roughness={0.15}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.64, isMobile ? 0 : 1]} />
          <meshBasicMaterial color="#25B5FF" wireframe transparent opacity={0.18} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.28, isMobile ? 16 : 24, isMobile ? 16 : 24]} />
          <meshStandardMaterial
            color="#145BFF"
            emissive="#25B5FF"
            emissiveIntensity={0.55}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>
    </>
  );
}
