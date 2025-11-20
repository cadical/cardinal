"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ClinicianSidebar } from "@/components/clinician/sidebar"
import { ClinicianHeader } from "@/components/clinician/header"

export default function ClinicianLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const session = await response.json()

        if (!session || session.user?.role !== "CLINICIAN") {
          router.push("/auth/login")
        } else {
          setIsAuthorized(true)
        }
      } catch (error) {
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <ClinicianSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClinicianHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
