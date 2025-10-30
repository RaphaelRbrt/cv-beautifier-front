import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const sectionContainer = style({
  maxWidth: '100%',
  margin: `0 auto ${vars.space['4xl']}`,
  padding: `0 ${vars.space['3xl']}`,
})

export const innerCard = style({
  backgroundColor: vars.color.background.accent.medium,
  borderRadius: vars.radius['2xl'] ?? vars.radius.xl,
  boxShadow: vars.shadow.lg,
  padding: vars.space['3xl'],
  color: '#fff',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  columnGap: vars.space['3xl'],
  rowGap: vars.space['2xl'],
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const left = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.md,
})

export const title = style({
  fontFamily: vars.font.family.display,
  fontSize: 'clamp(1.6rem, 0.6vw + 1rem, 2rem)',
  fontWeight: vars.font.weight.extrabold,
  lineHeight: 1.2,
  letterSpacing: '-1px',
  color: '#fff',
})

export const subtitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  opacity: vars.opacity.almostOpaque,
})

export const ctaBtn = style({
  alignSelf: 'flex-start',
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space['2xl']}`,
  borderRadius: vars.radius.pill,
  border: 'none',
  backgroundColor: '#91C3EB',
  color: vars.color.text.primary,
  fontFamily: vars.font.family.display,
  fontWeight: vars.font.weight.bold,
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: vars.shadow.md,
})

export const ctaIcon = style({
  width: '20px',
  height: '20px',
})

export const trustText = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.normal,
  opacity: vars.opacity.almostOpaque,
})

export const right = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space['2xl'],
})

export const statBlock = style({
  backgroundColor: 'rgba(0,0,0,0.2)',
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
  boxShadow: vars.shadow.sm,
})

export const statNumber = style({
  fontFamily: vars.font.family.display,
  fontWeight: vars.font.weight.extrabold,
  fontSize: '2rem',
  lineHeight: 1.1,
  color: '#fff',
  letterSpacing: '-1px',
})

export const statLabel = style({
  fontFamily: vars.font.family.sans,
  fontSize: '0.9rem',
  lineHeight: 1.3,
  color: '#fff',
  opacity: vars.opacity.almostOpaque,
})
