'use client'
import React from 'react'
import * as s from './styles.css'
import { SubmitButtonProps } from '@/types'
import { useAppSelector } from '@/app/store/store'

export default function SubmitButton({
  children,
  disabled,
  onClick,
  type = 'submit',
}: SubmitButtonProps): React.JSX.Element {
  const [state, setState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const errorsCount = useAppSelector((sx) => sx.errors.list.length)
  const errorsRef = React.useRef(errorsCount)
  const beforeRef = React.useRef(errorsCount)

  React.useEffect(() => {
    errorsRef.current = errorsCount
  }, [errorsCount])

  React.useEffect(() => {
    if (state === 'loading' && errorsRef.current > beforeRef.current) {
      setState('error')
      setTimeout(() => setState('idle'), 1250)
    }
  }, [errorsCount, state])

  const handleClick = async (): Promise<void> => {
    if (disabled) return
    setState('loading')
    beforeRef.current = errorsRef.current
    try {
      const before = errorsRef.current
      if (onClick) {
        const result = await onClick()
        if (result === false) {
          setState('error')
          setTimeout(() => setState('idle'), 1250)
          return
        }
      }
      const startedAt = Date.now()
      const timer = setInterval(() => {
        const increased = errorsRef.current > before
        const elapsed = Date.now() - startedAt
        if (increased) {
          clearInterval(timer)
          setState('error')
          setTimeout(() => setState('idle'), 1250)
        } else if (elapsed > 2500) {
          clearInterval(timer)
          setState('success')
          setTimeout(() => setState('idle'), 1250)
        }
      }, 120)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 1250)
    }
  }

  const className = state === 'error' ? `${s.button} ${s.buttonError}` : s.button
  const label =
    state === 'idle'
      ? (children ?? 'SUBMIT')
      : state === 'loading'
        ? ''
        : state === 'success'
          ? '✓'
          : '✕'

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={() => {
        void handleClick()
      }}
      type={type}
    >
      {label}
    </button>
  )
}
