'use client'
import React, { useState, useCallback } from 'react'
import { CTAButton } from '@/app/components'
import { useAppSelector } from '@/app/store'
import { useProfileData, useProfilePhoto, useProfileMutations } from './hooks'
import {
  ProfileForm,
  ImportSection,
  ExperienceSection,
  EducationSection,
  LanguageSection,
  DeleteModal,
} from './components'
import type { DeleteTarget, ProfileData, ProfileFormData } from './types'
import * as styles from './styles.css'

export default function Page() {
  const auth = useAppSelector((s) => s.auth)
  const userId = auth.userId ? parseInt(auth.userId, 10) : 1

  // Hooks personnalisés
  const {
    profileId,
    profileData,
    experiences,
    education,
    languages,
    loading: dataLoading,
    setProfileData,
    setExperiences,
    setEducation,
    setLanguages,
    setPhotoPreview,
    refreshProfile,
  } = useProfileData(userId)

  const { handlePhotoChange, uploadPhoto } = useProfilePhoto(setPhotoPreview)

  const {
    loading: mutationLoading,
    success,
    saveProfile,
    importProfile,
    deleteItem,
  } = useProfileMutations()

  // États locaux pour les modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)

  // Handlers optimisés avec useCallback
  const handleProfileChange = useCallback(
    (field: keyof ProfileData, value: string) => {
      setProfileData((prev) => ({ ...prev, [field]: value }))
    },
    [setProfileData]
  )

  const handleSave = useCallback(async () => {
    const formData: ProfileFormData = {
      fullName: profileData.fullName,
      title: profileData.title,
      summary: profileData.summary,
      skills: profileData.skills,
      gender: profileData.gender,
      tone: profileData.tone,
      linkedinUrl: profileData.linkedinUrl,
      githubUrl: profileData.githubUrl,
      portfolioUrl: profileData.portfolioUrl,
      location: profileData.location,
      availability: profileData.availability,
    }

    await saveProfile(userId, formData, uploadPhoto, profileData.photoPreview)
  }, [userId, profileData, saveProfile, uploadPhoto])

  const handleImport = useCallback(
    async (jsonString: string) => {
      await importProfile(userId, jsonString, refreshProfile)
    },
    [userId, importProfile, refreshProfile]
  )

  const handleDelete = useCallback(async () => {
    if (!deleteTarget || !profileId) return
    await deleteItem(deleteTarget, profileId, setExperiences, setEducation, setLanguages)
    setDeleteModalOpen(false)
    setDeleteTarget(null)
  }, [deleteTarget, profileId, deleteItem, setExperiences, setEducation, setLanguages])

  const handleDeleteRequest = useCallback((target: DeleteTarget) => {
    setDeleteTarget(target)
    setDeleteModalOpen(true)
  }, [])

  // État de chargement
  if (dataLoading) {
    return (
      <div className={styles.pageContainer}>
        <main className={styles.container}>
          <h1 className={styles.title}>Chargement...</h1>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <main className={styles.container}>
        <ImportSection onImport={handleImport} disabled={mutationLoading} />

        {success && <div className={styles.successAlert}></div>}

        <ProfileForm
          profileData={profileData}
          onChange={handleProfileChange}
          onPhotoChange={handlePhotoChange}
          disabled={mutationLoading}
        />

        <div className={styles.saveButtonWrapper}>
          <CTAButton
            disabled={mutationLoading}
            onClick={() => {
              void handleSave()
            }}
            type="button"
          >
            {mutationLoading ? 'Enregistrement...' : 'Enregistrer'}
          </CTAButton>
        </div>

        {profileId && (
          <>
            <ExperienceSection
              profileId={profileId}
              experiences={experiences}
              setExperiences={setExperiences}
              onDelete={handleDeleteRequest}
            />

            <EducationSection
              profileId={profileId}
              education={education}
              setEducation={setEducation}
              onDelete={handleDeleteRequest}
            />

            <LanguageSection
              profileId={profileId}
              languages={languages}
              setLanguages={setLanguages}
              onDelete={handleDeleteRequest}
            />

            <DeleteModal
              isOpen={deleteModalOpen}
              deleteTarget={deleteTarget}
              onClose={() => {
                setDeleteModalOpen(false)
                setDeleteTarget(null)
              }}
              onConfirm={handleDelete}
            />
          </>
        )}
      </main>
    </div>
  )
}
