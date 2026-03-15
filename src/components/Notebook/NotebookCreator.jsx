"use client"

import { useState } from "react"
import styles from "./notebook.module.css"

export default function NotebookCreator({createNotebook}){

  const [title,setTitle] = useState("")
  const [type,setType] = useState("blank")
  const [showForm, setShowForm] = useState(false)

  function handleCreate(){

    if(!title.trim()) return

    createNotebook({title,type})

    setTitle("")
    setType("blank")
    setShowForm(false)
  }

  if (!showForm) {
    return (
      <button 
        className={styles.createNewBtn}
        onClick={() => setShowForm(true)}
      >
        + Create New Notebook
      </button>
    )
  }

  return(

    <div className={styles.creatorForm}>

      <input
        placeholder="Notebook title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
        autoFocus
      />

      <div className={styles.typeSelector}>
        <label>Page Type:</label>
        <div className={styles.typeOptions}>
          {['blank', 'lined', 'grid'].map((pageType) => (
            <button
              key={pageType}
              className={`${styles.typeOption} ${type === pageType ? styles.active : ''}`}
              onClick={() => setType(pageType)}
            >
              {pageType.charAt(0).toUpperCase() + pageType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.creatorActions}>
        <button 
          onClick={() => setShowForm(false)}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
        <button 
          onClick={handleCreate}
          className={styles.createBtn}
        >
          Create
        </button>
      </div>

    </div>

  )
}