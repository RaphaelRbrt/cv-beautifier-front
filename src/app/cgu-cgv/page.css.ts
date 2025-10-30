import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const container = style({
  minHeight: '100vh',
  padding: `${vars.space['4xl']} ${vars.space['3xl']}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['3xl']} ${vars.space.xl}`,
    },
  },
})

export const content = style({
  maxWidth: '900px',
  margin: '0 auto',
  backgroundColor: vars.color.background.light.base,
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border.light}`,
  padding: vars.space['3xl'],
  backdropFilter: `blur(${vars.blur.lg})`,
  boxShadow: vars.shadow.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: vars.space.xl,
    },
  },
})

export const title = style({
  fontFamily: vars.font.family.display,
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text.primary,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  marginBottom: vars.space.md,
})

export const updated = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  color: vars.color.text.secondary,
  marginBottom: vars.space['3xl'],
  paddingBottom: vars.space['2xl'],
  borderBottom: `1px solid ${vars.color.border.light}`,
})

export const section = style({
  marginBottom: vars.space['3xl'],
})

export const sectionTitle = style({
  fontFamily: vars.font.family.display,
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
  marginBottom: vars.space.lg,
})

export const text = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
  marginBottom: vars.space.md,
})

export const list = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
  marginLeft: vars.space['2xl'],
  marginBottom: vars.space.md,
})
