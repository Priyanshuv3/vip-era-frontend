import Tesseract from "tesseract.js"
import { getStroke } from "perfect-freehand"

/**
 * Converts canvas strokes to image and performs OCR
 * @param {Canvas} canvas - Canvas element with strokes
 * @param {Array} strokes - Array of stroke objects
 * @returns {Promise<string>} Recognized text
 */
export async function recognizeHandwriting(canvas) {
  try {
    // Get canvas image data
    const imageData = canvas.toDataURL("image/png")

    // Initialize Tesseract worker
    const worker = await Tesseract.createWorker()

    // Recognize text from canvas
    const result = await worker.recognize(imageData, "eng")
    const recognizedText = result.data.text.trim()

    // Terminate worker to free resources
    await worker.terminate()

    return recognizedText
  } catch (error) {
    console.error("Handwriting recognition failed:", error)
    return ""
  }
}

/**
 * Pre-process image for better OCR accuracy
 * Increases contrast, converts to black and white
 * @param {Canvas} canvas - Canvas to process
 * @returns {Canvas} Processed canvas
 */
function preprocessCanvasForOCR(canvas) {
  const processedCanvas = document.createElement("canvas")
  processedCanvas.width = canvas.width
  processedCanvas.height = canvas.height

  const ctx = processedCanvas.getContext("2d")
  
  // Copy the image from input canvas first
  ctx.drawImage(canvas, 0, 0)
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Convert to grayscale and increase contrast
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    // Skip fully transparent pixels
    if (a === 0) continue

    // Convert to grayscale
    const gray = r * 0.299 + g * 0.587 + b * 0.114

    // Aggressive contrast boost for better OCR
    let contrast = (gray - 128) * 3 + 128
    contrast = Math.max(0, Math.min(255, contrast))

    // Lower threshold for better text detection (150 instead of 180)
    const threshold = contrast > 150 ? 255 : 0

    data[i] = threshold     // R
    data[i + 1] = threshold // G
    data[i + 2] = threshold // B
    data[i + 3] = 255       // A
  }

  ctx.putImageData(imageData, 0, 0)
  return processedCanvas
}

/**
 * Extract visible text from canvas (strokes area)
 * Creates a temporary canvas with only the drawn content
 * @param {Array} strokes - Array of stroke objects
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @returns {Promise<string>} Recognized text from strokes
 */
export async function extractTextFromStrokes(strokes, width, height) {
  try {
    // Validate inputs
    if (!strokes || strokes.length === 0) {
      return ""
    }

    // Check if strokes have enough points (at least 10 total to be meaningful)
    const totalPoints = strokes.reduce((sum, stroke) => sum + (stroke.points?.length || 0), 0)
    
    if (totalPoints < 10) {
      return ""
    }

    // Validate dimensions
    if (!width || !height || width < 50 || height < 50) {
      return ""
    }

    // Create temporary canvas with strokes
    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = width
    tempCanvas.height = height

    const ctx = tempCanvas.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    // Draw all strokes with darker color for better OCR
    strokes.forEach((stroke) => {
      const outline = getStroke(stroke.points, {
        size: stroke.size,
        thinning: 0.6,
        smoothing: 0.7,
        streamline: 0.4,
      })

      // Use black for strokes to ensure good contrast
      ctx.fillStyle = "#000000"
      ctx.beginPath()

      outline.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })

      ctx.closePath()
      ctx.fill()
    })
    
    // Pre-process canvas for better OCR
    const processedCanvas = preprocessCanvasForOCR(tempCanvas)
    const processedImageData = processedCanvas.toDataURL("image/png")

    // Perform OCR on processed image
    const worker = await Tesseract.createWorker()
    const result = await worker.recognize(processedImageData, "eng")
    const text = result.data.text.trim()
    
    await worker.terminate()

    return text
  } catch (error) {
    console.error("Handwriting recognition error:", error)
    return ""
  }
}

/**
 * Performs recognition and returns confidence score
 * @param {Canvas} canvas - Canvas with strokes
 * @returns {Promise<Object>} { text, confidence }
 */
export async function recognizeWithConfidence(canvas) {
  try {
    const worker = await Tesseract.createWorker()
    const imageData = canvas.toDataURL("image/png")

    const result = await worker.recognize(imageData, "eng")

    const text = result.data.text.trim()
    const confidence =
      result.data.confidence !== undefined ? result.data.confidence : 0

    await worker.terminate()

    return { text, confidence }
  } catch (error) {
    console.error("Recognition failed:", error)
    return { text: "", confidence: 0 }
  }
}
