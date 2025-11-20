import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Healthcare</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Join our network of healthcare professionals and clients experiencing excellence in medical services.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Start Today</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
