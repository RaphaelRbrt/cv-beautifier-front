import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../styles/tokens.css'

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: vars.transform.translateY.drop },
  '100%': { opacity: vars.opacity.full, transform: vars.transform.translateY.reset },
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.space.xl} ${vars.space['3xl']}`,
  maxWidth: '1400px',
  margin: '0 auto',
  animation: `${fadeIn} 0.6s ${vars.transition.easing.out}`,
  position: 'relative',
  zIndex: vars.zIndex.sticky,
})

export const logo = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.lg,
})

export const logoImage = style({
  width: '140px',
  height: 'auto',
})

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xl,
})

export const burgerMenu = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  cursor: 'pointer',
  padding: vars.space.md,
  background: 'transparent',
  border: 'none',
  transition: vars.transition.all.normal,
  selectors: {
    '&:hover': {
      opacity: vars.opacity.primary,
    },
  },
})

export const burgerLine = style({
  width: vars.size.icon.lg,
  height: '2px',
  backgroundColor: '#fff',
  borderRadius: vars.radius.xs,
  transition: vars.transition.all.normal,
})

export const connexionButton = style({
  padding: `${vars.space.md} ${vars.space['2xl']}`,
  backgroundColor: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
  fontWeight: vars.font.weight.medium,
  cursor: 'pointer',
  fontFamily: vars.font.family.display,
  transition: vars.transition.all.normal,
  selectors: {
    '&:hover': {
      opacity: 0.8,
    },
  },
})
