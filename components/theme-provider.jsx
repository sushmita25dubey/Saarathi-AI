"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({children,...props}) {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!mounted) {
    return children
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}