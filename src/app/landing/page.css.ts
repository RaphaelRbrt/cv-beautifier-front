import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '../styles/tokens.css'

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: vars.transform.translateY.fadeIn },
  '100%': { opacity: vars.opacity.full, transform: vars.transform.translateY.reset },
})

const float = keyframes({
  '0%, 100%': { transform: vars.transform.translateY.reset },
  '50%': { transform: 'translateY(-10px)' },
})

export const landingContainer = style({
  minHeight: '100vh',
  position: 'relative',
})

export const contentWrapper = style({
  position: 'relative',
  zIndex: vars.zIndex.dropdown,
  padding: `${vars.space.xl} ${vars.space['3xl']}`,
  maxWidth: '1400px',
  margin: '0 auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: vars.space['2xl'],
  paddingTop: vars.space.md,
  animation: `${fadeIn} 0.6s ${vars.transition.easing.out}`,
  flexShrink: 0,
})

export const logo = style({
  fontSize: vars.font.size['2xl'],
  fontWeight: vars.font.weight.bold,
  color: vars.color.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.lg,
})

export const logoImage = style({
  width: '140px',
  height: 'auto',
})

export const headerRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xl,
})

export const burgerMenu = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  cursor: 'pointer',
  padding: vars.space.md,
  background: 'transparent',
  border: 'none',
  transition: vars.transition.all.normal,
  ':hover': {
    opacity: vars.opacity.primary,
  },
})

export const burgerLine = style({
  width: vars.size.icon.lg,
  height: '2px',
  backgroundColor: vars.color.text.primary,
  borderRadius: vars.radius.xs,
  transition: vars.transition.all.normal,
})

export const connexionButton = style({
  padding: `${vars.space.md} ${vars.space['2xl']}`,
  backgroundColor: 'inherit',
  border: 'none',
  color: vars.color.text.primary,
  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
  fontWeight: vars.font.weight.medium,
  cursor: 'pointer',
  fontFamily: vars.font.family.display,
})

export const heroSection = style({
  textAlign: 'left',
  marginBottom: vars.space['4xl'],
  animation: `${fadeIn} 0.8s ${vars.transition.easing.out} 0.2s backwards`,
  flex: '0 1 auto',
  paddingLeft: vars.space['5xl'],
})

export const mainTitle = style({
  fontSize: '6.3rem',
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text.primary,
  lineHeight: vars.font.lineHeight.tight,
  marginBottom: vars.space['3xl'],
  marginTop: '2vh',
  letterSpacing: '-0.02em',
  fontFamily: vars.font.family.display,
  '@media': {
    'screen and (max-width: 1104px)': {
      fontSize: '6rem',
    },
    'screen and (max-width: 1057px)': {
      fontSize: '5rem',
    },
    'screen and (max-width: 895px)': {
      fontSize: '4rem',
    },
    'screen and (max-width: 734px)': {
      fontSize: '3rem',
    },
  },
})

export const sparkle = style({
  display: 'inline-block',
  verticalAlign: 'top',
  marginTop: vars.space['3xl'],
  width: 'clamp(32px, 4vw, 48px)',
  height: 'clamp(32px, 4vw, 48px)',
  marginLeft: `-${vars.space.md}`,
  animation: `${float} 3s ${vars.transition.easing.inOut} infinite`,
})

export const featuresList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  maxWidth: '900px',
  textAlign: 'left',
})

export const featureItem = style({
  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
  color: vars.color.text.primary,
  marginBottom: vars.space.lg,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.lg,
  fontWeight: vars.font.weight.medium,
  fontFamily: vars.font.family.sans,
})

export const featureIcon = style({
  width: vars.size.icon.md,
  height: vars.size.icon.md,
  filter: 'brightness(0) invert(1)',
  flexShrink: 0,
})

export const stepsContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space.xl,
  paddingLeft: vars.space['5xl'],
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      maxWidth: '600px',
      margin: `0 auto ${vars.space['3xl']}`,
    },
  },
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
  padding: `${vars.space.xs} 14px`,
  backgroundColor: vars.color.background.accent.medium,
  borderRadius: vars.radius.pill,
  color: '#ffffff',
  fontSize: vars.font.size.xs,
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
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.semibold,
  color: '#ffffff',
  marginTop: vars.space.md,
  marginBottom: vars.space.xl,
  opacity: vars.opacity.almostOpaque,
  flex: '0 0 auto',
  fontFamily: vars.font.family.sans,
})

export const stepDescription = style({
  fontSize: vars.font.size.base,
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: vars.font.lineHeight.relaxed,
  marginBottom: vars.space.lg,
})

export const stepSubtext = style({
  fontSize: vars.font.size.sm,
  color: 'rgba(255, 255, 255, 0.7)',
  lineHeight: vars.font.lineHeight.normal,
})

export const ctaSection = style({
  textAlign: 'center',
  animation: `${fadeIn} 0.8s ${vars.transition.easing.out} 0.6s backwards`,
  flexShrink: 0,
  paddingBottom: vars.space['2xl'],
  paddingLeft: vars.space['5xl'],
})

export const ctaButton = style({
  padding: `${vars.space.xs} 14px`,
  backgroundColor: vars.color.accent.blue,
  border: 'none',
  borderRadius: vars.radius.pill,
  color: '#ffffff',
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.bold,
  cursor: 'pointer',
  transition: vars.transition.all.normal,
  boxShadow: vars.shadow.md,
  fontFamily: vars.font.family.display,
})

export const exampleCard = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const exampleTitle = style({
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.bold,
  color: '#ffffff',
  marginBottom: vars.space.sm,
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
  fontSize: vars.font.size.sm,
  color: 'rgba(255, 255, 255, 0.75)',
  lineHeight: vars.font.lineHeight.normal,
  fontFamily: vars.font.family.sans,
})

export const matchBadge = style({
  display: 'inline-block',
  padding: `${vars.space.xs} ${vars.space.lg}`,
  borderRadius: vars.radius.sm,
  color: '#ffffff',
  lineHeight: vars.font.lineHeight.normal,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
})
export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
})

export const exampleCardWrapper = style({
  backgroundColor: vars.color.background.light.base,
  border: `1px solid ${vars.color.border.light}`,
  borderRadius: vars.radius.xl,
  padding: `10px ${vars.space['2xl']}`,
  backdropFilter: `blur(${vars.blur.lg})`,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '110px',
})
