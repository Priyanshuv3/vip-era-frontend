"use client";

import Dragon from "@/components/Dragon/Dragon";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "../globals.css";
import Portfolio from "./Portfolio";

export default function Home() {
  return (
    //
    <div>
      <Portfolio></Portfolio>
      <Canvas
        shadows
        camera={{ position: [0, 0, 20], fov: 30 }}
        style={{
          width: "100%",
          height: "500px", // large hero size
          marginTop: "40px",
        }}
      >
        <Environment preset="sunset" />
        <OrbitControls enablePan={false} enableZoom={true} />
        <Dragon />
      </Canvas>
    </div>
  );
}
