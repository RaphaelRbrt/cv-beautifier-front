import { style } from '@vanilla-extract/css'

export const photoUploadContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '12px',
  width: '100%',
})

export const topRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  justifyContent: 'flex-start',
})

export const uploadCircle = style({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  border: '2px dashed rgba(245, 250, 250, 0.4)',
  backgroundColor: 'rgba(245, 250, 250, 0.05)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  selectors: {
    '&:hover': {
      borderColor: 'rgba(145, 195, 235, 0.6)',
      backgroundColor: 'rgba(245, 250, 250, 0.1)',
    },
  },
})

export const photoPreview = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

export const uploadIcon = style({
  width: '40px',
  height: '40px',
  color: 'rgba(245, 250, 250, 0.6)',
  transition: 'color 0.3s ease',
  selectors: {
    [`${uploadCircle}:hover &`]: {
      color: 'rgba(145, 195, 235, 0.8)',
    },
  },
})

export const hiddenInput = style({
  display: 'none',
})

export const helpText = style({
  fontSize: '0.75rem',
  color: 'rgba(245, 250, 250, 0.7)',
  textAlign: 'left',
  fontFamily: '"Funnel Sans", sans-serif',
  lineHeight: '1.4',
  width: '100%',
})

export const required = style({
  color: '#91C3EB',
  fontWeight: '600',
})
