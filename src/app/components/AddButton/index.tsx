'use client'
import React from 'react'
import * as s from './styles.css'

export interface AddButtonProps {
  label: string
  onClick: () => void
}

export default function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <button className={s.addButton} onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <span>{label}</span>
    </button>
  )
}
