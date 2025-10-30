import { style, keyframes } from '@vanilla-extract/css'

// Gradient animé global derrière tout
const gradientShift = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
})

export const bodyWrapper = style({
  position: 'relative',
  minHeight: '100dvh',

  background: 'linear-gradient(-45deg, #2C26A7, #C9DA71, #968FF0, #302A65)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
})

export const contentLayer = style({
  position: 'relative',
  zIndex: 1,
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
})
