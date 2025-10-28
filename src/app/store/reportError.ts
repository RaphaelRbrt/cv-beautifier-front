import { useCallback } from 'react'
import { useAppDispatch } from './store'
import { addError } from './errorsSlice'
import { generateErrorId } from './utils'

export function useReportError() {
  const dispatch = useAppDispatch()
  return useCallback(
    (message: string, code?: string, meta?: Record<string, unknown>) => {
      const id = generateErrorId()
      dispatch(addError({ id, message, code, meta }))
    },
    [dispatch]
  )
}

export function reportErrorDirect(
  dispatch: ReturnType<typeof useAppDispatch>,
  message: string,
  code?: string,
  meta?: Record<string, unknown>
) {
  const id = generateErrorId()
  dispatch(addError({ id, message, code, meta }))
}
