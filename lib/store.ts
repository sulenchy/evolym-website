import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './features/blog/blogSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      blog: blogReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']