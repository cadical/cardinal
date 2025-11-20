import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-sm font-medium text-primary">Leading Healthcare Solutions</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                Health is Life, Protect Yours with Us
              </h1>

              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Cadical Solutions Limited delivers comprehensive healthcare services including consultations,
                pharmaceuticals, surgical equipment, diagnostics, and emergency services with global collaboration and
                expertise.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/register">
                  Get Started
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">Learn More</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary">8+</p>
                <p className="text-sm text-muted-foreground">Service Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">Global</p>
                <p className="text-sm text-muted-foreground">Collaborations</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏥</div>
                <p className="text-sm text-muted-foreground">Healthcare Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
