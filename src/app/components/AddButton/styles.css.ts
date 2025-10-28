import { style } from '@vanilla-extract/css'

export const addButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  fontSize: '0.9rem',
  fontWeight: '600',
  fontFamily: '"Funnel Sans", sans-serif',
  color: '#F5FAFA',
  background: 'rgba(145, 195, 235, 0.2)',
  border: '1px solid rgba(145, 195, 235, 0.4)',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginBottom: '16px',
  selectors: {
    '&:hover': {
      background: 'rgba(145, 195, 235, 0.3)',
      borderColor: '#91C3EB',
      transform: 'translateY(-1px)',
    },
  },
})
