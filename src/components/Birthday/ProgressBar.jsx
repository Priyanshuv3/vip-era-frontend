"use client";

export default function ProgressBar({ label, value }) {
  return (
    <div style={{ width: 600, margin: "10px auto" }}>
      <p>{label}: {Math.round(value)}%</p>
      <div style={{ width: "100%", height: 20, background: "#555", borderRadius: 10 }}>
        <div style={{ width: `${value}%`, height: "100%", background: "#f4d35e", borderRadius: 10, transition: "width 0.05s linear" }} />
      </div>
    </div>
  );
}
