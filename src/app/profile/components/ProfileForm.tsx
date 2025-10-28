import React from 'react'
import { InputText, PhotoUpload } from '@/app/components'
import type { ProfileData } from '../types'
import * as styles from '../styles.css'

interface ProfileFormProps {
  profileData: ProfileData
  onChange: (field: keyof ProfileData, value: string) => void
  onPhotoChange: (file: File | null) => void
  disabled?: boolean
}

export function ProfileForm({
  profileData,
  onChange,
  onPhotoChange,
  disabled = false,
}: ProfileFormProps) {
  return (
    <div className={styles.twoColumnLayout}>
      {/* Colonne de gauche */}
      <div className={styles.leftColumn}>
        <InputText
          label="Nom complet *"
          value={profileData.fullName}
          onChange={(val) => onChange('fullName', val)}
          placeholder="Nom complet"
          disabled={disabled}
        />

        <InputText
          label="Titre"
          value={profileData.title}
          onChange={(val) => onChange('title', val)}
          placeholder="Ex: Développeur Full Stack"
          disabled={disabled}
        />

        <div className={styles.formGroup}>
          <label className={styles.label}>Résumé</label>
          <textarea
            value={profileData.summary}
            onChange={(e) => onChange('summary', e.target.value)}
            placeholder="Présentez-vous en quelques lignes"
            className={styles.textarea}
            disabled={disabled}
          />
        </div>

        <InputText
          label="LinkedIn"
          value={profileData.linkedinUrl}
          onChange={(val) => onChange('linkedinUrl', val)}
          placeholder="https://www.linkedin.com/in/..."
          disabled={disabled}
        />

        <InputText
          label="GitHub"
          value={profileData.githubUrl}
          onChange={(val) => onChange('githubUrl', val)}
          placeholder="https://github.com/username"
          disabled={disabled}
        />

        <InputText
          label="Portfolio"
          value={profileData.portfolioUrl}
          onChange={(val) => onChange('portfolioUrl', val)}
          placeholder="https://portfolio.example.com"
          disabled={disabled}
        />

        <InputText
          label="Localisation"
          value={profileData.location}
          onChange={(val) => onChange('location', val)}
          placeholder="Ville, Pays"
          disabled={disabled}
        />

        <InputText
          label="Disponibilité"
          value={profileData.availability}
          onChange={(val) => onChange('availability', val)}
          placeholder="Disponible, En recherche, etc."
          disabled={disabled}
        />

        <InputText
          label="Tonalité"
          value={profileData.tone}
          onChange={(val) => onChange('tone', val)}
          placeholder="Professionnel, décontracté, etc."
          disabled={disabled}
        />
      </div>

      {/* Colonne de droite */}
      <div className={styles.rightColumn}>
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Photo de profil</label>
          <PhotoUpload
            photoPreview={profileData.photoPreview}
            onPhotoChange={onPhotoChange}
            disabled={disabled}
          />
        </div>

        <div className={styles.fieldWrapper}>
          <InputText
            label="Genre"
            value={profileData.gender}
            onChange={(val) => onChange('gender', val)}
            placeholder="Genre"
            disabled={disabled}
          />
          <p className={styles.genderHelpText}>
            <strong>Pourquoi ces informations ?</strong>
            <br />
            L'intelligence artificielle utilise cette information pour adapter le langage de ton CV
            et éviter les biais de genre dans la rédaction.
          </p>
        </div>

        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Compétences (séparées par une virgule)</label>
          <textarea
            value={profileData.skills}
            onChange={(e) => onChange('skills', e.target.value)}
            placeholder="React, TypeScript, Node.js, etc."
            className={styles.skillsTextarea}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}
