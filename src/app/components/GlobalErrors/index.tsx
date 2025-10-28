'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { removeError, clearErrors } from '@/app/store/errorsSlice'
import * as s from './styles.css'
import LinkWithHover from '../LinkWithHover'

export default function GlobalErrors() {
  const dispatch = useAppDispatch()
  const errors = useAppSelector((state) => state.errors.list)

  if (!errors.length) return null

  return (
    <div className={s.container}>
      {errors.map((err) => (
        <TimedError key={err.id} id={err.id} onClose={(id) => dispatch(removeError(id))}>
          {err.message}
        </TimedError>
      ))}
      <div className={s.clearButtonWrapper}>
        <LinkWithHover
          href="#"
          onClick={(e) => {
            e.preventDefault()
            dispatch(clearErrors())
          }}
        >
          Tout effacer
        </LinkWithHover>
      </div>
    </div>
  )
}

function TimedError({
  id,
  children,
  onClose,
}: {
  id: string
  children: React.ReactNode
  onClose: (id: string) => void
}) {
  React.useEffect(() => {
    const timeout = setTimeout(() => onClose(id), 5000)
    return () => clearTimeout(timeout)
  }, [id, onClose])

  return (
    <div className={s.errorCard}>
      <button onClick={() => onClose(id)} className={s.closeButton} aria-label="Fermer">
        ×
      </button>
      <div className={s.errorMessage}>{children}</div>
    </div>
  )
}
