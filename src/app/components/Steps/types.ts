import React from 'react'

export interface StepProps {
  isActive: boolean
  onNext: (data?: unknown) => void
  onPrev: () => void
  onReset?: () => void
  context?: Record<string, unknown>
}

export interface StepConfig {
  id: string
  title: string
  render: (props: StepProps) => React.ReactNode
}
