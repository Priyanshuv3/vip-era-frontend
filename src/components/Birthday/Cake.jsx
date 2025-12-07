"use client";

import { useState, useEffect } from "react";
import styles from "./cake.module.css";
import PracticeBlow from "./PracticeBlow";
import { calculateBlowScore } from "@/utils/audio";

export default function Cake() {
  const [blownOut, setBlownOut] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [frustrated, setFrustrated] = useState(false);

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (showPractice || blownOut) return; // Don't detect during practice or after blown

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

        const detectBlow = () => {
          analyser.getByteTimeDomainData(dataArray);
          const blowScore = calculateBlowScore(dataArray);
          setScore(blowScore);

          if (blowScore >= 100) setBlownOut(true);
          else if (blowScore > 20) setFrustrated(true);

          requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (err) {
        console.error(err);
      }
    };

    startMic();
  }, [showPractice, blownOut]);

  if (showPractice) {
    return <PracticeBlow onBack={() => setShowPractice(false)} />;
  }

  return (
    <div className={styles.wrapper}>
      <CakeSVG blownOut={blownOut} />
      {blownOut && <p className={styles.blownText}>🎉 You did it! Candles blown out! 🥳</p>}

      {!blownOut && frustrated && (
        <div style={{ marginTop: 20 }}>
          <p>Hmm… Not strong enough 😏</p>
          <button className={styles.button} onClick={() => setShowPractice(true)}>
            I can do it 💪
          </button>
          <button className={styles.button} onClick={() => alert("Birthday on hold 😤")}>
            I’m frustrated 😤
          </button>
        </div>
      )}
    </div>
  );
}

function CakeSVG({ blownOut }) {
  return (
    <svg width="220" height="220" viewBox="0 0 200 200">
      <rect x="30" y="120" width="140" height="50" fill="#f4a261" rx="10" />
      <rect x="30" y="100" width="140" height="30" fill="#e76f51" rx="8" />

      {[60, 100, 140].map((x, idx) => (
        <g key={idx}>
          <rect x={x} y="60" width="10" height="40" fill="#2a9d8f" rx="2" />
          {!blownOut && (
            <g className="flame-group">
              <ellipse cx={x + 2} cy="52" rx="3" ry="6" fill="#fff8a3" style={{ filter: "blur(1px)" }} />
              <ellipse cx={x + 2} cy="52" rx="4" ry="7" fill="#f4d35e" style={{ opacity: 0.8, filter: "blur(1.5px)" }} />
              <ellipse cx={x + 2} cy="53" rx="5" ry="9" fill="#f28482" style={{ opacity: 0.6, filter: "blur(2px)" }} />
            </g>
          )}
        </g>
      ))}

      <style>{`
        .flame-group {
          animation: flame-flicker 0.15s infinite alternate;
        }
        @keyframes flame-flicker {
          0% { transform: translateY(0px) scale(1); opacity: 1; }
          50% { transform: translateY(-1px) scale(1.05); opacity: 0.9; }
          100% { transform: translateY(1px) scale(1); opacity: 0.95; }
        }
      `}</style>
    </svg>
  );
}
