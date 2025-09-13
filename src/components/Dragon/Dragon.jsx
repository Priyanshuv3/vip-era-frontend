'use client'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Dragon(props) {
  const { nodes, materials } = useGLTF('/Red dragon.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_0.geometry}
          material={nodes.mesh_0.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh_1.geometry}
          material={nodes.mesh_1.material}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Red dragon.glb')