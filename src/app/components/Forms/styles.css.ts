import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const fieldWrapper = style({
  display: 'grid',
  rowGap: '6px',
  width: '100%',
})

export const label = style({
  fontSize: vars.font.size.sm,
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.semibold,
  fontFamily: vars.font.family.sans,
})

export const inputBase = style({
  width: '100%',
  padding: `${vars.space.md} ${vars.space.lg}`,
  boxSizing: 'border-box',
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border.light}`,
  background: vars.color.primary.light,
  color: vars.color.primary.dark,
  fontFamily: vars.font.family.sans,
  boxShadow: vars.shadow.inset.light,
  height: '28px',
  maxWidth: '100%',
  outline: 'none',
  transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  selectors: {
    '&::placeholder': {
      color: vars.color.text.dark,
      opacity: vars.opacity.muted,
    },
    '&:focus': {
      borderColor: vars.color.primary.dark,
      boxShadow: vars.shadow.focus.primary,
    },
  },
})

export const inputError = style({
  border: `1px solid ${vars.color.border.error}`,
})

export const select = style({
  width: '100%',
  padding: `${vars.space.md} ${vars.space.lg}`,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border.light}`,
  background: vars.color.primary.light,
  color: vars.color.primary.dark,
  fontFamily: vars.font.family.sans,
  boxShadow: vars.shadow.inset.light,
  height: '28px',
  boxSizing: 'border-box',
  maxWidth: '100%',
  outline: 'none',
  transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  selectors: {
    '&:focus': {
      borderColor: vars.color.primary.dark,
      boxShadow: vars.shadow.focus.primary,
    },
  },
})

export const button = style({
  height: vars.size.button.lg,
  padding: `0 ${vars.space.xl}`,
  minWidth: '120px',
  borderRadius: vars.radius.pill,
  background: `linear-gradient(135deg, ${vars.color.accent.blue} 0%, ${vars.color.background.accent.opaque} 100%)`,
  border: `1px solid ${vars.color.border.strong}`,
  color: vars.color.text.primary,
  letterSpacing: '0.2px',
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.sans,
  cursor: 'pointer',
  textAlign: 'center',
  transition: `transform ${vars.transition.fast}, box-shadow ${vars.transition.fast}, opacity ${vars.transition.fast}`,
  boxSizing: 'border-box',
  selectors: {
    '&:hover': {
      transform: vars.transform.translateY.lift,
      boxShadow: vars.shadow.hover.button,
    },
    '&:disabled': {
      opacity: vars.opacity.disabled,
      cursor: 'not-allowed',
    },
    '&:active': {
      transform: vars.transform.translateY.reset,
    },
  },
})

export const buttonError = style({
  border: `1px solid ${vars.color.border.error}`,
  color: vars.color.text.primary,
  background: `linear-gradient(180deg, ${vars.color.semantic.error} 0%, #dc2626 100%)`,
  selectors: {
    '&:hover': {
      boxShadow: vars.shadow.hover.error,
      filter: 'brightness(1.05)',
    },
  },
})

export const errorText = style({
  color: vars.color.semantic.error,
  fontSize: vars.font.size.sm,
})

// Cartes glassmorphism unifiées (formulaire d'ajout et cartes affichées)
export const cardGlass = style({
  margin: `${vars.space.lg} 0`,
  border: `1px solid ${vars.color.border.light}`,
  borderRadius: vars.radius.xl,
  padding: vars.space.xl,
  background: vars.color.background.light.medium,
  backdropFilter: `blur(${vars.blur.xl})`,
  WebkitBackdropFilter: `blur(${vars.blur.xl})`,
  boxShadow: vars.shadow.hover.card,
})

// Checkbox styles
export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
  cursor: 'pointer',
  userSelect: 'none',
})

export const checkboxInput = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
})

export const checkboxCustom = style({
  width: '10px',
  height: '10px',
  borderRadius: vars.radius.circle,
  border: `2px solid ${vars.color.primary.light}`,
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: vars.transition.all.fast,
  flexShrink: 0,
  selectors: {
    [`${checkboxInput}:checked + &`]: {
      background: vars.color.primary.light,
      borderColor: vars.color.primary.light,
    },
    [`${checkboxInput}:focus + &`]: {
      boxShadow: vars.shadow.focus.accent,
    },
    [`${checkboxLabel}:hover &`]: {
      borderColor: vars.color.primary.light,
      transform: vars.transform.scale.md,
    },
  },
})

export const checkboxIcon = style({
  width: '6px',
  height: '6px',
  color: vars.color.primary.dark,
})

export const checkboxText = style({
  fontSize: vars.font.size.sm,
  color: vars.color.text.primary,
  fontFamily: vars.font.family.sans,
})
