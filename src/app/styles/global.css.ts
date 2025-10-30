import { globalStyle } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

/**
 * Global styles and CSS Reset
 * Combines modern CSS reset with application-specific global styles
 */

// ========================================
// CSS RESET
// ========================================

// Box sizing rules
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

// Remove default margin and padding
globalStyle('*', {
  margin: 0,
  padding: 0,
})

// Allow percentage-based heights
globalStyle('html, body, #__next', {
  height: '100%',
})

// ========================================
// APPLICATION STYLES
// ========================================

// Body base styles
globalStyle('html, body', {
  background: vars.color.primary.dark,
  color: vars.color.text.primary,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.normal,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
  height: 'max-content',
})

// Improve media defaults
globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
})

// Form elements inherit font
globalStyle('input, button, textarea, select', {
  font: 'inherit',
  outline: 'none',
  border: 'none',
})

// Avoid text overflows
globalStyle('p, h1, h2, h3, h4, h5, h6', {
  overflowWrap: 'break-word',
})

// Headings
globalStyle('h1, h2, h3, h4, h5, h6', {
  fontFamily: vars.font.family.display,
  fontWeight: vars.font.weight.bold,
  lineHeight: vars.font.lineHeight.tight,
})

// Remove list styles
globalStyle('ul, ol', {
  listStyle: 'none',
})

// Button reset
globalStyle('button', {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
})

// Link styles
globalStyle('a', {
  color: vars.color.accent.blue,
  textDecoration: 'none',
  transition: `color ${vars.transition.fast}`,
})

globalStyle('a:hover', {
  color: vars.color.background.accent.opaque,
})

// Root stacking context
globalStyle('#root, #__next', {
  isolation: 'isolate',
})

// Table defaults
globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
})

// Fieldset reset
globalStyle('fieldset', {
  border: 'none',
})

// Remove search input decorations
globalStyle('input[type="search"]::-webkit-search-decoration', {
  display: 'none',
})

globalStyle('input[type="search"]::-webkit-search-cancel-button', {
  display: 'none',
})

// Focus visibility
globalStyle(':focus-visible', {
  outline: '2px solid currentColor',
  outlineOffset: '2px',
})

// ========================================
// SCROLLBAR CUSTOMIZATION
// ========================================

globalStyle('::-webkit-scrollbar', {
  width: vars.space.md,
  height: vars.space.md,
})

globalStyle('::-webkit-scrollbar-track', {
  background: vars.color.background.dark.subtle,
})

globalStyle('::-webkit-scrollbar-thumb', {
  background: vars.color.background.light.medium,
  borderRadius: vars.radius.sm,
})

globalStyle('::-webkit-scrollbar-thumb:hover', {
  background: vars.color.background.light.strong,
})
