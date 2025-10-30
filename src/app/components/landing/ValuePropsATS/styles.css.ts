import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const fadeUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(20px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

export const section = style({
  maxWidth: '100%',
  margin: `0 auto ${vars.space['4xl']}`,
  padding: `${vars.space['4xl']} ${vars.space['3xl']}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['3xl']} ${vars.space.xl}`,
    },
  },
})

export const header = style({
  marginBottom: vars.space['3xl'],
  maxWidth: '900px',
})

export const title = style({
  fontFamily: vars.font.family.display,
  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text.dark,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  marginBottom: vars.space.lg,
})

export const gradientText = style({
  background: `linear-gradient(135deg, ${vars.color.accent.blue} 0%, ${vars.color.primary.dark} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
})

export const subtitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.darkMuted,
  maxWidth: '720px',
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: vars.space['2xl'],
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const card = style({
  position: 'relative',
  backgroundColor: vars.color.background.light.base,
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border.light}`,
  padding: vars.space['2xl'],
  backdropFilter: `blur(${vars.blur.lg})`,
  transition: vars.transition.all.normal,
  animation: `${fadeUp} 0.6s ${vars.transition.easing.out} backwards`,
  borderColor: vars.color.text.darkMuted,
  ':hover': {
    transform: vars.transform.translateY.lift,
    borderColor: vars.color.border.medium,
    boxShadow: vars.shadow.hover.card,
  },
})

export const iconWrapper = style({
  width: '48px',
  height: '48px',
  borderRadius: vars.radius.lg,
  background: `linear-gradient(135deg, ${vars.color.background.accent.medium} 0%, ${vars.color.background.accent.strong} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: vars.space.lg,
  boxShadow: vars.shadow.sm,
})

export const icon = style({
  filter: 'brightness(0) invert(1)',
})

export const cardTitle = style({
  fontFamily: vars.font.family.display,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.dark,
  marginBottom: vars.space.md,
  letterSpacing: '-0.01em',
})

export const cardText = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.darkMuted,
})

export const highlight = style({
  color: vars.color.text.dark,
  fontWeight: vars.font.weight.semibold,
})
