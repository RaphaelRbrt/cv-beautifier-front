import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { client } from '@/app/lib/apollo'
import {
  ME,
  GET_PROFILE,
  REFRESH_TOKEN,
  USER_EDUCATION,
  USER_EXPERIENCES,
  USER_LANGUAGES,
  CREATE_DOWNLOAD_URL,
} from '@/graphql'
import { MeQuery, GetProfileQuery, Experience, Education, LanguageSkill } from '@/types'
import {
  useReportError,
  useAppDispatch,
  setToken,
  type ApolloErrorLike,
  extractErrorMessage,
} from '@/app/store'
import { getErrorMessage } from '@/errors'
import type { ProfileData, UseProfileDataReturn } from '../types'

export function useProfileData(userId: number): UseProfileDataReturn {
  const router = useRouter()
  const reportError = useReportError()
  const dispatch = useAppDispatch()

  const [profileId, setProfileId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<ProfileData>({
    email: '',
    fullName: '',
    title: '',
    summary: '',
    skills: '',
    gender: '',
    tone: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    location: '',
    availability: '',
    photoPreview: '',
  })

  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [languages, setLanguages] = useState<LanguageSkill[]>([])

  const setPhotoPreview = useCallback((url: string) => {
    setProfileData((prev) => ({ ...prev, photoPreview: url }))
  }, [])

  const loadRelatedData = useCallback(
    async (pid: number): Promise<void> => {
      try {
        const [expRes, eduRes, langRes] = await Promise.all([
          client.query<{ userExperiences: Experience[] }>({
            query: USER_EXPERIENCES,
            variables: { profileId: pid },
            fetchPolicy: 'no-cache',
          }),
          client.query<{ userEducation: Education[] }>({
            query: USER_EDUCATION,
            variables: { profileId: pid },
            fetchPolicy: 'no-cache',
          }),
          client.query<{ userLanguages: LanguageSkill[] }>({
            query: USER_LANGUAGES,
            variables: { profileId: pid },
            fetchPolicy: 'no-cache',
          }),
        ])
        setExperiences(expRes.data?.userExperiences ?? [])
        setEducation(eduRes.data?.userEducation ?? [])
        setLanguages(langRes.data?.userLanguages ?? [])
      } catch (error) {
        reportError(
          extractErrorMessage(error as ApolloErrorLike, 'Erreur chargement données'),
          'PROFILE_DATA_LOAD_FAILED'
        )
      }
    },
    [reportError]
  )

  const refreshProfile = useCallback(async (): Promise<void> => {
    try {
      // Vérifier l'authentification
      const { data: meData } = await client.query<MeQuery>({
        query: ME,
        fetchPolicy: 'no-cache',
      })
      let userEmail = meData?.me

      if (!userEmail) {
        // Tentative de refresh token
        try {
          const res = await client.mutate<{ refreshToken: { token: string } }>({
            mutation: REFRESH_TOKEN,
            context: { skipAuth: true },
          })
          const newToken = res.data?.refreshToken?.token
          if (newToken) {
            dispatch(setToken(newToken))
            const retry = await client.query<MeQuery>({ query: ME, fetchPolicy: 'no-cache' })
            userEmail = retry.data?.me
          }
        } catch {
          // Ignore
        }

        if (!userEmail) {
          setLoading(false)
          router.replace('/login')
          return
        }
      }

      setProfileData((prev) => ({ ...prev, email: userEmail || '' }))

      // Charger le profil
      const { data: profileData } = await client.query<GetProfileQuery>({
        query: GET_PROFILE,
        variables: { userId },
        fetchPolicy: 'no-cache',
      })

      if (profileData?.userProfile) {
        const profile = profileData.userProfile
        setProfileId(profile.id ?? null)

        setProfileData((prev) => ({
          ...prev,
          fullName: profile.fullName || '',
          title: profile.title || '',
          summary: profile.summary || '',
          skills: profile.skills?.join(', ') || '',
          gender: profile.gender || '',
          tone: profile.tone || '',
          linkedinUrl: profile.linkedinUrl || '',
          githubUrl: profile.githubUrl || '',
          portfolioUrl: profile.portfolioUrl || '',
          location: profile.location || '',
          availability: profile.availability || '',
        }))

        // Charger la photo
        if (profile.profilePhotoUrl) {
          try {
            const res = await client.mutate<{ createDownloadUrl: string }>({
              mutation: CREATE_DOWNLOAD_URL,
              variables: { key: profile.profilePhotoUrl, expiresSeconds: 60 * 60 * 24 * 7 },
            })
            const url = res.data?.createDownloadUrl || ''
            setPhotoPreview('https://raphaelrbr.com' + url)
          } catch {
            setPhotoPreview('')
          }
        }

        // Charger les données associées
        if (profile.id) {
          await loadRelatedData(profile.id)
        }
      }

      setLoading(false)
    } catch {
      reportError(getErrorMessage('PROFILE_LOAD_FAILED'), 'PROFILE_LOAD_FAILED')
      setLoading(false)
    }
  }, [userId, dispatch, router, reportError, setPhotoPreview, loadRelatedData])

  useEffect(() => {
    void refreshProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    profileId,
    profileData,
    experiences,
    education,
    languages,
    loading,
    setProfileData,
    setExperiences,
    setEducation,
    setLanguages,
    setPhotoPreview,
    setProfileId,
    refreshProfile,
  }
}
