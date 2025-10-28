import { style, keyframes } from '@vanilla-extract/css'

export const stepsContainer = style({
  display: 'grid',
  gap: 16,
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
})

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(6px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const stepArea = style({
  position: 'relative',
  minHeight: 200,
})

export const stepInner = style({
  animation: `${fadeIn} 200ms ease`,
})
