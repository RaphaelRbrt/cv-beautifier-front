'use client'
import React, { useState } from 'react'
import * as s from '@/app/login/styles.css'
import { InputText, SubmitButton } from '@/app/components/Forms'
import {
  useAppDispatch,
  extractErrorMessage,
  generateErrorId,
  addError,
  type ApolloErrorLike,
} from '@/app/store'
import { getErrorMessage } from '@/errors'
import { isRequired, isEmail, trimWhitespace, toLowerCase } from '@/validation'
import { client } from '@/app/lib/apollo'
import { REQUEST_PASSWORD_RESET } from '@/graphql'
import { RequestPasswordResetResponse, RequestPasswordResetVariables } from '@/types'

export default function Page() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (submitting) return

    const normalizedEmail = toLowerCase(trimWhitespace(email))
    let hasError = false
    if (!isRequired(normalizedEmail)) {
      dispatch(
        addError({
          id: generateErrorId(),
          message: getErrorMessage('REQUEST_PASSWORD_RESET_EMAIL_REQUIRED'),
          code: 'REQUEST_PASSWORD_RESET_EMAIL_REQUIRED',
          meta: { field: 'email' },
        })
      )
      hasError = true
    } else if (!isEmail(normalizedEmail)) {
      dispatch(
        addError({
          id: generateErrorId(),
          message: getErrorMessage('REQUEST_PASSWORD_RESET_EMAIL_INVALID'),
          code: 'REQUEST_PASSWORD_RESET_EMAIL_INVALID',
          meta: { field: 'email' },
        })
      )
      hasError = true
    }
    if (hasError) return

    try {
      setSubmitting(true)
      const { data } = await client.mutate<
        RequestPasswordResetResponse,
        RequestPasswordResetVariables
      >({
        mutation: REQUEST_PASSWORD_RESET,
        variables: { email: normalizedEmail },
      })
      if (!data?.requestPasswordReset) {
        // Backend renvoie True quasi systématiquement; on traite le False comme un soft error.
        dispatch(
          addError({
            id: generateErrorId(),
            message: getErrorMessage('REQUEST_PASSWORD_RESET_FAILED'),
            code: 'REQUEST_PASSWORD_RESET_FAILED',
          })
        )
        return
      }
      // Succès: informer l'utilisateur par un toast d'info (utilisons addError pour conserver le système actuel)
      dispatch(
        addError({
          id: generateErrorId(),
          message: 'Si un compte existe, un email a été envoyé.',
          code: 'REQUEST_PASSWORD_RESET_OK',
        })
      )
    } catch (error) {
      const apiMessage = extractErrorMessage(
        error as ApolloErrorLike,
        getErrorMessage('REQUEST_PASSWORD_RESET_FAILED')
      )
      dispatch(
        addError({
          id: generateErrorId(),
          message: apiMessage,
          code: 'REQUEST_PASSWORD_RESET_FAILED',
          meta: { source: 'api', operation: 'requestPasswordReset' },
        })
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={s.rightPanel}>
      <div className={s.formCard}>
        <h1 className={s.title}>Mot de passe oublié</h1>
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
            placeholder="Votre email"
            type="email"
            autoComplete="email"
            label="Email"
          />
          <SubmitButton disabled={submitting}>
            {submitting ? 'Envoi...' : 'Envoyer le lien'}
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}
