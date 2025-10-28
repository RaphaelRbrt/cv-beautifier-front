'use client'
import React from 'react'
import InputDropdown from './InputDropdown'

type Props = {
  label?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
  name?: string
}

const STATUS_OPTIONS = [
  { label: 'CDI', value: 'CDI' },
  { label: 'CDD', value: 'CDD' },
  { label: 'Freelance', value: 'Freelance' },
  { label: 'Alternance', value: 'Alternance' },
  { label: 'Stage', value: 'Stage' },
  { label: 'Projet Personelle', value: 'Projet Personelle' },
]

export default function StatusDropdown({
  label = 'Statut',
  value,
  onChange,
  disabled,
  error,
  name,
}: Props) {
  return (
    <InputDropdown
      label={label}
      value={value}
      onChange={onChange}
      options={STATUS_OPTIONS}
      disabled={disabled}
      error={error}
      name={name}
    />
  )
}
