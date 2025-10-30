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
  //padding: `${vars.space.xl} ${vars.space['3xl']}`,
  maxWidth: '100%',
  margin: '0 auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
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
  paddingLeft: '3.5rem',
  paddingRight: '3.5rem',
  '@media': {
    'screen and (max-width: 1300px)': {
      paddingLeft: '3rem',
      paddingRight: '3rem',
    },
    'screen and (max-width: 1200px)': {
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
    'screen and (max-width: 1100px)': {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
    'screen and (max-width: 1000px)': {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
    },
    'screen and (max-width: 800px)': {
      paddingLeft: '0',
      paddingRight: '0',
    },
  },
})

export const mainTitle = style({
  fontSize: '8.35rem',
  fontWeight: vars.font.weight.extrabold,
  color: vars.color.text.primary,
  lineHeight: '8.8rem',
  marginBottom: '2.8rem',
  marginTop: '4rem',
  letterSpacing: '-2px',
  fontFamily: vars.font.family.display,
  '@media': {
    'screen and (max-width: 1620px)': {
      fontSize: '7.35rem',
      lineHeight: '7.8rem',
    },
    'screen and (max-width: 1150px)': {
      fontSize: '6.35rem',
      lineHeight: '6.8rem',
    },
    'screen and (max-width: 980px)': {
      fontSize: '5.35rem',
      lineHeight: '5.8rem',
    },
    'screen and (max-width: 840px)': {
      fontSize: '4.35rem',
      lineHeight: '4.8rem',
    },
    'screen and (max-width: 680px)': {
      fontSize: '3.35rem',
      lineHeight: '3.8rem',
    },
    'screen and (max-width: 530px)': {
      fontSize: '2.35rem',
      lineHeight: '2.8rem',
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
  width: '100%',
  textAlign: 'left',
})

export const featureItem = style({
  fontSize: '1.75rem',
  color: vars.color.text.primary,
  marginBottom: '0.1rem',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-1px',
  gap: '18px',
  fontWeight: vars.font.weight.medium,
  fontFamily: vars.font.family.sans,
  '@media': {
    'screen and (max-width: 1620px)': {
      fontSize: '1.65rem',
      marginBottom: '0.2rem',
    },
    'screen and (max-width: 1150px)': {
      fontSize: '1.55rem',
      marginBottom: '0.3rem',
    },
    'screen and (max-width: 980px)': {
      fontSize: '1.45rem',
      marginBottom: '0.4rem',
    },
    'screen and (max-width: 840px)': {
      fontSize: '1.35rem',
      marginBottom: '0.5rem',
    },
    'screen and (max-width: 700px)': {
      fontSize: '1.15rem',
      marginBottom: '0.6rem',
    },
    'screen and (max-width: 590px)': {
      fontSize: '1.05rem',
      marginBottom: '0.7rem',
      letterSpacing: '0',
    },
  },
})

export const featureIcon = style({
  width: vars.size.icon.md,
  height: vars.size.icon.md,
  filter: 'brightness(0) invert(1)',
  flexShrink: 0,
})

export const ctaSection = style({
  animation: `${fadeIn} 0.8s ${vars.transition.easing.out} 0.6s backwards`,
  marginTop: '2rem',
  marginBottom: '3rem',
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

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
})
