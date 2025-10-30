import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const ctaButton = style({
  height: '50px',
  padding: '0 16px',
  backgroundColor: '#91C3EB',
  border: 'none',
  borderRadius: vars.radius.xl,
  color: '#F5FAFA',
  fontSize: '1.2rem',
  fontWeight: '700',
  cursor: 'pointer',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  fontFamily: '"Funnel Display", sans-serif',
  textAlign: 'center',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  selectors: {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 32px rgba(145, 195, 235, 0.4)',
      backgroundColor: '#7AB5E0',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
})

export const ctaButtonSecondary = style({
  padding: '12px 32px',
  backgroundColor: 'transparent',
  border: '2px solid #91C3EB',
  borderRadius: vars.radius.pill,
  color: '#91C3EB',
  fontSize: '0.95rem',
  fontWeight: '700',
  cursor: 'pointer',
  fontFamily: '"Funnel Display", sans-serif',
  textAlign: 'center',
  display: 'inline-block',
  selectors: {
    '&:hover': {
      backgroundColor: '#91C3EB',
      color: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(145, 195, 235, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
})
