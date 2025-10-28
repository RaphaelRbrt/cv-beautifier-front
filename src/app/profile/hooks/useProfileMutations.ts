import { useState, useCallback } from 'react'
import { client } from '@/app/lib/apollo'
import {
  UPSERT_PROFILE,
  GET_PROFILE,
  IMPORT_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_LANGUAGE,
  USER_EXPERIENCES,
  USER_EDUCATION,
  USER_LANGUAGES,
  CREATE_DOWNLOAD_URL,
} from '@/graphql'
import { GetProfileQuery, Experience, Education, LanguageSkill } from '@/types'
import { useReportError, type ApolloErrorLike, extractErrorMessage } from '@/app/store'
import { getErrorMessage } from '@/errors'
import type {
  ProfileFormData,
  ProfileImportData,
  DeleteTarget,
  UseProfileMutationsReturn,
} from '../types'

export function useProfileMutations(): UseProfileMutationsReturn {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const reportError = useReportError()

  const saveProfile = useCallback(
    async (
      userId: number,
      formData: ProfileFormData,
      uploadPhotoFn: (userId: number, photoPreview: string) => Promise<string>,
      photoPreview: string
    ): Promise<void> => {
      setLoading(true)
      setSuccess(false)

      try {
        if (!formData.fullName.trim()) {
          throw new Error('Le nom complet est requis')
        }

        // Upsert profile
        try {
          const upsertRes = await client.mutate({
            mutation: UPSERT_PROFILE,
            variables: {
              userId,
              input: {
                fullName: formData.fullName,
                title: formData.title,
                summary: formData.summary,
                skills: formData.skills
                  .split(',')
                  .map((s) => s.trim())
                  .filter((s) => s),
                gender: formData.gender,
                tone: formData.tone,
                linkedinUrl: formData.linkedinUrl,
                githubUrl: formData.githubUrl,
                portfolioUrl: formData.portfolioUrl,
                location: formData.location,
                availability: formData.availability,
              },
            },
          })

          if (
            !(upsertRes as { data?: { upsertUserProfile?: { id?: number } } })?.data
              ?.upsertUserProfile?.id
          ) {
            reportError('UPSERT_PROFILE sans id retourné', 'UPSERT_NO_ID')
          }
        } catch (error) {
          const errorMessage = extractErrorMessage(
            error as ApolloErrorLike,
            'Erreur UPSERT_PROFILE'
          )
          reportError(errorMessage, 'UPSERT_FAILED')
          throw error
        }

        // Upload photo
        await uploadPhotoFn(userId, photoPreview)

        // Rafraîchir le profil
        try {
          const refreshed = await client.query<GetProfileQuery>({
            query: GET_PROFILE,
            variables: { userId },
            fetchPolicy: 'no-cache',
          })

          const profile = refreshed.data?.userProfile
          if (profile?.profilePhotoUrl) {
            try {
              await client.mutate<{ createDownloadUrl: string }>({
                mutation: CREATE_DOWNLOAD_URL,
                variables: { key: profile.profilePhotoUrl, expiresSeconds: 60 * 60 * 24 * 7 },
              })
              // Le callback sera géré par le composant parent
            } catch {
              // Erreur non bloquante
            }
          }
        } catch {
          // Erreur rafraîchissement profil ignorée
        }

        setSuccess(true)
        setLoading(false)
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error as ApolloErrorLike,
          getErrorMessage('PROFILE_SAVE_FAILED')
        )
        reportError(errorMessage, 'PROFILE_SAVE_FAILED')
        setLoading(false)
      }
    },
    [reportError]
  )

  const importProfile = useCallback(
    async (userId: number, importJson: string, refreshFn: () => Promise<void>): Promise<void> => {
      try {
        let data: ProfileImportData
        try {
          data = JSON.parse(importJson || '{}') as ProfileImportData
        } catch {
          reportError('JSON invalide', 'IMPORT_INVALID_JSON')
          return
        }

        await client.mutate({ mutation: IMPORT_PROFILE, variables: { userId, data } })
        await refreshFn()
      } catch (error) {
        reportError(extractErrorMessage(error as ApolloErrorLike, 'Erreur import'), 'IMPORT_FAILED')
      }
    },
    [reportError]
  )

  const deleteItem = useCallback(
    async (
      deleteTarget: DeleteTarget,
      profileId: number,
      setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>,
      setEducation: React.Dispatch<React.SetStateAction<Education[]>>,
      setLanguages: React.Dispatch<React.SetStateAction<LanguageSkill[]>>
    ): Promise<void> => {
      try {
        switch (deleteTarget.type) {
          case 'experience': {
            await client.mutate({ mutation: DELETE_EXPERIENCE, variables: { id: deleteTarget.id } })
            const expRes = await client.query<{ userExperiences: Experience[] }>({
              query: USER_EXPERIENCES,
              variables: { profileId },
              fetchPolicy: 'no-cache',
            })
            setExperiences(expRes.data?.userExperiences ?? [])
            break
          }
          case 'education': {
            await client.mutate({ mutation: DELETE_EDUCATION, variables: { id: deleteTarget.id } })
            const eduRes = await client.query<{ userEducation: Education[] }>({
              query: USER_EDUCATION,
              variables: { profileId },
              fetchPolicy: 'no-cache',
            })
            setEducation(eduRes.data?.userEducation ?? [])
            break
          }
          case 'language': {
            await client.mutate({ mutation: DELETE_LANGUAGE, variables: { id: deleteTarget.id } })
            const langRes = await client.query<{ userLanguages: LanguageSkill[] }>({
              query: USER_LANGUAGES,
              variables: { profileId },
              fetchPolicy: 'no-cache',
            })
            setLanguages(langRes.data?.userLanguages ?? [])
            break
          }
        }
      } catch (error) {
        reportError(
          extractErrorMessage(error as ApolloErrorLike, 'Erreur suppression'),
          'DELETE_FAILED'
        )
      }
    },
    [reportError]
  )

  return {
    loading,
    success,
    saveProfile,
    importProfile,
    deleteItem,
  }
}
