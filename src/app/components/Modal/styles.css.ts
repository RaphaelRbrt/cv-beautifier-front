import { style } from '@vanilla-extract/css'

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: 0,
  margin: 0,
})

// Form Modal - Fullscreen
export const modalForm = style({
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(41, 36, 83, 0.98)',
  border: '1px solid rgba(245, 250, 250, 0.2)',
  borderRadius: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'auto',
  boxShadow: 'none',
})

// Confirm/Delete Modal - Centered
export const modalConfirm = style({
  backgroundColor: 'rgba(41, 36, 83, 0.98)',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '500px',
  padding: '32px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid rgba(245, 250, 250, 0.1)',
  position: 'sticky',
  top: 0,
  backgroundColor: 'rgba(41, 36, 83, 0.98)',
  backdropFilter: 'blur(8px)',
  zIndex: 1,
})

export const confirmHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '32px',
})

export const iconContainer = style({
  marginBottom: '16px',
})

export const title = style({
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: '700',
  fontFamily: '"Funnel Display", sans-serif',
  color: '#F5FAFA',
})

export const message = style({
  margin: '12px 0 0 0',
  fontSize: '0.95rem',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.8)',
  lineHeight: '1.5',
})

export const closeButton = style({
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  border: '1px solid rgba(245, 250, 250, 0.2)',
  background: 'transparent',
  color: '#F5FAFA',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      background: 'rgba(239, 68, 68, 0.2)',
      borderColor: '#ef4444',
    },
  },
})

export const form = style({
  padding: '40px',
  maxWidth: '800px',
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '24px',
    },
  },
})

export const fieldsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '24px',
})

export const fieldGroup = style({
  display: 'flex',
  flexDirection: 'column',
})

export const label = style({
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '500',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.9)',
  marginBottom: '6px',
})

export const textarea = style({
  width: '100%',
  padding: '12px',
  border: '1px solid rgba(245, 250, 250, 0.2)',
  borderRadius: '12px',
  fontFamily: '"Funnel Sans", sans-serif',
  fontSize: '0.9rem',
  background: 'rgba(245, 250, 250, 0.05)',
  color: '#F5FAFA',
  resize: 'vertical',
  transition: 'all 0.2s ease',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: '#91C3EB',
      background: 'rgba(245, 250, 250, 0.08)',
      boxShadow: '0 0 0 3px rgba(145, 195, 235, 0.1)',
    },
    '&::placeholder': {
      color: 'rgba(245, 250, 250, 0.4)',
    },
  },
})

export const actions = style({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
})

export const primaryButton = style({
  padding: '12px 32px',
  fontSize: '0.95rem',
  fontWeight: '600',
  fontFamily: '"Funnel Sans", sans-serif',
  color: '#F5FAFA',
  background: 'rgba(145, 195, 235, 0.3)',
  border: '1px solid rgba(145, 195, 235, 0.5)',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      background: 'rgba(145, 195, 235, 0.4)',
      borderColor: '#91C3EB',
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const secondaryButton = style({
  padding: '12px 32px',
  fontSize: '0.95rem',
  fontWeight: '600',
  fontFamily: '"Funnel Sans", sans-serif',
  color: '#F5FAFA',
  background: 'transparent',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      background: 'rgba(245, 250, 250, 0.05)',
      borderColor: 'rgba(245, 250, 250, 0.5)',
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})

export const deleteButton = style({
  padding: '12px 32px',
  fontSize: '0.95rem',
  fontWeight: '600',
  fontFamily: '"Funnel Sans", sans-serif',
  color: '#fff',
  background: 'rgba(239, 68, 68, 0.8)',
  border: '1px solid #ef4444',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      background: '#ef4444',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})
