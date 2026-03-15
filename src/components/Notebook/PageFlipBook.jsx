"use client"

import { useRef, useEffect } from "react"
import HTMLFlipBook from "react-pageflip"
import styles from "./notebook.module.css"

/**
 * Extended Canvas component that renders notebook pages with flip animation
 * This is optional - can be used instead of simple page buttons
 */
export default function PageFlipBook({ 
  pages, 
  currentPageIndex, 
  onPageChange,
  renderPageContent 
}) {
  const flipBook = useRef()

  useEffect(() => {
    if (flipBook.current && currentPageIndex < pages.length) {
      flipBook.current.pageFlip().turnToPage(currentPageIndex)
    }
  }, [currentPageIndex, pages.length])

  return (
    <HTMLFlipBook
      ref={flipBook}
      width={300}
      height={400}
      size="stretch"
      minWidth={285}
      maxWidth={1000}
      minHeight={400}
      maxHeight={1533}
      maxShadowOpacity={0.5}
      showCover={false}
      onChangePage={(event) => {
        onPageChange(event.data)
      }}
    >
      {pages.map((page, index) => (
        <div key={page.id} className={styles.flipBookPage}>
          {renderPageContent(page, index)}
        </div>
      ))}
    </HTMLFlipBook>
  )
}
