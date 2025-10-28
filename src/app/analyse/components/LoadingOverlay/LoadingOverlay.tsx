import { memo } from 'react'
import type { LoadingOverlayProps } from '../../types'
import * as styles from './styles.css'

export const LoadingOverlay = memo<LoadingOverlayProps>(
  ({ isLoading, message, progress, error }) => {
    if (!isLoading) return null

    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <div style={styles.spinner} />
          <div style={styles.message}>{message}</div>
          <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }} />
          </div>
          <div style={styles.progressText}>{progress}%</div>
          {error && <div style={styles.error}>{error}</div>}
          <style>{styles.keyframes}</style>
        </div>
      </div>
    )
  }
)

LoadingOverlay.displayName = 'LoadingOverlay'
