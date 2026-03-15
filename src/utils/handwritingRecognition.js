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
 * Pre-process image for better OCR accuracy using multiple techniques
 * @param {Canvas} canvas - Canvas to process
 * @returns {Canvas} Processed canvas
 */
function preprocessCanvasForOCR(canvas) {
  const processedCanvas = document.createElement("canvas")
  processedCanvas.width = canvas.width
  processedCanvas.height = canvas.height

  const ctx = processedCanvas.getContext("2d")
  
  // Copy the image from input canvas
  ctx.drawImage(canvas, 0, 0)
  
  // Get image data
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let data = imageData.data

  // Step 1: Convert to grayscale
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const gray = r * 0.299 + g * 0.587 + b * 0.114
    data[i] = gray
    data[i + 1] = gray
    data[i + 2] = gray
  }

  // Step 2: Apply Gaussian blur to reduce noise
  imageData = applyGaussianBlur(ctx, imageData, 2)
  data = imageData.data

  // Step 3: Apply contrast stretching + aggressive threshold
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i]
    
    // More aggressive contrast - push values to extremes
    let contrast = 0
    if (gray < 100) {
      contrast = 0  // Very dark = black
    } else if (gray > 150) {
      contrast = 255 // Light = white (background)
    } else {
      // For mid-tones, use aggressive stretching
      contrast = (gray - 100) * 4 // Stretch the range
      contrast = Math.max(0, Math.min(255, contrast))
      contrast = contrast > 128 ? 255 : 0
    }

    data[i] = contrast
    data[i + 1] = contrast
    data[i + 2] = contrast
  }

  ctx.putImageData(imageData, 0, 0)
  return processedCanvas
}

/**
 * Apply simple Gaussian blur to image data
 */
function applyGaussianBlur(ctx, imageData, radius) {
  const width = imageData.width
  const height = imageData.height
  const data = imageData.data

  const kernel = createGaussianKernel(radius)
  const newData = new Uint8ClampedArray(data)

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let r = 0, g = 0, b = 0, a = 0, count = 0

      for (let ki = -radius; ki <= radius; ki++) {
        for (let kj = -radius; kj <= radius; kj++) {
          const ni = i + ki
          const nj = j + kj

          if (ni >= 0 && ni < height && nj >= 0 && nj < width) {
            const idx = (ni * width + nj) * 4
            const weight = kernel[ki + radius][kj + radius]
            
            r += data[idx] * weight
            g += data[idx + 1] * weight
            b += data[idx + 2] * weight
            a += data[idx + 3] * weight
            count += weight
          }
        }
      }

      const idx = (i * width + j) * 4
      if (count > 0) {
        newData[idx] = r / count
        newData[idx + 1] = g / count
        newData[idx + 2] = b / count
        newData[idx + 3] = a / count
      }
    }
  }

  return new ImageData(newData, width, height)
}

/**
 * Create Gaussian kernel for blur
 */
function createGaussianKernel(radius) {
  const kernel = []
  const sigma = radius / 2
  let sum = 0

  for (let i = -radius; i <= radius; i++) {
    kernel[i + radius] = []
    for (let j = -radius; j <= radius; j++) {
      const value = Math.exp(-(i * i + j * j) / (2 * sigma * sigma))
      kernel[i + radius][j + radius] = value
      sum += value
    }
  }

  // Normalize
  for (let i = 0; i < kernel.length; i++) {
    for (let j = 0; j < kernel[i].length; j++) {
      kernel[i][j] /= sum
    }
  }

  return kernel
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

    // Draw all strokes with thicker lines for better OCR
    strokes.forEach((stroke) => {
      const outline = getStroke(stroke.points, {
        size: stroke.size * 1.5, // Make strokes 50% thicker for OCR
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

    // Apply line width stroke for extra boldness
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#000000"
    
    strokes.forEach((stroke) => {
      const points = stroke.points
      if (points.length < 2) return
      
      ctx.beginPath()
      ctx.moveTo(points[0][0], points[0][1])
      
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1])
      }
      
      ctx.stroke()
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
