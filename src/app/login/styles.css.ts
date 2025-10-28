import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  width: '100%',
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '6fr 5fr',
      columnGap: '2rem',
    },
  },
})

export const leftPanel = style({
  display: 'none',
  overflow: 'hidden',
  padding: '1rem',
  background: 'linear-gradient(135deg, #0f172a, #1e293b 60%, #0f172a)',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
    },
  },
})

export const loginContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%',
})

// Alias for backward compatibility
export const rightPanel = loginContainer

export const formCard = style({
  width: '100%',
  maxWidth: '630px',
  minHeight: '278px',
  backgroundColor: 'rgba(245, 250, 250, 0.2)',
  border: '1px solid #F5FAFA',
  borderRadius: '20px',
  padding: '20px',
  backdropFilter: 'blur(12px)',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
      minHeight: 'auto',
      padding: '16px',
    },
    'screen and (min-width: 769px) and (max-width: 1024px)': {
      maxWidth: '80vw',
    },
  },
})

export const title = style({
  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
  fontWeight: 700,
  color: '#F5FAFA',
  marginBottom: vars.space.md,
  textAlign: 'center',
  fontFamily: '"Funnel Display", sans-serif',
})

export const form = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
})

export const error = style({
  color: '#fca5a5',
  fontSize: '0.875rem',
  marginTop: '8px',
  textAlign: 'center',
})

export const passwordWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const forgotPasswordLink = style({
  alignSelf: 'flex-start',
  color: '#F5FAFA',
  fontSize: '0.85rem',
  fontFamily: '"Funnel Sans", sans-serif',
  textDecoration: 'underline',
  textDecorationColor: '#F5FAFA',
  selectors: {
    '&:hover': {
      color: '#F5FAFA',
    },
  },
})

export const buttonGroup = style({
  display: 'flex',
  gap: '17px',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
})
