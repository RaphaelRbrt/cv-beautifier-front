import { style } from '@vanilla-extract/css'

const baseLinkStyle = {
  color: '#F5FAFA',
  textDecoration: 'none',
  position: 'relative' as const,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
  minWidth: '140px',
  height: '28px',
}

const baseHoverEffect = {
  '&::before': {
    content: '""',
    backgroundColor: 'rgba(145, 195, 235, 0.75)',
    position: 'absolute' as const,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    borderRadius: '30px',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover': {
    color: '#F5FAFA',
  },
  '&:hover::before': {
    opacity: 1,
  },
}

export const link = style({
  ...baseLinkStyle,
  fontSize: '0.85rem',
  fontFamily: '"Funnel Sans", sans-serif',
  fontWeight: 700,
  selectors: baseHoverEffect,
})

export const linkBold = style({
  ...baseLinkStyle,
  fontSize: '0.95rem',
  fontFamily: '"Funnel Display", sans-serif',
  fontWeight: 700,
  selectors: baseHoverEffect,
})
