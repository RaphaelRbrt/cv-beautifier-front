import { style, keyframes } from '@vanilla-extract/css'

/**
 * Smooth gradient animation - Layer 1
 * Creates slow, subtle color transitions
 */
const gradientShift1 = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
})

/**
 * Smooth gradient animation - Layer 2
 * Slightly faster with different timing
 */
const gradientShift2 = keyframes({
  '0%': {
    backgroundPosition: '50% 0%',
  },
  '50%': {
    backgroundPosition: '50% 100%',
  },
  '100%': {
    backgroundPosition: '50% 0%',
  },
})

/**
 * Smooth gradient animation - Layer 3
 * Diagonal movement for depth
 */
const gradientShift3 = keyframes({
  '0%': {
    backgroundPosition: '0% 0%',
  },
  '33%': {
    backgroundPosition: '100% 50%',
  },
  '66%': {
    backgroundPosition: '50% 100%',
  },
  '100%': {
    backgroundPosition: '0% 0%',
  },
})

/**
 * Main container - uses fixed positioning to stay in viewport during scroll
 */
export const backgroundContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  pointerEvents: 'none',
  overflow: 'hidden',
  width: 'var(--vvw, 100vw)',
  height: 'var(--vvh, 100vh)',
  willChange: 'transform',
  backgroundColor: '#1a1535',
})

/**
 * Gradient Layer 1 - Base subtle gradient
 * Slow, calming animation
 */
export const gradientLayer1 = style({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(135deg, rgba(41, 36, 83, 0.8) 0%, rgba(145, 195, 235, 0.15) 50%, rgba(41, 36, 83, 0.8) 100%)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift1} 25s ease infinite`,
  opacity: 0.6,
  willChange: 'background-position',
})

/**
 * Gradient Layer 2 - Secondary accent layer
 * Medium speed, adds depth
 */
export const gradientLayer2 = style({
  position: 'absolute',
  inset: 0,
  background:
    'radial-gradient(circle at center, rgba(145, 195, 235, 0.12) 0%, transparent 40%, rgba(41, 36, 83, 0.6) 100%)',
  backgroundSize: '300% 300%',
  animation: `${gradientShift2} 20s ease-in-out infinite`,
  opacity: 0.5,
  willChange: 'background-position',
})

/**
 * Gradient Layer 3 - Accent highlights
 * Faster animation for subtle movement
 */
export const gradientLayer3 = style({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(45deg, transparent 0%, rgba(145, 195, 235, 0.08) 25%, transparent 50%, rgba(145, 195, 235, 0.08) 75%, transparent 100%)',
  backgroundSize: '500% 500%',
  animation: `${gradientShift3} 30s ease infinite`,
  opacity: 0.4,
  willChange: 'background-position',
})

/**
 * Gradient overlay for better depth and contrast
 * Static overlay to maintain text readability
 */
export const backgroundOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
  zIndex: 1,
  pointerEvents: 'none',
})
