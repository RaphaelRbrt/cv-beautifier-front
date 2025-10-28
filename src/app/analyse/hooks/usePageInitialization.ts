import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { client } from '@/lib'
import { ME, GET_PROFILE } from '@/graphql'
import { MeQuery, GetProfileQuery } from '@/types'
import { DEFAULT_USER_ID } from '../constants'
import type { UsePageInitializationReturn } from '../types'

export const usePageInitialization = (): UsePageInitializationReturn => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isReady, setIsReady] = useState(false)
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    let isMounted = true

    const initializePage = async () => {
      try {
        const meResult = await client.query<MeQuery>({
          query: ME,
          fetchPolicy: 'network-only',
        })

        if (!meResult.data?.me) {
          startTransition(() => router.push('/login'))
          return
        }

        const userId = DEFAULT_USER_ID
        const profileResult = await client.query<GetProfileQuery>({
          query: GET_PROFILE,
          variables: { userId },
          fetchPolicy: 'cache-first',
        })

        const profile = profileResult?.data?.userProfile
        const isIncomplete = !profile || !profile.fullName || !profile.title

        if (isIncomplete) {
          startTransition(() => router.push('/profile'))
          return
        }

        if (isMounted) {
          setFullName(profile?.fullName || '')
          setIsReady(true)
        }
      } catch (error) {
        console.error('Page initialization failed:', error)
        if (isMounted) {
          startTransition(() => router.push('/login'))
        }
      }
    }

    void initializePage()
    return () => {
      isMounted = false
    }
  }, [router])

  return { isReady, fullName, isPending }
}
