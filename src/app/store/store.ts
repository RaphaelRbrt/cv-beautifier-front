import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit'
import errorsReducer from './errorsSlice'
import authReducer from './authSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Slice minimal pour garantir un reducer valide
const appSlice = createSlice({
  name: 'app',
  initialState: { initialized: true },
  reducers: {},
})

const rootReducer = combineReducers({
  app: appSlice.reducer,
  errors: errorsReducer,
  auth: authReducer,
})

const persistConfig = { key: 'root', storage, whitelist: ['auth'] }
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
