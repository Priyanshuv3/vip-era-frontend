"use client";
import { useRef,useState,useEffect } from "react";

export default function TwoRotatingLines() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [size, setSize] = useState({ width: 360, height: 640 });

    useEffect(() => {
      const updateSize = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const ratio = 9 / 16;
        let width, height;

        if (vw / vh > ratio) {
          height = vh - 20;
          width = height * ratio;
        } else {
          width = vw - 20;
          height = width / ratio;
        }

        setSize({ width, height });
      };

      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);

  let angle1 = 0;
  let angle2 = 0;

  const r1 = 80;
  const r2 = 105;

  let prev1 = null;
  let prev2 = null;

  const start = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.lineWidth = 1.4;

    const draw = () => {

      angle1 += 0.015;
      angle2 -= 0.04;

      const x1 = cx + r1 * Math.cos(angle1);
      const y1 = cy + r1 * Math.sin(angle1);

      const x2 = x1 + r2 * Math.cos(angle2);
      const y2 = y1 + r2 * Math.sin(angle2);

      // --- Trails ---
      if (prev1) {
        ctx.strokeStyle = "#ff0084ff";
        ctx.beginPath();
        ctx.moveTo(prev1.x, prev1.y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      if (prev2) {
        ctx.strokeStyle = "#ff0084ff";
        ctx.beginPath();
        ctx.moveTo(prev2.x, prev2.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      prev1 = { x: x1, y: y1 };
      prev2 = { x: x2, y: y2 };

      // --- LIVE ROTATING LINES (IMPORTANT PART) ---
      ctx.strokeStyle = "#ff0084ff"; // visible blue rod
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      ctx.strokeStyle = "#f472b6"; // visible pink rod
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const stop = () => cancelAnimationFrame(animationRef.current);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        style={{
          border: "1px solid #444",
          background: "black",
          marginTop: 10,
          boxShadow: "0 0 6px rgba(255,255,255,0.4)",
        }}
      />

      <div style={{ marginTop: 16 }}>
        <button onClick={start}>Start</button>
        <button onClick={stop} style={{ marginLeft: 12 }}>
          Stop
        </button>
      </div>
    </div>
  );
}
