import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const scrollAnim = keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(-50%)' },
})

export const sectionContainer = style({
  maxWidth: '100%',
  margin: `0 auto ${vars.space['5xl']}`,
  padding: `0 ${vars.space['3xl']}`,
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.lg,
})

export const title = style({
  fontFamily: vars.font.family.display,
  fontSize: 'clamp(1.6rem, 0.6vw + 1rem, 2rem)',
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text.primary,
  lineHeight: 1.2,
  letterSpacing: '-1px',
  textAlign: 'left',
})

export const subtitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
  opacity: vars.opacity.almostOpaque,
  maxWidth: '800px',
})

export const marqueeWrapper = style({
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
})

export const marqueeInner = style({
  display: 'flex',
  width: '200%', // car on duplique les avis
  animation: `${scrollAnim} 30s linear infinite`,
})

export const reviewCard = style({
  width: '320px',
  minWidth: '320px',
  maxWidth: '320px',
  flexShrink: 0,
  marginRight: vars.space['2xl'],

  backgroundColor: vars.color.background.light.base,
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border.light}`,
  padding: vars.space['2xl'],
  display: 'flex',
  flexDirection: 'column',
  rowGap: vars.space.md,
})

export const reviewHeader = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: vars.space.md,
})

export const avatarWrapper = style({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  overflow: 'hidden',
  flexShrink: 0,
  backgroundColor: vars.color.background.accent.medium,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const avatarImg = style({
  width: '40px',
  height: '40px',
  objectFit: 'cover',
})

export const personBlock = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '2px',
})

export const personName = style({
  fontFamily: vars.font.family.display,
  fontSize: '0.95rem',
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: '-0.03em',
})

export const personVerified = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: vars.space.xs,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.accent.blue,
})

export const verifiedIcon = style({
  width: '16px',
  height: '16px',
})

export const reviewText = style({
  fontFamily: vars.font.family.sans,
  fontSize: '0.95rem',
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
})
