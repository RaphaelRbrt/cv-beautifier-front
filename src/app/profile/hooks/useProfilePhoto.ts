import { useState, useCallback } from 'react'
import { client } from '@/app/lib/apollo'
import { UPLOAD_PROFILE_PHOTO, UPLOAD_PROFILE_PHOTO_BASE64, CREATE_DOWNLOAD_URL } from '@/graphql'
import { useReportError, type ApolloErrorLike, extractErrorMessage } from '@/app/store'
import type { UseProfilePhotoReturn } from '../types'

export function useProfilePhoto(setPhotoPreview: (url: string) => void): UseProfilePhotoReturn {
  const [photo, setPhoto] = useState<File | null>(null)
  const reportError = useReportError()

  const handlePhotoChange = useCallback(
    (file: File | null) => {
      setPhoto(file)

      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPhotoPreview('')
      }
    },
    [setPhotoPreview]
  )

  const uploadPhoto = useCallback(
    async (userId: number, photoPreview: string): Promise<string> => {
      if (!photo) return photoPreview

      try {
        const uploadRes = await client.mutate({
          mutation: UPLOAD_PROFILE_PHOTO,
          variables: { userId, file: photo },
        })

        if (
          !(uploadRes as { data?: { uploadProfilePhoto?: { id?: number } } })?.data
            ?.uploadProfilePhoto?.id
        ) {
          reportError('UPLOAD_PROFILE_PHOTO sans id retourné', 'UPLOAD_NO_ID')
        }

        const key = (uploadRes as { data?: { uploadProfilePhoto?: { profilePhotoUrl?: string } } })
          ?.data?.uploadProfilePhoto?.profilePhotoUrl

        if (key) {
          try {
            const res = await client.mutate<{ createDownloadUrl: string }>({
              mutation: CREATE_DOWNLOAD_URL,
              variables: { key, expiresSeconds: 60 * 60 * 24 * 7 },
            })
            return res.data?.createDownloadUrl || photoPreview
          } catch {
            return photoPreview
          }
        }
        return photoPreview
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error as ApolloErrorLike,
          'Erreur UPLOAD_PROFILE_PHOTO'
        )
        reportError(errorMessage, 'UPLOAD_PHOTO_FAILED')

        // Fallback base64
        if (photoPreview && typeof photoPreview === 'string' && photoPreview.startsWith('data:')) {
          try {
            const base64Res = await client.mutate({
              mutation: UPLOAD_PROFILE_PHOTO_BASE64,
              variables: {
                userId,
                data: photoPreview,
                filename: photo.name,
                contentType: photo.type || undefined,
              },
            })

            if (
              !(base64Res as { data?: { uploadProfilePhotoBase64?: { id?: number } } })?.data
                ?.uploadProfilePhotoBase64?.id
            ) {
              reportError('UPLOAD_PROFILE_PHOTO_BASE64 sans id retourné', 'UPLOAD_BASE64_NO_ID')
            }

            const key = (
              base64Res as { data?: { uploadProfilePhotoBase64?: { profilePhotoUrl?: string } } }
            )?.data?.uploadProfilePhotoBase64?.profilePhotoUrl

            if (key) {
              try {
                const res = await client.mutate<{ createDownloadUrl: string }>({
                  mutation: CREATE_DOWNLOAD_URL,
                  variables: { key, expiresSeconds: 60 * 60 * 24 * 7 },
                })
                return res.data?.createDownloadUrl || photoPreview
              } catch {
                return photoPreview
              }
            }
          } catch (fallbackError) {
            const errorMessage = extractErrorMessage(
              fallbackError as ApolloErrorLike,
              'Erreur UPLOAD_PROFILE_PHOTO_BASE64'
            )
            reportError(errorMessage, 'UPLOAD_PHOTO_BASE64_FAILED')
            throw fallbackError
          }
        } else {
          throw error
        }
      }
      return photoPreview
    },
    [photo, reportError]
  )

  return {
    photo,
    handlePhotoChange,
    uploadPhoto,
  }
}
