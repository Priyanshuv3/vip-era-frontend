"use client";

import {Login } from "@/components";
import "./globals.css"
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Dragon } from "@/components/Dragon/Dragon";

export default function Home() {
  return (
    // 
    <div >

    <Login></Login>
    {/* <Canvas style={{ width: '50%', height: '50%' }}>
      <Environment preset="studio"/>
      <OrbitControls />
      <Dragon/>
    </Canvas> */}
    </div>
  );
}
