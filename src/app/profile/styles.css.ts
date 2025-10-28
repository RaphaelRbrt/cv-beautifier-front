// src/app/profile/profile.css.ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const pageContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  width: '100%',
  padding: '40px 20px',
  boxSizing: 'border-box',
})

export const container = style({
  width: '100%',
  maxWidth: '1070px',
  maxHeight: '874px',
  overflowY: 'auto',
  backgroundColor: 'rgba(245, 250, 250, 0.2)',
  border: '1px solid #F5FAFA',
  borderRadius: '20px',
  padding: '32px',
  paddingBottom: '60px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  display: 'grid',
  rowGap: '20px',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
      maxHeight: 'none',
      padding: '20px',
      paddingBottom: '40px',
    },
  },
})

export const title = style({
  margin: 0,
  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
  fontWeight: 800,
  fontFamily: '"Funnel Display", sans-serif',
  color: '#F5FAFA',
})

export const alert = style({
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '4px',
  border: '1px solid',
})

export const errorAlert = style([
  alert,
  {
    backgroundColor: '#fee',
    borderColor: '#fcc',
    color: '#c00',
  },
])

export const successAlert = style([
  alert,
  {
    background: vars.color.background.light.base,
    border: `1px solid ${vars.color.border.light}`,
    color: vars.color.text.primary,
    boxShadow: vars.shadow.sm,
    backdropFilter: `blur(${vars.blur.md})`,
    WebkitBackdropFilter: `blur(${vars.blur.md})`,
    borderRadius: vars.radius.lg,
  },
])

export const formGroup = style({
  marginBottom: vars.space.lg,
})

export const label = style({
  display: 'block',
  marginBottom: vars.space.sm,
  fontWeight: 600,
  fontSize: '0.85rem',
  fontFamily: '"Funnel Sans", sans-serif',
  color: '#F5FAFA',
})

export const input = style({
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  ':focus': {
    outline: 'none',
    borderColor: '#007bff',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
  },
  ':disabled': {
    backgroundColor: '#f5f5f5',
    cursor: 'not-allowed',
  },
})

export const textarea = style({
  width: '100%',
  padding: '10px 12px',
  minHeight: '120px',
  resize: 'vertical',
  borderRadius: '15px',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  background: '#F5FAFA',
  color: '#292453',
  fontFamily: '"Funnel Sans", sans-serif',
  fontSize: '0.9rem',
  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box',
  selectors: {
    '&::placeholder': {
      color: '#292453',
      opacity: 0.6,
    },
    '&:focus': {
      borderColor: '#292453',
      boxShadow: '0 0 0 3px rgba(41, 36, 83, 0.2)',
    },
  },
})

export const photoPreview = style({
  marginBottom: '0.5rem',
})

export const photoImage = style({
  maxWidth: '160px',
  maxHeight: '160px',
  objectFit: 'cover',
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border.light}`,
  boxShadow: vars.shadow.sm,
})

export const fileInput = style({
  fontSize: '0.95rem',
})

export const button = style({
  padding: '0.75rem 2rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'all 0.2s',
  ':hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
})

export const primaryButton = style([
  button,
  {
    backgroundColor: '#007bff',
    color: 'white',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  },
])

export const disabledButton = style([
  button,
  {
    backgroundColor: '#ccc',
    color: '#666',
    cursor: 'not-allowed',
    ':hover': {
      transform: 'none',
      boxShadow: 'none',
      backgroundColor: '#ccc',
    },
  },
])

// Added for lists/sections in profile page
export const subtitle = style({
  position: 'sticky',
  top: '0',
  marginTop: '2rem',
  marginBottom: '0.75rem',
  paddingTop: '12px',
  paddingBottom: '12px',
  fontSize: '1rem',
  fontWeight: '700',
  fontFamily: '"Funnel Display", sans-serif',
  color: '#F5FAFA',
  backgroundColor: 'rgba(41, 36, 83, 0.95)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  zIndex: 10,
  marginLeft: '-32px',
  marginRight: '-32px',
  paddingLeft: '32px',
  paddingRight: '32px',
  '@media': {
    'screen and (max-width: 768px)': {
      marginLeft: '-20px',
      marginRight: '-20px',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
})

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
})

export const listItem = style({
  marginBottom: '0.75rem',
})

export const listTitle = style({
  fontWeight: '600',
})

export const listMeta = style({
  color: '#666',
  fontSize: '0.9rem',
})

export const listDesc = style({
  marginTop: '0.25rem',
})

export const headerRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
})

export const buttonGroup = style({
  display: 'flex',
  gap: '8px',
})

export const utilButton = style({
  height: '36px',
  padding: '0 16px',
  borderRadius: '30px',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  background: 'rgba(245, 250, 250, 0.1)',
  color: '#F5FAFA',
  fontSize: '0.85rem',
  fontFamily: '"Funnel Sans", sans-serif',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      background: 'rgba(245, 250, 250, 0.2)',
      borderColor: '#F5FAFA',
    },
  },
})

export const importBox = style({
  marginTop: '12px',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  borderRadius: '15px',
  padding: '16px',
  background: 'rgba(245, 250, 250, 0.05)',
})

export const importTextarea = style({
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px 12px',
  borderRadius: '15px',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  background: '#F5FAFA',
  color: '#292453',
  fontFamily: '"Funnel Sans", sans-serif',
  fontSize: '0.85rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  selectors: {
    '&::placeholder': {
      color: '#292453',
      opacity: 0.6,
    },
    '&:focus': {
      borderColor: '#292453',
      boxShadow: '0 0 0 3px rgba(41, 36, 83, 0.2)',
    },
  },
})

export const twoColumnLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  marginTop: '16px',
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
  },
})

export const leftColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const rightColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const fieldWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

export const genderHelpText = style({
  fontSize: '0.75rem',
  color: 'rgba(245, 250, 250, 0.7)',
  fontFamily: '"Funnel Sans", sans-serif',
  lineHeight: '1.4',
  marginTop: '4px',
  fontStyle: 'italic',
})

export const skillsTextarea = style({
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px 12px',
  minHeight: '100px',
  resize: 'vertical',
  borderRadius: '15px',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  background: '#F5FAFA',
  color: '#292453',
  fontFamily: '"Funnel Sans", sans-serif',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  selectors: {
    '&::placeholder': {
      color: '#292453',
      opacity: 0.6,
    },
    '&:focus': {
      borderColor: '#292453',
      boxShadow: '0 0 0 3px rgba(41, 36, 83, 0.2)',
    },
  },
})

export const saveButtonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',
})

export const timelineSection = style({
  marginTop: '20px',
  marginBottom: '20px',
})

export const emptyMessage = style({
  fontSize: '0.9rem',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.6)',
  fontStyle: 'italic',
  textAlign: 'center',
  padding: '20px',
})
