import { style, keyframes } from '@vanilla-extract/css'

// Animation douce du background qui bouge légèrement
const backgroundMove = keyframes({
  '0%': { transform: 'translate(0, 0) scale(1.1)' },
  '33%': { transform: 'translate(-2%, 2%) scale(1.12)' },
  '66%': { transform: 'translate(2%, -2%) scale(1.11)' },
  '100%': { transform: 'translate(0, 0) scale(1.1)' },
})

// Animation ultra smooth du gradient utilisant background-position
// Haut-gauche: #2C26A7 (violet), Droite: #C9DA71 (jaune), Bas-gauche: #968FF0 (lavande), Bas: #302A65 (violet foncé)
const gradientShift = keyframes({
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

export const bodyWrapper = style({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  background: 'linear-gradient(-45deg, #2C26A7, #C9DA71, #968FF0, #302A65)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
})

export const backgroundImage = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.15,
  zIndex: 0,
  animation: `${backgroundMove} 30s ease-in-out infinite`,
  pointerEvents: 'none',
})

export const contentLayer = style({
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh',
})
