"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import NotebookCanvas from "@/components/Notebook/NotebookCanvas"
import { getNotebook } from "@/utils/notebookDB"

export default function NotebookDetailPage({ params }) {
  const [notebook, setNotebook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  
  // Unwrap the params Promise
  const { id } = use(params)

  useEffect(() => {
    loadNotebook()
  }, [id])

  async function loadNotebook() {
    try {
      setIsLoading(true)
      const data = await getNotebook(id)
      if (data) {
        setNotebook(data)
      } else {
        setError("Notebook not found")
      }
    } catch (err) {
      console.error("Failed to load notebook:", err)
      setError("Failed to load notebook")
    } finally {
      setIsLoading(false)
    }
  }

  function handleGoBack() {
    router.back()
  }

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Loading notebook...</p>
      </div>
    )
  }

  if (error || !notebook) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
        <p style={{ color: "red", marginBottom: "20px" }}>{error || "Notebook not found"}</p>
        <button
          onClick={() => router.push("/notebook")}
          style={{
            padding: "10px 20px",
            background: "#00a080",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Notebooks
        </button>
      </div>
    )
  }

  return <NotebookCanvas notebook={notebook} goBack={handleGoBack} />
}
