import { style } from '@vanilla-extract/css'

export const container = style({
  position: 'fixed',
  top: '20px',
  right: '20px',
  maxWidth: '400px',
  zIndex: 50,
  display: 'grid',
  rowGap: '12px',
})

export const errorCard = style({
  backgroundColor: 'rgba(245, 250, 250, 0.2)',
  border: '1px solid #F5FAFA',
  borderRadius: '20px',
  backdropFilter: 'blur(12px)',
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  padding: '16px 20px',
  alignItems: 'center',
  minHeight: '80px',
})

export const errorMessage = style({
  whiteSpace: 'pre-wrap',
  color: '#F5FAFA',
  fontSize: '0.85rem',
  fontFamily: '"Funnel Sans", sans-serif',
  lineHeight: '1.4',
  flex: 1,
  textAlign: 'left',
})

export const closeButton = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#F5FAFA',
  padding: '0',
  lineHeight: 1,
  flexShrink: 0,
  transition: 'opacity 0.2s ease',
  selectors: {
    '&:hover': {
      opacity: 0.7,
    },
  },
})

export const clearButtonWrapper = style({
  justifySelf: 'start',
})
