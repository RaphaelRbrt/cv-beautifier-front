import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { client } from '@/app/lib/apollo'
import { ME, GET_PROFILE } from '@/graphql'
import { MeQuery, GetProfileQuery } from '@/types'
import { getUserIdFromToken } from '@/app/lib/jwt'
import type { RootState } from '@/app/store/store'

interface UseAuthReturn {
  isAuthenticated: boolean
  isLoading: boolean
  fullName: string
  userId: number | null
}

export function useAuth(requireProfile: boolean = false): UseAuthReturn {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const checkAuth = async (): Promise<void> => {
      try {
        if (!token) {
          router.push('/login')
          return
        }

        const extractedUserId = getUserIdFromToken(token)
        if (!extractedUserId) {
          router.push('/login')
          return
        }

        const meResult = await client.query<MeQuery>({
          query: ME,
          fetchPolicy: 'network-only',
        })

        if (!meResult.data?.me) {
          router.push('/login')
          return
        }

        if (requireProfile) {
          const profileResult = await client.query<GetProfileQuery>({
            query: GET_PROFILE,
            variables: { userId: extractedUserId },
            fetchPolicy: 'cache-first',
          })

          const profile = profileResult?.data?.userProfile
          const isIncomplete = !profile || !profile.fullName || !profile.title

          if (isIncomplete) {
            router.push('/profile')
            return
          }

          if (isMounted) {
            setFullName(profile?.fullName || '')
          }
        }

        if (isMounted) {
          setIsAuthenticated(true)
          setUserId(extractedUserId)
        }
      } catch {
        if (isMounted) {
          router.push('/login')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void checkAuth()

    return () => {
      isMounted = false
    }
  }, [router, requireProfile, token])

  return { isAuthenticated, isLoading, fullName, userId }
}
