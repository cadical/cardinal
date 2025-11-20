"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Search } from "lucide-react"

const initialClinicians = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    specialization: "Cardiology",
    licenseNumber: "LIC001",
    verified: true,
    available: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    specialization: "Neurology",
    licenseNumber: "LIC002",
    verified: true,
    available: true,
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    specialization: "Orthopedics",
    licenseNumber: "LIC003",
    verified: false,
    available: true,
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    specialization: "Pediatrics",
    licenseNumber: "LIC004",
    verified: true,
    available: false,
  },
]

export default function CliniciansPage() {
  const [clinicians, setClinicians] = useState(initialClinicians)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterVerified, setFilterVerified] = useState<"all" | "verified" | "unverified">("all")

  const filteredClinicians = clinicians.filter((c) => {
    const matchesSearch = `${c.firstName} ${c.lastName} ${c.specialization}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter = filterVerified === "all" || (filterVerified === "verified" ? c.verified : !c.verified)
    return matchesSearch && matchesFilter
  })

  const handleVerify = (id: string) => {
    setClinicians(clinicians.map((c) => (c.id === id ? { ...c, verified: true } : c)))
  }

  const handleReject = (id: string) => {
    setClinicians(clinicians.filter((c) => c.id !== id))
  }

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Clinician Management</h1>
        <p className="text-muted-foreground">Manage and verify healthcare professionals</p>
      </div>

      {/* Filter Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Search clinicians..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "verified", "unverified"] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={filterVerified === filter ? "default" : "outline"}
                  onClick={() => setFilterVerified(filter)}
                  className="capitalize"
                >
                  {filter === "all" ? "All" : filter === "verified" ? "Verified" : "Pending"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClinicians.map((clinician) => (
          <Card key={clinician.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <CardTitle>
                    {clinician.firstName} {clinician.lastName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{clinician.specialization}</p>
                </div>
                <Badge variant={clinician.verified ? "default" : "secondary"}>
                  {clinician.verified ? "Verified" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">License:</span> {clinician.licenseNumber}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {clinician.available ? "Available" : "Unavailable"}
                </p>
              </div>

              {!clinician.verified && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gap-2" onClick={() => handleVerify(clinician.id)}>
                    <CheckCircle2 size={16} />
                    Verify
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1 gap-2"
                    onClick={() => handleReject(clinician.id)}
                  >
                    <XCircle size={16} />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
