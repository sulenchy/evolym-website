

"use client"

import { useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Avoid hydration mismatch by not rendering until mounted
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the children when mounted to avoid hydration mismatch
  return <NextThemesProvider {...props}>{mounted ? children : null}</NextThemesProvider>
}
