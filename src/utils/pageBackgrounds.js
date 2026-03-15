/**
 * Page background generators for different notebook types
 */

export function getPageBackgroundStyle(pageType) {
  const baseStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  }

  switch (pageType) {
    case 'lined':
      return {
        ...baseStyle,
        backgroundImage: `
          repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 28px,
            #ddd 28px,
            #ddd 29px
          ),
          linear-gradient(
            to right,
            #ffcccc 0,
            #ffcccc 60px,
            transparent 60px,
            transparent 100%
          )
        `,
        backgroundColor: '#fafaf8',
      }

    case 'grid':
      return {
        ...baseStyle,
        backgroundImage: `
          linear-gradient(#e0e0e0 1px, transparent 1px),
          linear-gradient(to right, #e0e0e0 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        backgroundColor: '#fafaf8',
      }

    case 'blank':
    default:
      return {
        ...baseStyle,
        backgroundColor: '#ffffff',
      }
  }
}

export function getCanvasBackgroundImage(pageType) {
  switch (pageType) {
    case 'lined': {
      const canvas = document.createElement('canvas')
      canvas.width = 400
      canvas.height = 400
      const ctx = canvas.getContext('2d')

      // Draw lines
      ctx.strokeStyle = '#ddd'
      ctx.lineWidth = 1
      for (let i = 0; i < 400; i += 29) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(400, i)
        ctx.stroke()
      }

      // Draw margin line
      ctx.strokeStyle = '#ffcccc'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(60, 0)
      ctx.lineTo(60, 400)
      ctx.stroke()

      return canvas.toDataURL()
    }

    case 'grid': {
      const canvas = document.createElement('canvas')
      canvas.width = 300
      canvas.height = 300
      const ctx = canvas.getContext('2d')

      ctx.strokeStyle = '#e0e0e0'
      ctx.lineWidth = 0.5

      for (let i = 0; i < 300; i += 30) {
        // Horizontal
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(300, i)
        ctx.stroke()

        // Vertical
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 300)
        ctx.stroke()
      }

      return canvas.toDataURL()
    }

    default:
      return null
  }
}
