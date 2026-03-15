"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import NotebookCreator from "./NotebookCreator"
import { saveNotebook, getAllNotebooks, deleteNotebook } from "@/utils/notebookDB"
import styles from "./notebook.module.css"

export default function NotebookHome(){

  const [notebooks,setNotebooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load notebooks from IndexedDB on mount
  useEffect(() => {
    loadNotebooks()
  }, [])

  async function loadNotebooks() {
    try {
      const saved = await getAllNotebooks()
      setNotebooks(saved)
    } catch (error) {
      console.error("Failed to load notebooks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function createNotebook(config){

    const notebook = {
      id: uuidv4(),
      title: config.title,
      type: config.type,
      createdAt: new Date().toISOString(),
      pages: [{
        id: uuidv4(),
        strokes: [],
        textContent: []
      }]
    }

    try {
      await saveNotebook(notebook)
      setNotebooks(prev => [...prev, notebook])
    } catch (error) {
      console.error("Failed to create notebook:", error)
    }
  }

  async function handleDeleteNotebook(id, e) {
    e.stopPropagation()
    try {
      await deleteNotebook(id)
      setNotebooks(prev => prev.filter(nb => nb.id !== id))
    } catch (error) {
      console.error("Failed to delete notebook:", error)
    }
  }

  if(isLoading) {
    return (
      <div className={styles.home}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p>Loading notebooks...</p>
        </div>
      </div>
    )
  }

  return(

    <div className={styles.home}>

      <NotebookCreator createNotebook={createNotebook}/>

      {notebooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p>No notebooks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className={styles.notebookList}>
          {notebooks.map(nb=>(
            <Link
              key={nb.id}
              href={`/notebook/${nb.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className={styles.notebookCard}>
                {/* Notebook Cover */}
                <div className={styles.notebookCover}>
                  {/* Spine effect */}
                  <div className={styles.notebookSpine}></div>
                  
                  {/* Cover content */}
                  <div className={styles.coverContent}>
                    <h3 className={styles.notebookTitle}>{nb.title}</h3>
                    <div className={styles.pageTypeIndicator}>
                      <span className={styles.pageTypeIcon}>
                        {nb.type === 'lined' ? '≡' : nb.type === 'grid' ? '⊞' : '⬚'}
                      </span>
                      <span className={styles.pageTypeLabel}>{nb.type}</span>
                    </div>
                  </div>
                  
                  {/* Page count badge */}
                  <div className={styles.pageCountBadge}>
                    <span className={styles.pageCount}>{nb.pages?.length || 1}</span>
                    <span className={styles.pageLabel}>pages</span>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => handleDeleteNotebook(nb.id, e)}
                  title="Delete notebook"
                >
                  ✕
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>

  )
}