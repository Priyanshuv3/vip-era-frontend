'use client'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Dragon(props) {
  const { nodes, materials } = useGLTF('/models/red-dragon.glb')

  const enhancedMaterial = new THREE.MeshStandardMaterial({
    color: materials.mesh_0?.color || new THREE.Color("#00ff88"),
    roughness: 0.4,
    metalness: 0.3,
  })

  return (
    <group
      {...props}
      dispose={null}
      scale={0.5}
      rotation={[0, -0.8, 0]}
      position={[0, -5, -7]}
    >
      {/* 👍 No shadow lights */}
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.1} position={[5, 5, 5]} />

      {/* 👍 No mesh shadows */}
      <mesh
        geometry={nodes.mesh_0.geometry}
        material={enhancedMaterial}
      />
      <mesh
        geometry={nodes.mesh_1.geometry}
        material={enhancedMaterial}
      />
    </group>
  )
}

useGLTF.preload('/models/red-dragon.glb')
