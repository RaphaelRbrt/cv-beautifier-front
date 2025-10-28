import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const heading = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  marginBottom: vars.space['2xl'],
})

export const tabsContainer = style({
  display: 'flex',
  gap: vars.space.md,
  marginBottom: vars.space['3xl'],
})

const baseTabButton = style({
  padding: `${vars.space.md} ${vars.space['2xl']}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.border.light}`,
  cursor: 'pointer',
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  transition: vars.transition.fast,
})

export const tabButton = styleVariants({
  active: [
    baseTabButton,
    {
      background: vars.color.accent.blue,
      color: vars.color.text.primary,
    },
  ],
  inactive: [
    baseTabButton,
    {
      background: vars.color.background.light.opaque,
      color: vars.color.text.dark,
    },
  ],
})

export const contentContainer = style({
  padding: vars.space['3xl'],
  backgroundColor: vars.color.background.light.subtle,
  borderRadius: vars.radius.md,
  minHeight: '200px',
})

export const paragraph = style({
  marginBottom: vars.space.md,
})
