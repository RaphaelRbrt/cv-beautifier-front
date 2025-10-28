import { memo } from 'react'
import type { InitialLoaderProps } from '../../types'
import * as styles from './styles.css'
import { LOADING_MESSAGES } from '../../constants'

export const InitialLoader = memo<InitialLoaderProps>(({ message = LOADING_MESSAGES.LOADING }) => (
  <main style={styles.container}>
    <div style={styles.content}>
      <div style={styles.spinner} />
      <div>{message}</div>
      <style>{styles.keyframes}</style>
    </div>
  </main>
))

InitialLoader.displayName = 'InitialLoader'
