import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const footer = style({
  backgroundColor: vars.color.background.light.base,
  borderTop: `1px solid ${vars.color.border.light}`,
  backdropFilter: `blur(${vars.blur.lg})`,
  marginTop: vars.space['5xl'],
  padding: `${vars.space['4xl']} 0`,
})

export const container = style({
  maxWidth: '100%',
  margin: '0 auto',
  padding: `0 ${vars.space['3xl']}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `0 ${vars.space.xl}`,
    },
  },
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '2fr 3fr',
  gap: vars.space['4xl'],
  marginBottom: vars.space['3xl'],
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: vars.space['2xl'],
    },
  },
})

export const brand = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
})

export const logo = style({
  width: '140px',
  height: 'auto',
})

export const tagline = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
  maxWidth: '300px',
})

export const links = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['2xl'],
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: vars.space.xl,
    },
  },
})

export const column = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
})

export const columnTitle = style({
  fontFamily: vars.font.family.display,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  marginBottom: vars.space.xs,
  letterSpacing: '-0.01em',
})

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
})

export const link = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  color: vars.color.text.secondary,
  textDecoration: 'none',
  transition: vars.transition.fast,
  ':hover': {
    color: vars.color.accent.blue,
  },
})

export const bottom = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: vars.space['2xl'],
  borderTop: `1px solid ${vars.color.border.light}`,
  '@media': {
    'screen and (max-width: 600px)': {
      flexDirection: 'column',
      gap: vars.space.lg,
      textAlign: 'center',
    },
  },
})

export const copyright = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.xs,
  color: vars.color.text.secondary,
})

export const social = style({
  display: 'flex',
  gap: vars.space.md,
})

export const socialLink = style({
  width: '36px',
  height: '36px',
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.background.light.medium,
  border: `1px solid ${vars.color.border.light}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.text.primary,
  transition: vars.transition.all.normal,
  ':hover': {
    backgroundColor: vars.color.background.accent.medium,
    borderColor: vars.color.accent.blue,
    transform: vars.transform.translateY.lift,
  },
})
