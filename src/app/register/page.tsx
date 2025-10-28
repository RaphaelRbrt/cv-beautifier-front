'use client'
import React, { useState, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { REGISTER } from '@/graphql'
import { RegisterResponse, RegisterVariables, FieldErrors } from '@/types'
import * as s from '@/app/login/styles.css'
import {
  isRequired,
  isEmail,
  hasMinLength,
  hasMaxLength,
  passwordMinLength,
  passwordComplex,
  equalsTo,
  trimWhitespace,
  toLowerCase,
  sanitizeBasic,
} from '@/validation'
import { client } from '@/lib'
import {
  useAppDispatch,
  addError,
  setAuth,
  generateErrorId,
  extractErrorMessage,
  type ApolloErrorLike,
} from '@/app/store'
import { InputText, CTAButton, LinkWithHover } from '@/app/components'
import { getErrorMessage } from '@/errors'

export default function Page() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const maxLenUsername = 50
  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (submitting) return
    const nextErrors: FieldErrors = {}
    const normalizedEmail = toLowerCase(trimWhitespace(email))
    const cleanedUsername = sanitizeBasic(trimWhitespace(username))
    const cleanedPassword = password
    const cleanedConfirm = confirmPassword

    if (!isRequired(normalizedEmail)) nextErrors.email = getErrorMessage('EMAIL_REQUIRED')
    else if (!isEmail(normalizedEmail)) nextErrors.email = getErrorMessage('EMAIL_INVALID')

    if (!isRequired(cleanedPassword)) nextErrors.password = getErrorMessage('PASSWORD_REQUIRED')
    else if (!passwordMinLength(cleanedPassword, 8))
      nextErrors.password = getErrorMessage('PASSWORD_MIN', { min: 8 })
    else if (!passwordComplex(cleanedPassword))
      nextErrors.password = getErrorMessage('PASSWORD_COMPLEXITY')

    if (!equalsTo(cleanedPassword, cleanedConfirm))
      nextErrors.confirmPassword = getErrorMessage('PASSWORD_MISMATCH')

    if (
      cleanedUsername &&
      (!hasMinLength(cleanedUsername, 3) || !hasMaxLength(cleanedUsername, maxLenUsername))
    ) {
      nextErrors.username = getErrorMessage('USERNAME_LENGTH_RANGE', {
        min: 3,
        max: maxLenUsername,
      })
    }

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.email) {
        dispatch(
          addError({
            id: generateErrorId(),
            message: nextErrors.email,
            code: 'EMAIL_INVALID',
            meta: { field: 'email' },
          })
        )
      }
      if (nextErrors.username) {
        dispatch(
          addError({
            id: generateErrorId(),
            message: nextErrors.username,
            code: 'USERNAME_INVALID',
            meta: { field: 'username' },
          })
        )
      }
      if (nextErrors.password) {
        dispatch(
          addError({
            id: generateErrorId(),
            message: nextErrors.password,
            code: 'PASSWORD_INVALID',
            meta: { field: 'password' },
          })
        )
      }
      if (nextErrors.confirmPassword) {
        dispatch(
          addError({
            id: generateErrorId(),
            message: nextErrors.confirmPassword,
            code: 'PASSWORD_MISMATCH',
            meta: { field: 'confirmPassword' },
          })
        )
      }
      return
    }

    try {
      setSubmitting(true)
      if (password.length > 72) {
        dispatch(
          addError({
            id: generateErrorId(),
            message: getErrorMessage('REGISTER_PASSWORD_TOO_LONG'),
            code: 'REGISTER_PASSWORD_TOO_LONG',
          })
        )
        setSubmitting(false)
        return
      }
      const { data } = await client.mutate<RegisterResponse, RegisterVariables>({
        mutation: REGISTER,
        variables: { email: normalizedEmail, password: cleanedPassword },
      })
      const token = data?.register.token
      if (!token) throw new Error('Missing token')
      const userId = data?.register.userId
      const emailResp = data?.register.email
      dispatch(setAuth({ token, userId: String(userId ?? ''), email: emailResp ?? '' }))
      router.push('/profile')
    } catch (error) {
      const apiMessage = extractErrorMessage(
        error as ApolloErrorLike,
        getErrorMessage('REGISTER_FAILED')
      )
      dispatch(
        addError({
          id: generateErrorId(),
          message: apiMessage,
          code: 'REGISTER_FAILED',
          meta: { email: normalizedEmail, source: 'api', operation: 'register' },
        })
      )
    } finally {
      setSubmitting(false)
    }
  }
  const [isPending, startTransition] = useTransition()

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
        <h1 className={s.title}>Inscription</h1>
        <form
          className={s.form}
          onSubmit={(e) => {
            void submit(e)
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
            disabled={submitting}
          />
          <InputText
            name="username"
            value={username}
            onChange={setUsername}
            placeholder="Nom d'utilisateur (optionnel)"
            type="text"
            autoComplete="username"
            label="Nom d'utilisateur"
            maxLength={50}
            disabled={submitting}
          />
          <InputText
            name="password"
            value={password}
            onChange={setPassword}
            placeholder="Mot de passe"
            type="password"
            autoComplete="new-password"
            label="Mot de passe"
            disabled={submitting}
          />
          <InputText
            name="confirmPassword"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirmez le mot de passe"
            type="password"
            autoComplete="new-password"
            label="Confirmation"
            disabled={submitting}
          />
          <div className={s.buttonGroup}>
            <LinkWithHover href="/login" onClick={handleNavigate('/login')} variant="bold">
              Se connecter
            </LinkWithHover>
            <CTAButton type="submit" disabled={submitting || isPending}>
              {submitting ? 'Envoi...' : isPending ? 'Redirection...' : 'Créer un compte'}
            </CTAButton>
          </div>
        </form>
      </div>
    </div>
  )
}
