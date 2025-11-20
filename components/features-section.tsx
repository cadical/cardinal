import { CheckCircle2 } from "lucide-react"

const features = [
  "Global collaboration with leading healthcare brands",
  "Expert clinical and economic value delivery",
  "WHO-approved pharmaceutical products",
  "Advanced diagnostic and surgical capabilities",
  "Comprehensive patient care across all specialties",
  "Time-responsive emergency services",
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Why Choose Cadical Solutions</h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border min-h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🌟</div>
              <p className="text-sm text-muted-foreground">Trusted Healthcare Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
