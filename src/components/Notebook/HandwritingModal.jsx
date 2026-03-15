"use client"

import { useState } from "react"
import styles from "./handwritingModal.module.css"

export default function HandwritingModal({ onSubmit, onCancel }) {
  const [text, setText] = useState("")

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text)
      setText("")
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>What did you write?</h3>
        <p className={styles.hint}>Type the text you just wrote:</p>

        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your handwritten text here..."
          className={styles.textarea}
        />

        <div className={styles.buttonGroup}>
          <button onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.submitBtn}>
            Convert to Text
          </button>
        </div>
      </div>
    </div>
  )
}
