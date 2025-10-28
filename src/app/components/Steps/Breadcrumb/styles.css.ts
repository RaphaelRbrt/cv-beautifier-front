import { style } from '@vanilla-extract/css'

export const breadcrumb = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
})

export const item = style({
  padding: '6px 10px',
  borderRadius: 999,
  border: '1px solid rgba(0,0,0,0.08)',
  background: '#fff',
  color: '#111',
  fontSize: 14,
})

export const itemActive = style({
  background: '#111',
  color: '#fff',
  borderColor: '#111',
})
