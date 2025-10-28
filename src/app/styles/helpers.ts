import { vars } from './tokens.css'

/**
 * Helper function to create rgba color from RGB string with opacity
 * Usage: rgba(vars.color.accent.blueRgb, 0.5)
 */
export const rgba = (rgbString: string, opacity: number) => `rgba(${rgbString}, ${opacity})`

/**
 * Common reusable styles
 * These can be spread into style() calls
 */
export const commonStyles = {
  // Glass morphism effect
  glass: {
    backgroundColor: vars.color.background.light.base,
    border: `1px solid ${vars.color.border.light}`,
    borderRadius: vars.radius.xl,
    backdropFilter: `blur(${vars.blur.lg})`,
    WebkitBackdropFilter: `blur(${vars.blur.lg})`,
  },

  // Focus ring
  focusRing: {
    outline: 'none',
    boxShadow: vars.shadow.focus.accent,
  },

  // Hover lift effect
  hoverLift: {
    transform: vars.transform.translateY.lift,
    transition: vars.transition.all.fast,
  },

  // Disabled state
  disabled: {
    opacity: vars.opacity.disabled,
    cursor: 'not-allowed' as const,
  },

  // Truncate text
  truncate: {
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const,
  },

  // Flexbox utilities
  flex: {
    center: {
      display: 'flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    between: {
      display: 'flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    column: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
    },
  },

  // Position utilities
  position: {
    absolute: {
      center: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
} as const
