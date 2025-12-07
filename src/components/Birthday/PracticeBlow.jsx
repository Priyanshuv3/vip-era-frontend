"use client";

import { useRef, useState, useEffect } from "react";
import WaveformCanvas from "./WaveformCanvas";
import ProgressBar from "./ProgressBar";
import styles from "./cake.module.css";
import { calculateBlowScore } from "@/utils/audio";

export default function PracticeBlow({ onBack }) {
  const canvasRef = useRef(null);
  const [blowScore, setBlowScore] = useState(0);
  const [rmsVal, setRmsVal] = useState(0);
  const [zcVal, setZcVal] = useState(0);

  useEffect(() => {
    let audioCtx, analyser, dataArray;

    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtx = new AudioContext();
        const source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 1024;
        dataArray = new Uint8Array(analyser.fftSize);
        source.connect(analyser);

        const draw = () => {
          analyser.getByteTimeDomainData(dataArray);
          const score = calculateBlowScore(dataArray);
          setBlowScore(score);

          // Update RMS and ZeroCrossings for bars
          const rms = Math.min(1, Math.max(0, score / 100));
          setRmsVal(rms * 100);
          const zc = Math.min(1, Math.max(0, score / 100));
          setZcVal(zc * 100);

          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "#f4d35e";
            ctx.beginPath();
            const sliceWidth = canvas.width / dataArray.length;
            let x = 0;
            for (let i = 0; i < dataArray.length; i++) {
              const v = dataArray[i] / 128.0;
              const y = (v * canvas.height) / 2;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
              x += sliceWidth;
            }
            ctx.stroke();
          }

          requestAnimationFrame(draw);
        };

        draw();
      } catch (err) {
        console.error(err);
      }
    };

    startMic();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Practice blowing!</h2>
      <WaveformCanvas canvasRef={canvasRef} />
      <ProgressBar label="Blow Strength" value={blowScore} />
      <ProgressBar label="RMS" value={rmsVal} />
      <ProgressBar label="Zero Crossings" value={zcVal} />

      <button className={styles.button} onClick={onBack}>
        I'm ready! ✅
      </button>
    </div>
  );
}
