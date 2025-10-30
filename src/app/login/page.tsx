'use client'
import React, { useState, useCallback, useTransition } from 'react'
import type { FetchResult } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LOGIN } from '@/graphql'
import * as s from './styles.css'
import { LoginResponse, LoginVariables } from '@/types'
import { client } from '@/lib'
import {
  useAppDispatch,
  useReportError,
  addError,
  setToken,
  extractErrorMessage,
  type ApolloErrorLike,
} from '@/app/store'
import { InputText, CTAButton, Checkbox, LinkWithHover } from '@/app/components'
import { getErrorMessage } from '@/errors'

const MAX_PASSWORD_LENGTH = 72

export default function Page() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const reportError = useReportError()
  const [isPending, startTransition] = useTransition()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation helper
  const validateForm = useCallback(() => {
    const errors: Array<{ message: string; code: string; field: string }> = []

    if (!email) {
      errors.push({
        message: getErrorMessage('EMAIL_REQUIRED'),
        code: 'EMAIL_REQUIRED',
        field: 'email',
      })
    }

    if (!password) {
      errors.push({
        message: getErrorMessage('PASSWORD_REQUIRED'),
        code: 'PASSWORD_REQUIRED',
        field: 'password',
      })
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        dispatch(
          addError({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            message: error.message,
            code: error.code,
            meta: { field: error.field },
          })
        )
      })
      return false
    }

    return true
  }, [email, password, dispatch])

  // Submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (isSubmitting) return

      if (!validateForm()) return

      if (password.length > MAX_PASSWORD_LENGTH) {
        reportError(getErrorMessage('LOGIN_PASSWORD_TOO_LONG'), 'LOGIN_PASSWORD_TOO_LONG')
        return
      }

      setIsSubmitting(true)

      try {
        // Log the request for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('🔐 Login request:', {
            email,
            rememberMe,
            graphqlUri: process.env.NEXT_PUBLIC_GRAPHQL_URI || '/api/graphql',
          })
        }

        const result: FetchResult<LoginResponse> = await client.mutate<
          LoginResponse,
          LoginVariables
        >({
          mutation: LOGIN,
          variables: { email, password, rememberMe },
          errorPolicy: 'all', // Return errors instead of throwing
        })
        const { data, errors } = result

        // Log the response for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('📥 Login response:', { data, errors })
        }

        // Check for GraphQL errors
        if (errors && errors.length > 0) {
          // Use the actual GraphQL error message from backend
          const errorMsg = errors[0]?.message || getErrorMessage('LOGIN_FAILED')

          // Log for debugging
          if (process.env.NODE_ENV === 'development') {
            console.log('📛 GraphQL error detected:', errorMsg)
          }

          // Display the backend error message directly (don't remap with code)
          dispatch(
            addError({
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              message: errorMsg,
              code: 'GRAPHQL_ERROR',
              meta: {
                email,
                source: 'graphql',
                operation: 'login',
                graphqlErrors: errors,
              },
            })
          )
          setIsSubmitting(false)
          return
        }

        // Check for missing data
        if (!data || !data.login) {
          reportError(getErrorMessage('LOGIN_SERVER_ERROR'), 'LOGIN_SERVER_ERROR', {
            email,
            source: 'api',
            operation: 'login',
            issue: 'no_data',
          })
          setIsSubmitting(false)
          return
        }

        // Check for missing token
        const token = data.login.token
        if (!token) {
          reportError(getErrorMessage('LOGIN_TOKEN_MISSING'), 'LOGIN_TOKEN_MISSING', {
            email,
            source: 'api',
            operation: 'login',
            issue: 'missing_token',
            receivedData: data,
          })
          setIsSubmitting(false)
          return
        }

        dispatch(setToken(token))

        // Use transition for navigation with loading state
        startTransition(() => {
          router.push('/analyse')
        })
      } catch (error) {
        // Log the full error for debugging
        if (process.env.NODE_ENV === 'development') {
          console.error('🔴 Login exception:', {
            error,
            type: error instanceof Error ? error.constructor.name : typeof error,
            message: error instanceof Error ? error.message : String(error),
            apolloError: error as ApolloErrorLike,
          })
        }

        const graphQlMsg = extractErrorMessage(
          error as ApolloErrorLike,
          getErrorMessage('LOGIN_FAILED')
        )

        reportError(graphQlMsg, 'LOGIN_FAILED', {
          email,
          source: 'exception',
          operation: 'login',
          error: error instanceof Error ? error.message : 'Unknown error',
          errorType: error instanceof Error ? error.constructor.name : typeof error,
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [email, password, rememberMe, isSubmitting, validateForm, reportError, dispatch, router]
  )

  // Remember me change handler
  const handleRememberMeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked)
  }, [])

  // Handle navigation with loading state
  const handleNavigate = useCallback(
    (path: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      startTransition(() => {
        router.push(path)
      })
    },
    [router]
  )

  return (
    <div className={s.loginContainer}>
      <div className={s.formCard}>
        <h1 className={s.title}>Connexion</h1>
        <form
          className={s.form}
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
        >
          <InputText
            name="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="email"
            autoComplete="email"
            label="Email"
            disabled={isSubmitting}
          />
          <div className={s.passwordWrapper}>
            <InputText
              name="password"
              value={password}
              onChange={setPassword}
              placeholder="Mot de passe"
              type="password"
              autoComplete="current-password"
              label="Mot de passe"
              disabled={isSubmitting}
            />
            <Link
              href="/forgot-password"
              onClick={handleNavigate('/forgot-password')}
              className={s.forgotPasswordLink}
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Checkbox
            label="Se souvenir de moi"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            disabled={isSubmitting}
          />
          <div className={s.buttonGroup}>
            <LinkWithHover href="/register" onClick={handleNavigate('/register')} variant="bold">
              Créer un compte
            </LinkWithHover>
            <CTAButton type="submit" disabled={isSubmitting || isPending}>
              {isSubmitting ? 'Connexion...' : isPending ? 'Redirection...' : 'Se connecter'}
            </CTAButton>
          </div>
        </form>
      </div>
    </div>
  )
}
