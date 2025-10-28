import React from 'react'
import { Modal } from '@/app/components'
import type { DeleteTarget } from '../types'

interface DeleteModalProps {
  isOpen: boolean
  deleteTarget: DeleteTarget | null
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteModal({ isOpen, deleteTarget, onClose, onConfirm }: DeleteModalProps) {
  return (
    <Modal
      variant="delete"
      isOpen={isOpen}
      title="Confirmer la suppression"
      message={`Êtes-vous sûr de vouloir supprimer ${deleteTarget?.name} ? Cette action est irréversible.`}
      confirmLabel="Supprimer"
      cancelLabel="Annuler"
      icon={
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      }
      onClose={onClose}
      onConfirm={onConfirm}
    />
  )
}
