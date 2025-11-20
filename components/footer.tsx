import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-bold">Cadical Solutions</span>
            </div>
            <p className="text-sm text-muted-foreground">Health is life, protect yours with us.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Consultations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Pharmaceuticals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Diagnostics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Cadical Solutions Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">
              Twitter
            </Link>
            <Link href="#" className="hover:text-primary">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-primary">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
