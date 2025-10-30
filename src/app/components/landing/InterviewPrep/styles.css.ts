import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const floatSoft = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-6px)' },
})

export const sectionContainer = style({
  maxWidth: '100%',
  margin: `0 auto ${vars.space['4xl']}`,
  padding: `0 ${vars.space['3xl']}`,
})

export const inner = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['3xl'],
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const textBlock = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.lg,
})

export const title = style({
  fontFamily: vars.font.family.display,
  fontSize: 'clamp(1.8rem, 0.6vw + 1rem, 2.2rem)',
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text.dark,
  lineHeight: 1.2,
  letterSpacing: '-1px',
})

export const subtitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.darkMuted,
  opacity: vars.opacity.almostOpaque,
  maxWidth: '640px',
})

export const bullets = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.sm,
})

export const bulletItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  columnGap: vars.space.md,
  fontFamily: vars.font.family.sans,
  fontSize: '1rem',
  lineHeight: 1.4,
  color: vars.color.text.darkMuted,
  letterSpacing: '-0.03em',
})

export const bulletIcon = style({
  flexShrink: 0,
  //filter: 'brightness(0) invert(1)',
  backgroundColor: vars.color.text.dark,
  borderRadius: vars.radius.xs,
  padding: '2px',
  width: vars.size.icon.md,
  height: vars.size.icon.md,
})

export const cardPreview = style({
  backgroundColor: vars.color.background.light.base,
  borderRadius: vars.radius['2xl'] ?? vars.radius.xl,
  border: `1px solid ${vars.color.border.light}`,
  boxShadow: vars.shadow.lg,
  padding: vars.space['2xl'],
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.xl,
  animation: `${floatSoft} 4s ${vars.transition.easing.inOut} infinite`,
})

export const previewHeader = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.xs,
})

export const previewBadge = style({
  fontFamily: vars.font.family.display,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  backgroundColor: vars.color.text.dark,
  borderRadius: vars.radius.pill,
  padding: `${vars.space.xs} ${vars.space.md}`,
  color: '#fff',
  alignSelf: 'flex-start',
})

export const previewJob = style({
  fontFamily: vars.font.family.sans,
  fontSize: '0.9rem',
  color: vars.color.text.darkMuted,
  opacity: vars.opacity.almostOpaque,
})

export const qaBlock = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.sm,
  fontFamily: vars.font.family.sans,
})

export const qLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.dark,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
})

export const qText = style({
  fontSize: '1rem',
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.darkMuted,
  backgroundColor: 'rgba(255,255,255,0.03)',
  borderLeft: `3px solid ${vars.color.text.dark}`,
  paddingLeft: vars.space.md,
})

export const aLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.dark,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginTop: vars.space.md,
})

export const aText = style({
  fontSize: '1rem',
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.darkMuted,
  backgroundColor: 'rgba(255,255,255,0.04)',
  borderLeft: `3px solid ${vars.color.text.darkMuted}`,
  paddingLeft: vars.space.md,
})
