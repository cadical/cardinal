"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ClinicianHeader() {
  const [clinician, setClinician] = useState<any>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/clinician/profile")
        const data = await response.json()
        setClinician(data)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      }
    }
    fetchProfile()
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
      setIsDark(false)
      localStorage.setItem("theme", "light")
    } else {
      html.classList.add("dark")
      setIsDark(true)
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <header className="border-b border-border bg-card px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">Welcome back!</h2>
        <p className="text-sm text-muted-foreground">
          {clinician?.firstName} {clinician?.lastName}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {clinician?.firstName?.[0]}
              {clinician?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">
              {clinician?.firstName} {clinician?.lastName}
            </p>
            <p className="text-muted-foreground text-xs">{clinician?.specialization}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
