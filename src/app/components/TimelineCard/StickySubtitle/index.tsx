'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as s from './styles.css'

export interface StickySubtitleProps {
  children: React.ReactNode
  className?: string
}

export default function StickySubtitle({ children, className }: StickySubtitleProps) {
  const [isStuck, setIsStuck] = useState(false)
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element intersects at the top boundary, it's stuck
        setIsStuck(entry.intersectionRatio < 1)
      },
      {
        threshold: [1],
        rootMargin: '-1px 0px 0px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  const combinedClassName = `${s.subtitle} ${isStuck ? s.stuck : ''} ${className || ''}`

  return (
    <h2 ref={ref} className={combinedClassName}>
      {children}
    </h2>
  )
}
