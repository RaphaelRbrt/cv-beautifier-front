import { style } from '@vanilla-extract/css'

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
  zIndex: 10,
  marginLeft: '-32px',
  marginRight: '-32px',
  paddingLeft: '32px',
  paddingRight: '32px',
  transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
  '@media': {
    'screen and (max-width: 768px)': {
      marginLeft: '-20px',
      marginRight: '-20px',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
})

export const stuck = style({
  backgroundColor: 'rgba(41, 36, 83, 0.95)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
})
