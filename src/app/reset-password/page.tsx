'use client'
import React, { useState, useMemo, useCallback, useTransition } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { RESET_PASSWORD } from '@/graphql'
import { ResetPasswordResponse, ResetPasswordVariables } from '@/types'
import * as s from '@/app/login/styles.css'
import { passwordMinLength, passwordComplex, equalsTo } from '@/validation'
import { client } from '@/lib'
import { useAppDispatch, addError } from '@/app/store'
import { InputText, SubmitButton } from '@/app/components'
import { getErrorMessage } from '@/errors'

export default function Page() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const token = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const disabled = useMemo(() => !token || submitting || isPending, [token, submitting, isPending])

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (submitting || isPending) return

      const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

      if (!token) {
        dispatch(
          addError({
            id: generateId(),
            message: 'Lien invalide: token manquant',
            code: 'RESET_TOKEN_MISSING',
          })
        )
        return
      }

      let hasError = false
      if (!passwordMinLength(password, 8)) {
        dispatch(
          addError({
            id: generateId(),
            message: getErrorMessage('RESET_PASSWORD_MIN', { min: 8 }),
            code: 'RESET_PASSWORD_MIN',
            meta: { field: 'password' },
          })
        )
        hasError = true
      }
      if (!passwordComplex(password)) {
        dispatch(
          addError({
            id: generateId(),
            message: getErrorMessage('RESET_PASSWORD_COMPLEXITY'),
            code: 'RESET_PASSWORD_COMPLEXITY',
            meta: { field: 'password' },
          })
        )
        hasError = true
      }
      if (!equalsTo(password, confirm)) {
        dispatch(
          addError({
            id: generateId(),
            message: getErrorMessage('PASSWORD_MISMATCH'),
            code: 'PASSWORD_MISMATCH',
            meta: { field: 'confirmPassword' },
          })
        )
        hasError = true
      }
      if (password.length > 72) {
        dispatch(
          addError({
            id: generateId(),
            message: getErrorMessage('RESET_PASSWORD_PASSWORD_TOO_LONG'),
            code: 'RESET_PASSWORD_PASSWORD_TOO_LONG',
            meta: { field: 'password' },
          })
        )
        hasError = true
      }
      if (hasError) return

      try {
        setSubmitting(true)
        const { data } = await client.mutate<ResetPasswordResponse, ResetPasswordVariables>({
          mutation: RESET_PASSWORD,
          variables: { token, new: password },
        })

        if (!data?.resetPassword) {
          throw new Error('Réinitialisation non confirmée')
        }

        // Navigate to login with success param
        startTransition(() => {
          router.push('/login?reset=success')
        })
      } catch (err: unknown) {
        const error = err as {
          graphQLErrors?: Array<{ message: string }>
          networkError?: { result?: { errors?: Array<{ message: string }> } }
          message?: string
        }

        const apiMessage =
          error?.graphQLErrors?.[0]?.message ||
          error?.networkError?.result?.errors?.[0]?.message ||
          error?.message ||
          getErrorMessage('RESET_PASSWORD_FAILED')

        dispatch(
          addError({
            id: `${Date.now()}-reset`,
            message: apiMessage,
            code: 'RESET_PASSWORD_FAILED',
            meta: { source: 'api', operation: 'resetPassword' },
          })
        )
      } finally {
        setSubmitting(false)
      }
    },
    [token, password, confirm, submitting, isPending, dispatch, router]
  )

  return (
    <div className={s.rightPanel}>
      <div className={s.formCard}>
        <h1 className={s.title}>Réinitialiser le mot de passe</h1>
        <form
          className={s.form}
          onSubmit={(e) => {
            void submit(e)
          }}
        >
          <InputText
            name="password"
            value={password}
            onChange={setPassword}
            placeholder="Nouveau mot de passe"
            type="password"
            autoComplete="new-password"
            label="Nouveau mot de passe"
            disabled={submitting || isPending}
          />
          <InputText
            name="confirm"
            value={confirm}
            onChange={setConfirm}
            placeholder="Confirmez le mot de passe"
            type="password"
            autoComplete="new-password"
            label="Confirmation"
            disabled={submitting || isPending}
          />
          <SubmitButton disabled={disabled}>
            {submitting ? 'Envoi...' : isPending ? 'Redirection...' : 'Mettre à jour'}
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}
