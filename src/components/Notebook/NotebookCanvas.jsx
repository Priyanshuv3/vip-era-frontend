"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import debounce from "lodash.debounce"
import { getStroke } from "perfect-freehand"
import { v4 as uuidv4 } from "uuid"
import BottomToolbar from "./BottomToolbar"
import { calculateTextPosition } from "@/utils/strokeProcessing"
import { extractTextFromStrokes } from "@/utils/handwritingRecognition"
import { updateNotebook } from "@/utils/notebookDB"
import styles from "./notebook.module.css"

export default function NotebookCanvas({ notebook, goBack }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const lastProcessedStrokesRef = useRef([])
  const performOCRRef = useRef(null)

  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [points, setPoints] = useState([])
  const [strokes, setStrokes] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [currentLineY, setCurrentLineY] = useState(30) // Track current line position for manual line breaks

  const [tool, setTool] = useState("pen")
  const [color, setColor] = useState("#2563eb") // Blue by default

  const [isRecognizing, setIsRecognizing] = useState(false)
  const [recognizingText, setRecognizingText] = useState("") // Text being recognized
  const [notebookData, setNotebookData] = useState(notebook)
  const [editingTextId, setEditingTextId] = useState(null) // Track which text block is being edited
  const [editingText, setEditingText] = useState("") // Store the edited text temporarily
  const editInputRef = useRef(null) // Ref for input field

  const drawingRef = useRef(false)

  const toolSizes = {
    pen: 5,
  }

  const currentPage = notebookData?.pages?.[currentPageIndex]

  // Sync notebook prop to state when it changes
  useEffect(() => {
    if (notebook) {
      setNotebookData(notebook)
      setCurrentPageIndex(0)
      setCurrentLineY(30)
    }
  }, [notebook?.id])

  // Initialize canvas with proper scaling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const ctx = canvas.getContext("2d")
    ctx.scale(dpr, dpr)

    // Prevent scrolling during touch
    const preventScroll = (e) => {
      if (e.target === canvas) {
        e.preventDefault()
      }
    }

    canvas.addEventListener("touchmove", preventScroll, { passive: false })

    return () => {
      canvas.removeEventListener("touchmove", preventScroll)
    }
  }, [])

  // Auto-focus and select all text when editing starts
  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [editingTextId])
  const performOCR = useCallback(async (strokesData) => {
    if (
      strokesData.length === 0 ||
      JSON.stringify(lastProcessedStrokesRef.current) ===
        JSON.stringify(strokesData)
    ) {
      return
    }

    // Mark as processed BEFORE clearing to prevent re-triggering
    lastProcessedStrokesRef.current = strokesData
    
    // Clear strokes immediately when OCR starts (as user requested)
    setPoints([])
    setStrokes([])
    setRedoStack([])

    try {
      // Extract text from the strokes
      const recognizedText = await extractTextFromStrokes(
        strokesData,
        canvasRef.current.width,
        canvasRef.current.height
      )

      // Only add text if something was recognized
      if (recognizedText && recognizedText.length > 0) {
        setRecognizingText(recognizedText)
        setIsRecognizing(true)
        
        // Small delay to show what's being converted
        await new Promise(resolve => setTimeout(resolve, 300))
        
        setNotebookData((prevData) => {
          if (!prevData || !prevData.pages || prevData.pages.length === 0) {
            return prevData
          }
          
          const newTextContent = prevData.pages[currentPageIndex]
            .textContent
            ? [...prevData.pages[currentPageIndex].textContent]
            : []

          // Calculate position based on last text block
          let newX = 20
          let newY = currentLineY
          
          if (newTextContent.length > 0) {
            const lastBlock = newTextContent[newTextContent.length - 1]
            // If on same line, position right after last text
            if (lastBlock.y === currentLineY) {
              const canvas = canvasRef.current
              const ctx = canvas.getContext("2d")
              ctx.font = "1rem 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              const textMetrics = ctx.measureText(lastBlock.text + " ")
              newX = lastBlock.x + textMetrics.width + 5
              newY = lastBlock.y
            } else {
              newX = 20
              newY = currentLineY
            }
          }

          newTextContent.push({
            id: uuidv4(),
            text: recognizedText,
            x: newX,
            y: newY,
            lineNumber: newTextContent.length,
            color: color,
          })

          // Update notebook with new text
          const updatedPages = [...prevData.pages]
          updatedPages[currentPageIndex] = {
            ...updatedPages[currentPageIndex],
            textContent: newTextContent,
            strokes: [],
          }

          const updated = { ...prevData, pages: updatedPages }

          // Persist to IndexedDB
          updateNotebook(updated)

          return updated
        })
      }
    } catch (error) {
      console.error("Handwriting recognition error:", error)
    } finally {
      setIsRecognizing(false)
      setRecognizingText("")
    }
  }, [currentPageIndex, currentLineY])

  // Update the ref so debounce always has the latest performOCR
  useEffect(() => {
    performOCRRef.current = performOCR
  }, [performOCR])

  // Create debounced OCR function - increased to 2000ms for more deliberate pause
  const debouncedOCR = useRef(null)

  // Initialize debounce on mount
  useEffect(() => {
    debouncedOCR.current = debounce((strokesData) => {
      if (performOCRRef.current) {
        performOCRRef.current(strokesData)
      }
    }, 2000)
  }, [])

  // Trigger automatic handwriting processing only when strokes change and not empty
  useEffect(() => {
    if (strokes.length > 0 && !isRecognizing) {
      if (debouncedOCR.current) {
        debouncedOCR.current(strokes)
      }
    } else if (strokes.length === 0) {
      debouncedOCR.current?.cancel()
    }
  }, [strokes, isRecognizing])

  function getPoint(e) {
    const rect = canvasRef.current.getBoundingClientRect()

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function startDraw(e) {
    if (isRecognizing) return

    drawingRef.current = true
    const p = getPoint(e)
    setPoints([[p.x, p.y]])
  }

  function draw(e) {
    if (!drawingRef.current) return

    const p = getPoint(e)
    setPoints((prev) => [...prev, [p.x, p.y]])
  }

  function endDraw() {
    if (!drawingRef.current) return

    drawingRef.current = false

    if (points.length > 0) {
      const newStroke = {
        id: uuidv4(),
        tool,
        color,
        size: toolSizes[tool],
        points,
      }

      setStrokes((prev) => [...prev, newStroke])
    }

    setPoints([])
  }

  function handleHandwritingCancel() {
    setPoints([])
  }

  function undo() {
    if (strokes.length === 0) return

    const undoneStroke = strokes[strokes.length - 1]
    const newStrokes = strokes.slice(0, -1)

    setStrokes(newStrokes)
    setRedoStack([...redoStack, undoneStroke])

    // Update page
    const updatedPages = [...notebookData.pages]
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      strokes: newStrokes,
    }

    const updated = { ...notebookData, pages: updatedPages }
    setNotebookData(updated)
    updateNotebook(updated)
  }

  function redo() {
    if (redoStack.length === 0) return

    const redoneStroke = redoStack[redoStack.length - 1]
    const newStrokes = [...strokes, redoneStroke]
    const newRedoStack = redoStack.slice(0, -1)

    setStrokes(newStrokes)
    setRedoStack(newRedoStack)

    // Update page
    const updatedPages = [...notebookData.pages]
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      strokes: newStrokes,
    }

    const updated = { ...notebookData, pages: updatedPages }
    setNotebookData(updated)
    updateNotebook(updated)
  }

  function nextLine() {
    setCurrentLineY((prev) => prev + 35)
  }

  // Load page strokes when page changes
  useEffect(() => {
    if (currentPage) {
      setStrokes(currentPage.strokes || [])
      setRedoStack([])
      setCurrentLineY(30) // Reset line position when changing pages
    }
  }, [currentPageIndex, currentPage])

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()

    ctx.clearRect(0, 0, rect.width, rect.height)

    const all = [...strokes]

    if (points.length) {
      all.push({
        points,
        size: toolSizes[tool],
        color,
        tool,
      })
    }

    all.forEach((stroke) => {
      const outline = getStroke(stroke.points, {
        size: stroke.size,
        thinning: 0.6,
        smoothing: 0.7,
        streamline: 0.4,
      })

      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = stroke.color
      ctx.globalAlpha = 1

      ctx.beginPath()

      outline.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })

      ctx.closePath()
      ctx.fill()
    })
  }, [points, strokes, tool, color])

  // Render text content with edit capability
  function renderText() {
    if (!currentPage.textContent) return null

    return currentPage.textContent.map((textBlock) => (
      <div
        key={textBlock.id}
        className={styles.textBlock}
        style={{
          left: `${textBlock.x}px`,
          top: `${textBlock.y}px`,
          color: textBlock.color || "#2563eb",
        }}
      >
        {editingTextId === textBlock.id ? (
          <input
            ref={editInputRef}
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onBlur={() => {
              // Save the edited text
              setNotebookData((prevData) => {
                const updatedPages = [...prevData.pages]
                const textContent = updatedPages[currentPageIndex].textContent.map((tb) =>
                  tb.id === textBlock.id ? { ...tb, text: editingText } : tb
                )
                updatedPages[currentPageIndex] = {
                  ...updatedPages[currentPageIndex],
                  textContent,
                }
                const updated = { ...prevData, pages: updatedPages }
                updateNotebook(updated)
                return updated
              })
              setEditingTextId(null)
              setEditingText("")
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur()
              }
            }}
            className={styles.textInput}
            style={{ 
              borderColor: textBlock.color || "#2563eb", 
              color: textBlock.color || "#2563eb",
              width: Math.max(200, editingText.length * 8 + 20) + "px"
            }}
          />
        ) : (
          <span
            onClick={() => {
              setEditingTextId(textBlock.id)
              setEditingText(textBlock.text)
            }}
            style={{ cursor: "pointer", color: textBlock.color || "#2563eb" }}
            title="Click to edit"
          >
            {textBlock.text}
          </span>
        )}
      </div>
    ))
  }

  function getPageBackgroundLayers() {
    const pageType = notebookData.type || "blank"
    const patterns = {
      blank: "none",
      lined: `repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 28px,
        #ddd 28px,
        #ddd 29px
      ), linear-gradient(
        to right,
        #ffcccc 0,
        #ffcccc 60px,
        transparent 60px,
        transparent 100%
      )`,
      grid: `linear-gradient(#e0e0e0 1px, transparent 1px),
      linear-gradient(to right, #e0e0e0 1px, transparent 1px)`,
    }

    return {
      backgroundImage: patterns[pageType],
      backgroundSize: pageType === "grid" ? "30px 30px" : "auto",
      backgroundColor: pageType === "blank" ? "#ffffff" : "#fafaf8",
    }
  }

  function goToNextPage() {
    if (currentPageIndex < notebookData.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
    } else {
      // Create new page
      const newPage = {
        id: uuidv4(),
        strokes: [],
        textContent: [],
      }

      const updatedPages = [...notebookData.pages, newPage]
      const updated = { ...notebookData, pages: updatedPages }

      setNotebookData(updated)
      updateNotebook(updated)
      setCurrentPageIndex(currentPageIndex + 1)
    }
  }

  function goToPreviousPage() {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  return (
    <div className={styles.editor}>
      <div className={styles.editorHeader}>
        <button onClick={goBack}>← Back</button>
        <h3>{notebookData.title}</h3>
        <span></span>
      </div>

      <div className={styles.canvasWrapper}>
        <div 
          className={styles.pageContainer} 
          ref={containerRef}
          style={getPageBackgroundLayers()}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              touchAction: "none",
              display: "block",
              position: "relative",
              zIndex: 10,
            }}
          />

          <div className={styles.textLayer}>{renderText()}</div>

          <div className={styles.pageNumber}>
            Page {currentPageIndex + 1}
          </div>

          <div className={styles.paginationContainer}>
            <button
              className={styles.pageNavButton}
              onClick={goToPreviousPage}
              disabled={currentPageIndex === 0}
            >
              ← Prev
            </button>
            <div className={styles.pageInfo}>
              {currentPageIndex + 1} / {notebookData.pages.length}
            </div>
            <button
              className={styles.pageNavButton}
              onClick={goToNextPage}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <BottomToolbar
        setColor={setColor}
        undo={undo}
        redo={redo}
        nextLine={nextLine}
        canUndo={strokes.length > 0}
        canRedo={redoStack.length > 0}
      />

      {isRecognizing && (
        <div className={styles.conversionProgressBar}>
          <div className={styles.progressBar}></div>
          <span className={styles.recognizingTextPreview}>{recognizingText}</span>
        </div>
      )}
    </div>
  )
}