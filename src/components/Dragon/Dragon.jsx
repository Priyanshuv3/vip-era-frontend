'use client'
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Dragon(props) {
  const group = useRef();
  const { nodes } = useGLTF("/models/red-dragon.glb");

  // Realistic material (keep your color)
  const dragonMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#00564c"),
    emissive: new THREE.Color("#220000"),
    emissiveIntensity: 0.04,
    roughness: 0.5,
    metalness: 0.3,
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!group.current) return;

    /* -----------------------------
       1. Slow majestic rotation
    ------------------------------ */
    group.current.rotation.y -= 0.008;

    /* -----------------------------
       2. Breathing (scale pulse)
    ------------------------------ */
    const breath = 1 + Math.sin(t * 1.2) * 0.02;
    group.current.scale.set(
      0.55 * breath,
      0.55 * breath,
      0.55 * breath
    );

    /* -----------------------------
       3. Subtle body tilt (alive feel)
    ------------------------------ */
    group.current.rotation.x = Math.sin(t * 0.6) * 0.03;
    group.current.rotation.z = Math.cos(t * 0.5) * 0.02;

    /* -----------------------------
       4. Vertical hover
    ------------------------------ */
    group.current.position.y =
      -3.2 + Math.sin(t * 0.8) * 0.25;
  });

  return (
    <group
      ref={group}
      {...props}
      position={[-9, -3.2, -15]}
      rotation={[0, -0.3, 0]}
      dispose={null}
    >
      {Object.values(nodes)
        .filter((n) => n.type === "Mesh")
        .map((mesh, i) => (
          <mesh
            key={i}
            geometry={mesh.geometry}
            material={dragonMaterial}
          />
        ))}
    </group>
  );
}

useGLTF.preload("/models/red-dragon.glb");
