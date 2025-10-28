import React from 'react'
import * as s from './styles.css'
import type { StepProps } from '../types'

export default function Step({ isActive, children }: StepProps & { children?: React.ReactNode }) {
  return <div className={isActive ? s.step : s.hidden}>{children}</div>
}
