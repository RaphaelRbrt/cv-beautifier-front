import { CSSProperties } from 'react'

export const container: CSSProperties = {
  padding: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}

export const content: CSSProperties = {
  textAlign: 'center',
}

export const spinner: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 20,
  border: '3px solid #ddd',
  borderTopColor: '#111',
  animation: 'spin 1s linear infinite',
  margin: '0 auto 12px',
}

export const keyframes =
  '@keyframes spin { from {transform: rotate(0)} to {transform: rotate(360deg)} }'
