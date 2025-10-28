export { store, useAppSelector, useAppDispatch } from './store'
export type { RootState, AppDispatch } from './store'

export { setAuth, setToken, clearToken } from './authSlice'
export { addError, removeError, clearErrors, clearErrorsByField } from './errorsSlice'

export { useReportError, reportErrorDirect } from './reportError'
export { extractErrorMessage, generateErrorId } from './utils'

export type { AppError, ErrorsState, ApolloErrorLike } from './types'
