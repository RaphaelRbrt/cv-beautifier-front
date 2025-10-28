export type FieldSpec = {
  name: string
  label: string
  placeholder?: string
  multiline?: boolean
  asList?: boolean
  type?: 'text' | 'textarea' | 'dropdown'
  options?: { label: string; value: string }[]
}

export type ModalVariant = 'form' | 'confirm' | 'delete'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  variant?: ModalVariant
  title: string
  fields?: FieldSpec[]
  initialData?: Record<string, unknown>
  onSave?: (data: Record<string, unknown>) => Promise<void> | void
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => Promise<void> | void
  icon?: React.ReactNode
}

export type FormData = Record<string, string>
