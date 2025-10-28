'use client'
import React from 'react'
import * as s from './styles.css'

export interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  name?: string
}

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  name,
}: CheckboxProps) {
  return (
    <label className={s.checkboxLabel}>
      <input
        type="checkbox"
        className={s.checkboxInput}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
      <span className={s.checkboxCustom}>
        {checked && (
          <svg
            className={s.checkboxIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className={s.checkboxText}>{label}</span>
    </label>
  )
}
