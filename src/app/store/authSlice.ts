import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = { token: string | null; email: string | null; userId: string | null }

const initialState: AuthState = { token: null, email: null, userId: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload ?? null
    },
    setAuth: (state, action: PayloadAction<{ token: string; email: string; userId: string }>) => {
      state.token = action.payload.token
      state.email = action.payload.email
      state.userId = action.payload.userId
    },
    clearToken: (state) => {
      state.token = null
      state.email = null
      state.userId = null
    },
  },
})

export const { setToken, setAuth, clearToken } = authSlice.actions
export default authSlice.reducer
