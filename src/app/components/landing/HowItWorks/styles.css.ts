import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/tokens.css'

export const stepsContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
  paddingLeft: '3.5rem',
  paddingRight: '1rem',
  marginBottom: '10vh',
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 1300px)': {
      paddingLeft: '3rem',
    },
    'screen and (max-width: 1200px)': {
      paddingLeft: '2rem',
    },
    'screen and (max-width: 1100px)': {
      paddingLeft: '1rem',
    },
    'screen and (max-width: 1000px)': {
      paddingLeft: '0.5rem',
    },
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      padding: '0',
      width: '100%',
      margin: `0 auto ${vars.space['3xl']}`,
    },
    'screen and (max-width: 800px)': {
      paddingLeft: '0',
    },
  },
})

export const stepsIntroTitle = style({
  fontSize: '1.75rem',
  color: vars.color.primary.dark,
  marginBottom: vars.space.md,
  paddingLeft: '3.5rem',
  fontWeight: vars.font.weight.bold,
  fontFamily: vars.font.family.display,
  letterSpacing: '-1px',
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 1320px)': { fontSize: '1.65rem' },
    'screen and (max-width: 1150px)': { fontSize: '1.55rem' },
    'screen and (max-width: 980px)': { fontSize: '1.45rem' },
    'screen and (max-width: 840px)': { fontSize: '1.35rem' },
    'screen and (max-width: 700px)': { fontSize: '1.15rem' },
    'screen and (max-width: 590px)': { fontSize: '1.05rem', letterSpacing: '0' },
  },
})

export const stepsIntroSubtitle = style({
  fontSize: '1.2rem',
  color: vars.color.text.darkMuted,
  textAlign: 'center',
  opacity: vars.opacity.almostOpaque,
  marginBottom: vars.space['2xl'],
  paddingLeft: '3.5rem',
  fontWeight: vars.font.weight.medium,
  fontFamily: vars.font.family.sans,
})

export const stepsIntroBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  marginTop: vars.space['4xl'],
})

export const stepCard = style({
  borderRadius: vars.radius.xl,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
})

export const stepBadge = style({
  display: 'inline-block',
  padding: `2px 18px 2px 18px`,
  backgroundColor: vars.color.background.dark.base,
  borderRadius: vars.radius.pill,
  color: '#ffffff',
  fontSize: '1.2rem',
  fontWeight: vars.font.weight.semibold,
  textTransform: 'capitalize',
  letterSpacing: '0.02em',
  alignSelf: 'center',
  flex: '0 0 auto',
  fontFamily: vars.font.family.display,
})

export const stepIcon = style({
  display: 'none',
})

export const stepTitle = style({
  fontSize: '1.2rem',
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.darkMuted,
  marginTop: vars.space.md,
  marginBottom: '0.95rem',
  opacity: vars.opacity.almostOpaque,
  flex: '0 0 auto',
  fontFamily: vars.font.family.sans,
})

export const exampleCard = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '94px',
})

export const exampleTitle = style({
  fontSize: '1.2rem',
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.dark,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: vars.space.md,
  fontFamily: vars.font.family.display,
})

export const exampleIcon = style({
  width: vars.size.icon.md,
  height: vars.size.icon.md,
  filter:
    'brightness(0) saturate(100%) invert(78%) sepia(21%) saturate(1095%) hue-rotate(175deg) brightness(96%) contrast(87%)',
})

export const exampleDetails = style({
  fontSize: '0.95rem',
  color: vars.color.text.darkMuted,
  lineHeight: '1.3rem',
  fontFamily: vars.font.family.sans,
})

export const matchBadge = style({
  display: 'inline-block',
  padding: `${vars.space.xs} ${vars.space.lg}`,
  borderRadius: vars.radius.sm,
  color: vars.color.text.dark,
  lineHeight: vars.font.lineHeight.normal,
  fontSize: '0.95rem',
  fontFamily: vars.font.family.sans,
})

export const exampleCardWrapper = style({
  backgroundColor: vars.color.background.light.base,
  border: `1px solid ${vars.color.text.darkMuted}`,
  borderRadius: vars.radius.xl,
  padding: `0px 0px 12px 0px`,
  backdropFilter: `blur(${vars.blur.lg})`,
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
})
