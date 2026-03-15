"use client"

import { useState } from "react"
import styles from "./notebook.module.css"

const COLORS = {
  black: "#000000",
  blue: "#2563eb",
  red: "#dc2626",
  green: "#16a34a",
}

export default function BottomToolbar({
  setColor,
  undo,
  redo,
  canUndo,
  canRedo,
  nextLine,
}){
  const [activeColor, setActiveColor] = useState("blue")

  const handleColorClick = (colorName) => {
    setActiveColor(colorName)
    setColor(COLORS[colorName])
  }

  return(
    <div className={styles.toolbar}>
      {Object.entries(COLORS).map(([name, value]) => (
        <button
          key={name}
          onClick={() => handleColorClick(name)}
          className={`${styles.colorButton} ${activeColor === name ? styles.active : ""}`}
          style={{ backgroundColor: value }}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
        >
          {activeColor === name && "✓"}
        </button>
      ))}

      <div className={styles.divider}></div>

      <button 
        onClick={nextLine}
        title="Next Line"
        className={styles.nextLineBtn}
      >
        ↵ Line
      </button>

      <div className={styles.divider}></div>

      <button 
        onClick={undo}
        disabled={!canUndo}
        title="Undo"
        className={styles.undoBtn}
      >
        ↶
      </button>

      <button 
        onClick={redo}
        disabled={!canRedo}
        title="Redo"
        className={styles.redoBtn}
      >
        ↷
      </button>
    </div>
  )
}