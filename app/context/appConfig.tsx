"use client"

import { createContext, useContext, type ReactNode } from "react"

interface AppConfig {
  appUrl: string
}

const AppConfigContext = createContext<AppConfig | null>(null)

export function AppConfigProvider({
  children,
  appUrl,
}: {
  children: ReactNode
  appUrl: string
}) {
  return (
    <AppConfigContext.Provider value={{ appUrl }}>
      {children}
    </AppConfigContext.Provider>
  )
}

export function useAppConfig() {
  const context = useContext(AppConfigContext)
  if (!context) {
    throw new Error("useAppConfig must be used within an AppConfigProvider")
  }
  return context
}
