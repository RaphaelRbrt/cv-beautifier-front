import { style } from '@vanilla-extract/css'
import { vars } from '../../../styles/tokens.css'

/**
 * White background container for landing page sections
 * Provides visual separation from the animated gradient background
 */
export const container = style({
  backgroundColor: '#ffffff',
  paddingLeft: '3.5rem',
  paddingRight: '3.5rem',
  margin: `${vars.space['4xl']} auto`,
  maxWidth: '100%',
  boxShadow: vars.shadow.lg,
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['3xl']} ${vars.space.xl}`,
      margin: `${vars.space['3xl']} ${vars.space.md}`,
      borderRadius: vars.radius.xl,
    },
  },
})
