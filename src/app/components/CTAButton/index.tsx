'use client'
import React from 'react'
import * as s from './styles.css'

export interface CTAButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
}

export default function CTAButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'primary',
}: CTAButtonProps) {
  const className = variant === 'primary' ? s.ctaButton : s.ctaButtonSecondary

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
