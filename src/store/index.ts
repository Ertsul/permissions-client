import { Store, configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

const store: Store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
