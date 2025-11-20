"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-lg text-foreground">Cadical</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium hover:text-primary transition">
              Services
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary transition">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link href="#services" className="block text-sm font-medium hover:text-primary py-2">
              Services
            </Link>
            <Link href="#features" className="block text-sm font-medium hover:text-primary py-2">
              About
            </Link>
            <Link href="#contact" className="block text-sm font-medium hover:text-primary py-2">
              Contact
            </Link>
            <div className="pt-3 space-y-2 border-t border-border">
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
