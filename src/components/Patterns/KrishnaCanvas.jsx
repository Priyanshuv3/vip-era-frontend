"use client";
import { useRef, useEffect } from "react";

export default function KrishnaReelCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "/krishna.png"; // place in /public

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // maintain aspect fit
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const w = img.width * scale;
      const h = img.height * scale;

      ctx.drawImage(
        img,
        (canvas.width - w) / 2,
        (canvas.height - h) / 2,
        w,
        h
      );

      // subtle divine glow
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = 30;
      ctx.drawImage(
        img,
        (canvas.width - w) / 2,
        (canvas.height - h) / 2,
        w,
        h
      );
      ctx.globalCompositeOperation = "source-over";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={640}
      style={{
        display: "block",
        margin: "0 auto",
        background: "black",
        border: "1px solid #333",
      }}
    />
  );
}
