"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AdminHeader() {
  const [user, setUser] = useState<any>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/auth/session")
      const session = await response.json()
      setUser(session?.user)
    }
    fetchSession()
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
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{user?.name || "Admin"}</p>
            <p className="text-muted-foreground text-xs">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
