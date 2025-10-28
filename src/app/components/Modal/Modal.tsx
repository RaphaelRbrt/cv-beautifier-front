'use client'
import React from 'react'
import * as s from './styles.css'
import { InputText, InputDropdown } from '../Forms'
import type { ModalProps, FormData } from './types'
import { valueToString } from './utils'

export default function Modal({
  isOpen,
  onClose,
  variant = 'form',
  title,
  fields = [],
  initialData = {},
  onSave,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  icon,
}: ModalProps): React.JSX.Element | null {
  const [formData, setFormData] = React.useState<FormData>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (isOpen && variant === 'form' && initialData) {
      const data: FormData = {}
      for (const field of fields) {
        const value = initialData[field.name]
        if (field.asList && Array.isArray(value)) {
          data[field.name] = value.map((item) => String(item)).join('\n')
        } else {
          data[field.name] = valueToString(value)
        }
      }
      setFormData(data)
    }
  }, [isOpen, initialData, fields, variant])

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!onSave) return

    setIsSubmitting(true)
    try {
      const payload: Record<string, unknown> = {}
      for (const field of fields) {
        const raw = formData[field.name] ?? ''
        payload[field.name] = field.asList
          ? String(raw)
              .split(/\r?\n/)
              .map((x) => x.trim())
              .filter(Boolean)
          : raw
      }
      await onSave(payload)
      onClose()
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirm = async (): Promise<void> => {
    if (!onConfirm) return

    setIsSubmitting(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Error confirming:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={variant === 'form' ? s.modalForm : s.modalConfirm}
        onClick={(e) => e.stopPropagation()}
      >
        {variant === 'form' ? (
          <>
            <div className={s.header}>
              <h2 className={s.title}>{title}</h2>
              <button className={s.closeButton} onClick={onClose}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                void handleFormSubmit(e)
              }}
              className={s.form}
            >
              <div className={s.fieldsContainer}>
                {fields.map((field) => (
                  <div key={field.name} className={s.fieldGroup}>
                    {field.multiline || field.type === 'textarea' ? (
                      <div>
                        <label className={s.label}>{field.label}</label>
                        <textarea
                          value={formData[field.name] ?? ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          rows={6}
                          className={s.textarea}
                        />
                      </div>
                    ) : field.type === 'dropdown' ? (
                      <InputDropdown
                        label={field.label}
                        value={formData[field.name] ?? ''}
                        onChange={(v) => handleChange(field.name, v)}
                        options={field.options ?? []}
                      />
                    ) : (
                      <InputText
                        label={field.label}
                        value={formData[field.name] ?? ''}
                        onChange={(v) => handleChange(field.name, v)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className={s.actions}>
                <button type="submit" className={s.primaryButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  className={s.secondaryButton}
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className={s.confirmHeader}>
              {icon && <div className={s.iconContainer}>{icon}</div>}
              <h2 className={s.title}>{title}</h2>
              {message && <p className={s.message}>{message}</p>}
            </div>

            <div className={s.actions}>
              <button
                type="button"
                className={s.secondaryButton}
                onClick={onClose}
                disabled={isSubmitting}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className={variant === 'delete' ? s.deleteButton : s.primaryButton}
                onClick={() => {
                  void handleConfirm()
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'En cours...' : confirmLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
