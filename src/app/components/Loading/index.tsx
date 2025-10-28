'use client'
import React from 'react'
import { styles } from './style.css'

export function Loading({ progress }: { progress?: number }) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.bar}
        style={{ width: `${Math.min(Math.max(progress ?? 0, 0), 100)}%` }}
      />
      <span className={styles.text}>{progress ?? 0}%</span>
    </div>
  )
}
