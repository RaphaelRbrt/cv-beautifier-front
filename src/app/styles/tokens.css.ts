import { createGlobalTheme } from '@vanilla-extract/css'

/**
 * Design System Tokens
 * Centralized design tokens for consistent styling across the application
 */

export const vars = createGlobalTheme(':root', {
  // ============================================================================
  // COLOR PALETTE
  // ============================================================================
  color: {
    // Primary Colors
    primary: {
      light: '#F5FAFA', // Main light color - text, UI elements
      dark: '#292453', // Main dark color - backgrounds, text on light
    },

    // Accent Colors
    accent: {
      blue: '#91C3EB', // Accent blue - buttons, hover states
      blueRgb: '145, 195, 235', // RGB values for rgba usage
    },

    // Semantic Colors
    semantic: {
      error: '#ef4444', // Error, delete actions
      errorRgb: '239, 68, 68', // RGB values for rgba usage
      success: '#10b981', // Success states
      warning: '#f59e0b', // Warning states
      info: '#3b82f6', // Info states
    },

    // Background Colors with Opacity Variants
    background: {
      // Light backgrounds
      light: {
        base: 'rgba(245, 250, 250, 0.2)', // Standard glass card
        subtle: 'rgba(245, 250, 250, 0.05)', // Subtle background
        medium: 'rgba(245, 250, 250, 0.1)', // Medium opacity
        strong: 'rgba(245, 250, 250, 0.3)', // Stronger opacity
        opaque: 'rgba(245, 250, 250, 0.8)', // Almost opaque
      },

      // Dark backgrounds
      dark: {
        base: 'rgba(41, 36, 83, 0.95)', // Standard dark overlay
        modal: 'rgba(41, 36, 83, 0.98)', // Modal background
        subtle: 'rgba(41, 36, 83, 0.2)', // Subtle dark overlay
        overlay: 'rgba(0, 0, 0, 0.85)', // Modal overlay
      },

      // Accent backgrounds
      accent: {
        subtle: 'rgba(145, 195, 235, 0.2)', // Subtle blue background
        medium: 'rgba(145, 195, 235, 0.3)', // Medium blue background
        strong: 'rgba(145, 195, 235, 0.4)', // Strong blue background
        opaque: 'rgba(145, 195, 235, 0.75)', // Almost opaque blue
      },

      // Error backgrounds
      error: {
        subtle: 'rgba(239, 68, 68, 0.2)', // Subtle error background
        medium: 'rgba(239, 68, 68, 0.3)', // Medium error background
        strong: 'rgba(239, 68, 68, 0.8)', // Strong error background
      },
    },

    // Text Colors
    text: {
      primary: '#F5FAFA', // Primary text
      secondary: 'rgba(245, 250, 250, 0.8)', // Secondary text
      tertiary: 'rgba(245, 250, 250, 0.6)', // Tertiary text
      muted: 'rgba(245, 250, 250, 0.4)', // Muted/placeholder text
      dark: '#292453', // Dark text on light backgrounds
      darkMuted: 'rgba(41, 36, 83, 0.6)', // Muted dark text
    },

    // Border Colors
    border: {
      light: 'rgba(245, 250, 250, 0.2)', // Standard border
      medium: 'rgba(245, 250, 250, 0.3)', // Medium border
      strong: 'rgba(245, 250, 250, 0.5)', // Strong border
      accent: '#91C3EB', // Accent border
      error: '#ef4444', // Error border
    },
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  font: {
    // Font Families
    family: {
      sans: '"Funnel Sans", sans-serif', // Body text, regular content
      display: '"Funnel Display", sans-serif', // Headings, display text
    },

    // Font Sizes (rem-based for accessibility)
    size: {
      xs: '0.75rem', // 12px - Very small text, footnotes
      sm: '0.85rem', // 13.6px - Small text, labels, captions
      base: '0.9rem', // 14.4px - Regular text, descriptions
      md: '0.95rem', // 15.2px - Medium text
      lg: '1rem', // 16px - Standard heading size
      xl: '1.25rem', // 20px - Large headings
      '2xl': '1.5rem', // 24px - Extra large headings
    },

    // Font Weights
    weight: {
      regular: '400', // Normal text
      medium: '500', // Medium emphasis
      semibold: '600', // Semi-bold for labels, buttons
      bold: '700', // Bold for headings
      extrabold: '800', // Extra bold for emphasis
    },

    // Line Heights
    lineHeight: {
      tight: '1.3', // Tight spacing for headings
      normal: '1.5', // Normal spacing for body text
      relaxed: '1.75', // Relaxed spacing for readability
    },
  },

  // ============================================================================
  // SPACING SCALE
  // ============================================================================
  space: {
    xs: '4px', // Micro-spacing, fine adjustments
    sm: '6px', // Fine-grained spacing
    md: '8px', // Small gaps, compact spacing
    lg: '12px', // Standard gap, most common
    xl: '16px', // Larger gaps, card padding
    '2xl': '20px', // Container padding, element gaps
    '3xl': '24px', // Large gaps, section spacing
    '4xl': '32px', // Major section padding
    '5xl': '40px', // Extra large spacing
    '6xl': '60px', // Maximum spacing
  },

  // ============================================================================
  // BORDER RADIUS
  // ============================================================================
  radius: {
    none: '0',
    xs: '4px', // Tiny radius
    sm: '8px', // Small elements, action buttons
    md: '12px', // Standard cards, buttons, inputs
    lg: '15px', // Input fields, larger elements
    xl: '20px', // Main containers, glass cards
    '2xl': '24px', // Extra large containers
    pill: '30px', // Pill-shaped buttons
    full: '9999px', // Perfect circle/pill
    circle: '50%', // Circular elements
  },

  // ============================================================================
  // SHADOWS
  // ============================================================================
  shadow: {
    // Inset Shadows
    inset: {
      light: 'inset 0 1px 2px rgba(255, 255, 255, 0.1)', // Embossed effect
    },

    // Focus Rings
    focus: {
      primary: '0 0 0 3px rgba(41, 36, 83, 0.2)', // Primary focus
      accent: '0 0 0 3px rgba(145, 195, 235, 0.1)', // Accent focus
    },

    // Drop Shadows
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
    md: '0 4px 12px rgba(0, 0, 0, 0.15)', // Medium shadow
    lg: '0 8px 24px rgba(0, 0, 0, 0.2)', // Large shadow
    xl: '0 20px 60px rgba(0, 0, 0, 0.5)', // Extra large (modals)

    // Hover Shadows
    hover: {
      button: '0 4px 12px rgba(145, 195, 235, 0.3)', // Button hover
      card: '0 8px 24px rgba(0, 0, 0, 0.25)', // Card hover
      error: '0 4px 12px rgba(239, 68, 68, 0.3)', // Error button hover
    },

    // Special Shadows
    timeline: '0 0 0 4px rgba(41, 36, 83, 0.5)', // Timeline dot
  },

  // ============================================================================
  // BLUR & EFFECTS
  // ============================================================================
  blur: {
    sm: '6px', // Light blur - subtle glass effect
    md: '8px', // Medium blur - overlays, buttons
    lg: '12px', // Standard blur - glass morphism
    xl: '16px', // Heavy blur - emphasis
  },

  // ============================================================================
  // TRANSITIONS & ANIMATIONS
  // ============================================================================
  transition: {
    // Durations
    duration: {
      fast: '0.2s', // Fast transitions - hover, opacity
      normal: '0.3s', // Normal transitions - effects, transforms
      slow: '0.5s', // Slow transitions - complex animations
    },

    // Easing Functions
    easing: {
      default: 'ease', // Default easing
      in: 'ease-in', // Ease in
      out: 'ease-out', // Ease out
      inOut: 'ease-in-out', // Ease in-out
    },

    // Complete Transitions (duration + easing)
    fast: '0.2s ease', // Standard fast transition
    normal: '0.3s ease', // Standard normal transition
    smooth: '0.3s ease-in-out', // Smooth transition
    all: {
      fast: 'all 0.2s ease', // All properties, fast
      normal: 'all 0.3s ease', // All properties, normal
    },
  },

  // ============================================================================
  // TRANSFORMS
  // ============================================================================
  transform: {
    // Translate Y
    translateY: {
      lift: 'translateY(-1px)', // Subtle lift on hover
      liftLg: 'translateY(-2px)', // Larger lift
      reset: 'translateY(0)', // Reset transform
      fadeIn: 'translateY(6px)', // Fade-in animation start
      drop: 'translateY(-20px)', // Large drop animation
    },

    // Scale
    scale: {
      sm: 'scale(1.02)', // Tiny zoom
      md: 'scale(1.05)', // Medium zoom
      lg: 'scale(1.1)', // Large zoom
      reset: 'scale(1)', // Reset scale
    },
  },

  // ============================================================================
  // OPACITY
  // ============================================================================
  opacity: {
    disabled: '0.5', // Disabled state
    muted: '0.6', // Muted elements
    secondary: '0.7', // Secondary elements
    primary: '0.8', // Primary semi-transparent
    almostOpaque: '0.9', // Almost opaque
    full: '1', // Fully opaque
  },

  // ============================================================================
  // Z-INDEX SCALE
  // ============================================================================
  zIndex: {
    base: '0', // Base layer
    dropdown: '1', // Dropdowns
    sticky: '10', // Sticky headers, navigation
    overlay: '50', // Notifications, toasts
    modal: '9999', // Modal dialogs
    modalHigh: '10000', // High priority modals (delete confirmation)
  },

  // ============================================================================
  // SIZING
  // ============================================================================
  size: {
    // Icon Sizes
    icon: {
      xs: '12px',
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
    },

    // Button Heights
    button: {
      sm: '32px',
      md: '36px',
      lg: '44px',
      xl: '52px',
    },

    // Input Heights
    input: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
  },

  // ============================================================================
  // BREAKPOINTS (for reference)
  // ============================================================================
  breakpoint: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
})

/**
 * Dark theme class (placeholder - theme system not fully implemented)
 * Currently the app uses a dark theme by default
 */
export const darkThemeClass = 'dark-theme'
