import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const sectionContainer = style({
  maxWidth: '100%',
  margin: `0 auto ${vars.space['4xl']}`,
  padding: `0 ${vars.space['3xl']}`,
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space['2xl'],
})

export const headerBlock = style({
  maxWidth: '850px',
})

export const title = style({
  fontFamily: vars.font.family.display,
  fontSize: 'clamp(1.8rem, 0.6vw + 1rem, 2.2rem)',
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text.primary,
  lineHeight: 1.2,
  letterSpacing: '-1px',
  marginBottom: vars.space.md,
})

export const subtitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
  opacity: vars.opacity.almostOpaque,
})

export const dashboardCard = style({
  backgroundColor: vars.color.background.light.base,
  border: `1px solid ${vars.color.border.light}`,
  borderRadius: vars.radius['2xl'] ?? vars.radius.xl,
  boxShadow: vars.shadow.lg,
  padding: vars.space['2xl'],
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space['2xl'],
})

export const dashboardHeader = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.sm,
})

export const jobLine = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  rowGap: vars.space.sm,
  columnGap: vars.space.md,
})

export const jobTitle = style({
  fontFamily: vars.font.family.display,
  fontSize: '1.05rem',
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.03em',
})

export const statusBadge = style({
  fontSize: vars.font.size.xs,
  fontFamily: vars.font.family.display,
  fontWeight: vars.font.weight.semibold,
  backgroundColor: vars.color.accent.blue,
  color: '#fff',
  borderRadius: vars.radius.pill,
  padding: `${vars.space.xs} ${vars.space.md}`,
  lineHeight: 1.2,
})

export const metaLine = style({
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: vars.space.xs,
  columnGap: vars.space.lg,
  fontFamily: vars.font.family.sans,
  fontSize: '0.9rem',
  color: vars.color.text.primary,
  opacity: vars.opacity.almostOpaque,
})

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: vars.space.xs,
})

export const metaIcon = style({
  filter: 'brightness(0) invert(1)',
  backgroundColor: vars.color.background.accent.medium,
  borderRadius: vars.radius.xs,
  padding: '2px',
})

export const scoreText = style({
  fontWeight: vars.font.weight.semibold,
  color: vars.color.primary.light,
})

export const dashboardBody = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['2xl'],
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const col = style({
  backgroundColor: 'rgba(255,255,255,0.02)',
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border.light}`,
  padding: vars.space.lg,
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.sm,
})

export const colTitle = style({
  fontFamily: vars.font.family.display,
  fontSize: '0.9rem',
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.03em',
})

export const colContent = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.xs,
})

export const colText = style({
  fontFamily: vars.font.family.sans,
  fontSize: '0.9rem',
  lineHeight: 1.4,
  color: vars.color.text.primary,
  opacity: vars.opacity.almostOpaque,
})

export const linkBtn = style({
  background: 'transparent',
  border: 'none',
  padding: 0,
  fontFamily: vars.font.family.display,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.accent.blue,
  cursor: 'pointer',
  textAlign: 'left',
})

export const footerNote = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.text.primary,
  opacity: vars.opacity.almostOpaque,
})
