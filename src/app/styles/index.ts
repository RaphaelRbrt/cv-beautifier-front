/**
 * Styles entry point
 * Exports all design tokens and utilities
 */

// Design tokens - must be imported first
import './tokens.css'

// Global styles - imports tokens internally
import './global.css'

// Export tokens for use in components
export { vars } from './tokens.css'
