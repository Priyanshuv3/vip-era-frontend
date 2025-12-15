"use client";

import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const KEY_MAP = {
  bass: {
    label: "Bass (Long)",
    keys: ["a", "s", "d"],
    freq: 130.81, // C3
  },
  mid: {
    label: "Mid",
    keys: ["f", "g", "h"],
    freq: 196.0, // G3
  },
  treble: {
    label: "Treble (Short)",
    keys: ["j", "k", "l"],
    freq: 329.63, // E4
  },
};

export default function TypingStrings() {
  const synthRef = useRef(null);
  const audioReadyRef = useRef(false);
  const lastKeyTimeRef = useRef(0);

  const [text, setText] = useState("");

  /* ---------------- AUDIO INIT ---------------- */

  const initAudio = async () => {
    if (audioReadyRef.current) return;

    await Tone.start();

    synthRef.current = new Tone.PluckSynth({
      attackNoise: 1,
      dampening: 2800,
      resonance: 0.96,
    }).toDestination();

    audioReadyRef.current = true;
  };

  useEffect(() => {
    return () => {
      if (synthRef.current) synthRef.current.dispose();
    };
  }, []);

  /* ---------------- KEY → SOUND LOGIC ---------------- */

  const getSoundConfig = (key) => {
    key = key.toLowerCase();

    for (const group of Object.values(KEY_MAP)) {
      if (group.keys.includes(key)) {
        return group;
      }
    }
    return null;
  };

  const handleKeySound = async (key) => {
    const config = getSoundConfig(key);
    if (!config) return;

    if (!audioReadyRef.current) await initAudio();
    if (!synthRef.current) return;

    const now = performance.now();
    const delta = now - lastKeyTimeRef.current;
    lastKeyTimeRef.current = now;

    const velocity = Math.min(Math.max(1 / (delta / 120), 0.3), 1);

    synthRef.current.triggerAttack(config.freq, undefined, velocity);
  };

  /* ---------------- TEXT INPUT ---------------- */

  const handleChange = async (e) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);

    setText(value);

    if (lastChar) {
      await handleKeySound(lastChar);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#eafff5",
        padding: "2rem",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ marginBottom: "0.5rem" }}>Typing Strings</h1>
      <p style={{ opacity: 0.8 }}>
        Type on keyboard to play strings (mobile supported)
      </p>

      {/* KEY GUIDE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {Object.values(KEY_MAP).map((group) => (
          <div
            key={group.label}
            style={{
              border: "1px solid #005f55",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <strong>{group.label}</strong>
            <div style={{ marginTop: "0.5rem", fontSize: "1.2rem" }}>
              {group.keys.map((k) => (
                <span
                  key={k}
                  style={{
                    display: "inline-block",
                    marginRight: "0.5rem",
                    padding: "0.2rem 0.5rem",
                    border: "1px solid #00b89f",
                    borderRadius: "6px",
                  }}
                >
                  {k.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DEMO */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#020d0c",
          borderRadius: "12px",
          border: "1px dashed #0ea37a",
        }}
      >
        <strong>Try this demo:</strong>
        <pre style={{ marginTop: "0.5rem" }}>
          ASD ASD{"\n"}FGH FGH{"\n"}JKL JKL
        </pre>
      </div>

      {/* TEXTAREA */}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type here..."
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        style={{
          width: "100%",
          marginTop: "2rem",
          minHeight: "120px",
          background: "#020202",
          color: "#eafff5",
          border: "1px solid #005f55",
          borderRadius: "12px",
          padding: "1rem",
          fontSize: "1rem",
        }}
      />

      {/* LIVE OUTPUT */}
      <div
        style={{
          marginTop: "1rem",
          opacity: 0.7,
          wordBreak: "break-word",
        }}
      >
        <strong>Typed:</strong> {text || "—"}
      </div>
    </div>
  );
}
