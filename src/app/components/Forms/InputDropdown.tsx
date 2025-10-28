'use client'
import React from 'react'
import * as s from './styles.css'
import { InputDropdownProps } from '@/types'

export default function InputDropdown({
  label,
  value,
  onChange,
  options,
  name,
  disabled,
  error,
}: InputDropdownProps) {
  return (
    <div className={s.fieldWrapper}>
      {label && <label className={s.label}>{label}</label>}
      <select
        className={`${s.select} ${error ? s.inputError : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}
