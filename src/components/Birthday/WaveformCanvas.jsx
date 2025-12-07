"use client";

export default function WaveformCanvas({ canvasRef }) {
  return <canvas ref={canvasRef} width={600} height={200} style={{ background: "#222", margin: "20px auto", display: "block" }} />;
}
