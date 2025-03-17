"use client"

import { SessionProvider } from "next-auth/react"

export default function NextSessionProvider({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}