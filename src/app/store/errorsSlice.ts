import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppError, ErrorsState } from './types'

const initialState: ErrorsState = { list: [] }

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<AppError>) => {
      state.list.unshift(action.payload)
    },
    removeError: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((e) => e.id !== action.payload)
    },
    clearErrorsByField: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((e) => e.meta?.field !== action.payload)
    },
    clearErrors: (state) => {
      state.list = []
    },
  },
})

export const { addError, removeError, clearErrors, clearErrorsByField } = errorsSlice.actions
export default errorsSlice.reducer
