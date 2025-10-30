'use client'

import React from 'react'
import * as styles from './styles.css'

interface ContentContainerProps {
  children: React.ReactNode
}

/**
 * ContentContainer - White background container for landing sections
 * Provides a clean, elevated container for main content sections
 */
export const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}
