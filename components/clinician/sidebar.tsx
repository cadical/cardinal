"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Briefcase, LogOut, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ClinicianSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", href: "/clinician/dashboard", icon: Home },
    { name: "My Profile", href: "/clinician/profile", icon: User },
    { name: "Opportunities", href: "/clinician/opportunities", icon: Briefcase },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">C</span>
          </div>
          <span className="font-bold text-lg">Cadical</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-border">
        <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
          <Link href="/api/auth/signout">
            <LogOut size={18} />
            Logout
          </Link>
        </Button>
      </div>
    </aside>
  )
}
