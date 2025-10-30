'use client'

import { memo, useEffect, useCallback } from 'react'
import * as styles from './styles.css'

/**
 * Custom hook to synchronize viewport dimensions with CSS custom properties
 * Optimized with RAF batching to prevent layout thrashing
 */
const useViewportDimensions = (): void => {
  const updateDimensions = useCallback(() => {
    const visualViewport = window.visualViewport
    const width = Math.round(visualViewport?.width ?? window.innerWidth)
    const height = Math.round(visualViewport?.height ?? window.innerHeight)

    document.documentElement.style.setProperty('--vvw', `${width}px`)
    document.documentElement.style.setProperty('--vvh', `${height}px`)
  }, [])

  useEffect(() => {
    let rafId = 0

    const scheduleUpdate = (): void => {
      if (rafId !== 0) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        updateDimensions()
      })
    }

    // Initial update
    scheduleUpdate()

    const visualViewport = window.visualViewport

    // Attach event listeners
    visualViewport?.addEventListener('resize', scheduleUpdate)
    visualViewport?.addEventListener('scroll', scheduleUpdate)
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('orientationchange', scheduleUpdate)

    // Cleanup function
    return (): void => {
      if (rafId !== 0) cancelAnimationFrame(rafId)
      visualViewport?.removeEventListener('resize', scheduleUpdate)
      visualViewport?.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('orientationchange', scheduleUpdate)
    }
  }, [updateDimensions])
}

/**
 * Background component with smooth gradient animation
 * Uses fixed positioning to stay in viewport during scroll
 * Memoized to prevent unnecessary re-renders
 */
const BackgroundComponent = () => {
  useViewportDimensions()

  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      <div className={styles.gradientLayer1} />
      <div className={styles.gradientLayer2} />
      <div className={styles.gradientLayer3} />
      <div className={styles.backgroundOverlay} />
    </div>
  )
}

export const Background = memo(BackgroundComponent)
Background.displayName = 'Background'
