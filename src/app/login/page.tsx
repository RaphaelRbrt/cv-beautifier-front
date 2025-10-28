'use client'
import React, { useState, useCallback, useTransition } from 'react'
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
        const { data } = await client.mutate<LoginResponse, LoginVariables>({
          mutation: LOGIN,
          variables: { email, password, rememberMe },
        })

        const token = data?.login.token
        if (!token) throw new Error('Missing token')

        dispatch(setToken(token))

        // Use transition for navigation with loading state
        startTransition(() => {
          router.push('/analyse')
        })
      } catch (error) {
        const graphQlMsg = extractErrorMessage(
          error as ApolloErrorLike,
          getErrorMessage('LOGIN_FAILED')
        )

        reportError(graphQlMsg, 'LOGIN_FAILED', {
          email,
          source: 'api',
          operation: 'login',
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
