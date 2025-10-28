'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import GlobalErrors from '@/app/components/GlobalErrors'
import { client } from '@/app/lib/apollo'
import { REFRESH_TOKEN } from '@/graphql'
import { setAuth } from '@/app/store/authSlice'

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        // Only refresh if no token exists
        if (!store.getState().auth.token) {
          const r = await client.mutate<{
            refreshToken: { token: string; userId: number; email: string }
          }>({
            mutation: REFRESH_TOKEN,
            context: { skipAuth: true },
          })

          const payload = r?.data?.refreshToken
          if (payload?.token && payload?.userId && payload?.email) {
            // Store complete auth info for better session management
            store.dispatch(
              setAuth({
                token: payload.token,
                userId: String(payload.userId),
                email: payload.email,
              })
            )
          }
        }
      } catch {
        // Silent fail - user will be redirected to login by protected pages
      }
    }

    void initializeAuth()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalErrors />
        {children}
      </PersistGate>
    </Provider>
  )
}
