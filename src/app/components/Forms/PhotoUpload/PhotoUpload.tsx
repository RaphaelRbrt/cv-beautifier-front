'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import * as s from './styles.css'
import { CTAButton } from '@/app/components'
import type { PhotoUploadProps } from './types'
import { PHOTO_VALIDATION } from './types'

export default function PhotoUpload({
  photoPreview,
  onPhotoChange,
  disabled = false,
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0] ?? null
    if (file) {
      if (!PHOTO_VALIDATION.validTypes.includes(file.type)) {
        setError('Format non accepté. Veuillez utiliser JPG, PNG ou GIF.')
        return
      }

      if (file.size > PHOTO_VALIDATION.maxSize) {
        setError('Fichier trop volumineux. Taille maximale : 5MB.')
        return
      }

      onPhotoChange(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={s.photoUploadContainer}>
      <div className={s.topRow}>
        <div className={s.uploadCircle}>
          {photoPreview ? (
            <Image
              src={photoPreview}
              alt="Photo de profil"
              className={s.photoPreview}
              width={200}
              height={200}
              unoptimized
            />
          ) : (
            <svg
              className={s.uploadIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileSelect}
          className={s.hiddenInput}
          disabled={disabled}
        />
        <CTAButton onClick={handleButtonClick} disabled={disabled}>
          Ajouter
        </CTAButton>
      </div>
      {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
      <p className={s.helpText}>
        Formats acceptés : JPG, PNG, GIF. Taille maximale : 5MB{' '}
        <span className={s.required}>*Obligatoire</span>
      </p>
    </div>
  )
}
