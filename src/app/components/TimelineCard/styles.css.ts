import { style } from '@vanilla-extract/css'

export const timelineWrapper = style({
  position: 'relative',
  paddingLeft: '40px', // Space for timeline (dot width 16px + border 2px*2 + margin)
})

export const timelineLine = style({
  position: 'absolute',
  left: '9px', // (40px padding - 16px dot - 4px border) / 2 = center of dot area
  top: 0,
  width: '2px',
  height: '12px',
  backgroundColor: 'rgba(245, 250, 250, 0.2)',
  zIndex: 0,
})

export const timelineConnector = style({
  position: 'absolute',
  left: '9px', // Same as timelineLine for perfect alignment
  top: '24px', // Start after the dot (16px dot + 4px border + 4px margin)
  width: '2px',
  height: 'calc(100% - 24px)',
  backgroundColor: 'rgba(245, 250, 250, 0.2)',
  zIndex: 0,
})

export const timelineCard = style({
  position: 'relative',
  display: 'flex',
  gap: '12px',
  paddingBottom: '24px',
  minHeight: '48px', // Ensure minimum height for consistent spacing
})

export const timelineDot = style({
  position: 'absolute',
  left: '-38px', // -(40px padding - 2px to center the 16px dot)
  top: '4px', // Align with first line of title
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: 'rgba(245, 250, 250, 0.1)',
  border: '2px solid #F5FAFA',
  zIndex: 2,
  boxShadow: '0 0 0 4px rgba(41, 36, 83, 0.5)',
})

export const cardContent = style({
  display: 'flex',
  gap: '12px',
  width: '100%',
  position: 'relative',
})

export const actionsContainer = style({
  position: 'absolute',
  top: '0',
  right: '0',
  display: 'flex',
  gap: '8px',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  selectors: {
    [`${timelineCard}:hover &`]: {
      opacity: 1,
    },
  },
})

export const actionButton = style({
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  border: '1px solid rgba(245, 250, 250, 0.3)',
  background: 'rgba(41, 36, 83, 0.8)',
  backdropFilter: 'blur(8px)',
  color: '#F5FAFA',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      background: 'rgba(145, 195, 235, 0.3)',
      borderColor: '#91C3EB',
      transform: 'scale(1.05)',
    },
  },
})

export const deleteButton = style([
  actionButton,
  {
    selectors: {
      '&:hover': {
        background: 'rgba(239, 68, 68, 0.3)',
        borderColor: '#ef4444',
      },
    },
  },
])

export const logoContainer = style({
  width: '48px',
  height: '48px',
  flexShrink: 0,
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: 'rgba(245, 250, 250, 0.1)',
  border: '1px solid rgba(245, 250, 250, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const logo = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
})

export const infoContainer = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

export const title = style({
  margin: 0,
  fontSize: '1rem',
  fontWeight: '700',
  fontFamily: '"Funnel Display", sans-serif',
  color: '#F5FAFA',
  lineHeight: '1.3',
})

export const subtitleLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  flexWrap: 'wrap',
})

export const subtitle = style({
  fontSize: '0.9rem',
  fontWeight: '600',
  fontFamily: '"Funnel Sans", sans-serif',
  color: '#F5FAFA',
})

export const separator = style({
  color: 'rgba(245, 250, 250, 0.5)',
  fontSize: '0.9rem',
})

export const subtitleExtra = style({
  fontSize: '0.85rem',
  fontWeight: '400',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.8)',
})

export const metaLine = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  marginTop: '2px',
})

export const date = style({
  fontSize: '0.85rem',
  fontWeight: '400',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.7)',
})

export const locationLine = style({
  marginTop: '2px',
})

export const location = style({
  fontSize: '0.85rem',
  fontWeight: '400',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.7)',
})

export const descriptionList = style({
  margin: '12px 0 0 0',
  padding: '0 0 0 20px',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  position: 'relative',
})

export const descriptionItem = style({
  fontSize: '0.9rem',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.85)',
  lineHeight: '1.5',
  position: 'relative',
  paddingLeft: '0',
})

export const descriptionItemWithDash = style({
  fontSize: '0.9rem',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.85)',
  lineHeight: '1.5',
  position: 'relative',
  paddingLeft: '0',
  selectors: {
    '&::before': {
      content: '"—"',
      position: 'absolute',
      left: '-20px',
      color: 'rgba(145, 195, 235, 0.6)',
    },
  },
})

export const descriptionText = style({
  margin: '12px 0 0 0',
  fontSize: '0.9rem',
  fontFamily: '"Funnel Sans", sans-serif',
  color: 'rgba(245, 250, 250, 0.85)',
  lineHeight: '1.5',
})

export const keywordsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '12px',
})

export const keyword = style({
  padding: '4px 12px',
  fontSize: '0.8rem',
  fontFamily: '"Funnel Sans", sans-serif',
  fontWeight: '500',
  color: '#F5FAFA',
  backgroundColor: 'rgba(145, 195, 235, 0.2)',
  border: '1px solid rgba(145, 195, 235, 0.4)',
  borderRadius: '15px',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(145, 195, 235, 0.3)',
      borderColor: 'rgba(145, 195, 235, 0.6)',
    },
  },
})
