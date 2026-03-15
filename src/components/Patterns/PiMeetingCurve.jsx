import { useRef, useEffect, useState } from "react";

export default function PiMeetingCurve() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const thetaRef = useRef(0);

  const [isRunning, setIsRunning] = useState(false);

  const SCALE = 80;
  const maxTheta = 316;

  // 🔴 STARTING POINT (RED MARK)
  const startX = 2; // cos(0) + cos(0)
  const startY = 0; // sin(0) + sin(0)

  // 🎥 SPEEDS
  const NORMAL_SPEED = 0.04;
  const CINEMATIC_SPEED = 0.0001;

  // 🎥 ZOOMS
  const NORMAL_ZOOM = 1;
  const CINEMATIC_ZOOM = 60;

  // 🎯 TRIGGER DISTANCE (VERY CLOSE TO RED)
  const CINEMATIC_RADIUS = 0.06;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const DPR = window.devicePixelRatio || 1;
    const W = 600;
    const H = 600;

    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    function draw() {
      if (!isRunning) return;

      const theta = thetaRef.current;

      // -----------------------------
      // CURRENT MOVING POINT
      // -----------------------------
      const px = Math.cos(theta) + Math.cos(Math.PI * theta);
      const py = Math.sin(theta) + Math.sin(Math.PI * theta);

      // -----------------------------
      // DISTANCE FROM RED (START)
      // -----------------------------
      const dx = px - startX;
      const dy = py - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // -----------------------------
      // 🎬 CINEMATIC SWITCH (BINARY)
      // -----------------------------
      const isCinematic = distance < CINEMATIC_RADIUS;

      const speed = isCinematic ? CINEMATIC_SPEED : NORMAL_SPEED;
      const zoom = isCinematic ? CINEMATIC_ZOOM : NORMAL_ZOOM;

      // -----------------------------
      // FADE (always same)
      // -----------------------------
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, W, H);

      ctx.save();

      // -----------------------------
      // CAMERA
      // -----------------------------
      if (isCinematic) {
        // 🎯 lock camera to moving point
        ctx.translate(W / 2, H / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-px * SCALE, -py * SCALE);
      } else {
        // 🧘 normal static camera
        ctx.translate(W / 2, H / 2);
      }

      // -----------------------------
      // DRAW CURVE
      // -----------------------------
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.15 / zoom;
      ctx.shadowBlur = 0;

      for (let t2 = 0; t2 < theta; t2 += 0.01) {
        const x = Math.cos(t2) + Math.cos(Math.PI * t2);
        const y = Math.sin(t2) + Math.sin(Math.PI * t2);
        if (t2 === 0) ctx.moveTo(x * SCALE, y * SCALE);
        else ctx.lineTo(x * SCALE, y * SCALE);
      }

      ctx.stroke();
      // 🔴 DRAW STARTING POINT (RED)
        ctx.beginPath();
        ctx.arc(startX * SCALE, startY * SCALE, 0.8 / zoom, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

      ctx.restore();

      // -----------------------------
      // ADVANCE TIME
      // -----------------------------
      thetaRef.current += speed;

      if (thetaRef.current < maxTheta) {
        animationRef.current = requestAnimationFrame(draw);
      } else {
        setIsRunning(false);
      }
    }

    if (isRunning) {
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning]);

  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <canvas ref={canvasRef} />

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>
          ▶ Start
        </button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
          ⏸ Pause
        </button>
      </div>
    </div>
  );
}
