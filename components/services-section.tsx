import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Consultations",
    description: "Expert medical consultations across crucial health departments with international collaboration.",
    icon: "💬",
  },
  {
    title: "Pharmaceuticals",
    description: "Latest WHO-approved drugs and medical equipment with 100% efficacy assurance.",
    icon: "💊",
  },
  {
    title: "Surgical Equipment",
    description: "Advanced surgical devices including computer-assisted and robotically-assisted systems.",
    icon: "⚕️",
  },
  {
    title: "Diagnostics",
    description: "3D radiological imaging and laboratory investigations with precision and sensitivity.",
    icon: "🔬",
  },
  {
    title: "Rehabilitation",
    description: "Physical therapy, occupational therapy, and sports medicine rehabilitation.",
    icon: "🏃",
  },
  {
    title: "Emergency Services",
    description: "Quick response emergency medical services with advanced life support capabilities.",
    icon: "🚑",
  },
  {
    title: "Cosmetics",
    description: "Latest cosmetology and dermatology services with skin care solutions.",
    icon: "✨",
  },
  {
    title: "Referrals",
    description: "Professional referral services connecting you with expert healthcare networks.",
    icon: "🤝",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare solutions tailored to meet your medical needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
