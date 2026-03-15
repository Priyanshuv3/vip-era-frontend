/**
 * Stroke processing utilities for handwriting recognition
 */

export function getStrokeBoundingBox(points) {
  if (!points || points.length === 0) return null

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  points.forEach(([x, y]) => {
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  })

  return {
    top: minY,
    left: minX,
    bottom: maxY,
    right: maxX,
    width: maxX - minX,
    height: maxY - minY,
  }
}

export function getBeginningOfNextLine(currentY, lineHeight = 30) {
  return Math.ceil((currentY + 20) / lineHeight) * lineHeight
}

export function shouldCreateNewPage(currentY, pageHeight = 800) {
  return currentY > pageHeight - 100
}

export function calculateTextPosition(textBlocks) {
  if (textBlocks.length === 0) {
    return { x: 20, y: 30, lineNumber: 0 }
  }

  // Keep text on the same line until user manually changes it
  // Find the current Y position from existing text on same line
  const lastBlock = textBlocks[textBlocks.length - 1]
  
  // Stack text blocks on same line with spacing
  return { x: lastBlock.x + 300, y: lastBlock.y, lineNumber: lastBlock.lineNumber }
}
