'use client'
import React from 'react'
import * as s from './styles.css'
import { InputTextProps } from '@/types'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { clearErrorsByField } from '@/app/store/errorsSlice'

export default function InputText({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
  disabled,
  autoComplete,
  error,
  maxLength,
}: InputTextProps) {
  const dispatch = useAppDispatch()
  const fieldKey = (name || label || placeholder || '').toString()
  const errors = useAppSelector((sx) => sx.errors.list)
  const hasReduxError = errors.some((e) => e.meta?.field === fieldKey)
  return (
    <div className={s.fieldWrapper}>
      {label && <label className={s.label}>{label}</label>}
      <input
        className={`${s.inputBase} ${error || hasReduxError ? s.inputError : ''}`}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          dispatch(clearErrorsByField(fieldKey))
        }}
        placeholder={placeholder}
        type={type}
        name={name}
        disabled={disabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
      {(error || hasReduxError) && <span className={s.errorText}>{error}</span>}
    </div>
  )
}
