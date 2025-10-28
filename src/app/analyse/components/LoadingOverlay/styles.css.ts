import { CSSProperties } from 'react'

export const overlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}

export const modal: CSSProperties = {
  width: '100%',
  maxWidth: 450,
  padding: 32,
  backgroundColor: '#fff',
  borderRadius: 12,
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
}

export const spinner: CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: 28,
  border: '4px solid #e5e7eb',
  borderTopColor: '#91C3EB',
  animation: 'spin 1s linear infinite',
  margin: '0 auto 20px',
}

export const message: CSSProperties = {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
  color: '#111',
}

export const progressBarContainer: CSSProperties = {
  width: '100%',
  height: 10,
  backgroundColor: '#e5e7eb',
  borderRadius: 5,
  overflow: 'hidden',
  marginBottom: 12,
}

export const progressBar: CSSProperties = {
  height: '100%',
  backgroundColor: '#91C3EB',
  transition: 'width 0.3s ease',
  borderRadius: 5,
}

export const progressText: CSSProperties = {
  textAlign: 'center',
  fontSize: 16,
  color: '#666',
  fontWeight: 500,
}

export const error: CSSProperties = {
  color: '#ef4444',
  marginTop: 16,
  textAlign: 'center',
  fontSize: 14,
}

export const keyframes =
  '@keyframes spin { from {transform: rotate(0)} to {transform: rotate(360deg)} }'
