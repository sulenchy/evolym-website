"use client"

import type React from "react"
import { useRef } from "react"
import { persistStore } from 'redux-persist'
import { Provider } from "react-redux"
import { makeStore, AppStore } from "@/lib/store"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(undefined)
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      
      storeRef.current = makeStore()
    }
  const persistor = persistStore(storeRef.current)
  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={<Skeleton className="h-full w-full" />} persistor={persistor}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  )
}
