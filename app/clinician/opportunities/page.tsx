"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/opportunities")
        const data = await response.json()
        setOpportunities(data)
        setFilteredOpportunities(data)
      } catch (error) {
        console.error("Failed to fetch opportunities:", error)
      }
    }

    fetchOpportunities()
  }, [])

  useEffect(() => {
    const filtered = opportunities.filter(
      (opp) =>
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredOpportunities(filtered)
  }, [searchTerm, opportunities])

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Job Opportunities</h1>
        <p className="text-muted-foreground">Browse and apply for positions matching your specialization</p>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid gap-6">
        {filteredOpportunities.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No opportunities found</p>
            </CardContent>
          </Card>
        ) : (
          filteredOpportunities.map((opp) => (
            <Card key={opp.id} className="hover:shadow-lg transition">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle>{opp.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{opp.company}</p>
                  </div>
                  <Badge>{opp.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{opp.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{opp.location}</p>
                  </div>
                  <div>
                    <p className="font-medium">Specialization</p>
                    <p className="text-muted-foreground">{opp.specialization}</p>
                  </div>
                  <div>
                    <p className="font-medium">Experience Required</p>
                    <p className="text-muted-foreground">{opp.yearsRequired}+ years</p>
                  </div>
                  <div>
                    <p className="font-medium">Posted</p>
                    <p className="text-muted-foreground">{opp.postedDate}</p>
                  </div>
                </div>
                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
