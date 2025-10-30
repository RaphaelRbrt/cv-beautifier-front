import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../../styles/tokens.css'

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: vars.transform.translateY.drop },
  '100%': { opacity: vars.opacity.full, transform: vars.transform.translateY.reset },
})

export const header = style({
  display: 'flex',
  minWidth: '100vw',
  position: 'fixed',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `18px 22px 18px 22px`,
  maxWidth: '100%',
  margin: '0 auto',
  animation: `${fadeIn} 0.6s ${vars.transition.easing.out}`,
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
  padding: `0`,
  backgroundColor: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '1.2rem',
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
