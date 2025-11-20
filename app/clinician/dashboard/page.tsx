"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Briefcase } from "lucide-react"

export default function ClinicianDashboard() {
  const [clinician, setClinician] = useState<any>(null)
  const [opportunities, setOpportunities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch("/api/clinician/profile")
        const profileData = await profileRes.json()
        setClinician(profileData)

        const oppRes = await fetch("/api/opportunities")
        const oppData = await oppRes.json()
        setOpportunities(oppData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your professional dashboard</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {clinician?.verified ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Verification Status
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  Verification Status
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">{clinician?.verified ? "Verified" : "Pending"}</p>
            <p className="text-xs text-muted-foreground">
              {clinician?.verified ? "You are verified and can accept opportunities" : "Awaiting admin verification"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">{clinician?.isAvailable ? "Available" : "Unavailable"}</p>
            <p className="text-xs text-muted-foreground">Clients can see your profile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">{opportunities.length}</p>
            <p className="text-xs text-muted-foreground">Available positions matching your profile</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          {opportunities.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No opportunities available at the moment</p>
          ) : (
            <div className="space-y-4">
              {opportunities.slice(0, 5).map((opp: any) => (
                <div key={opp.id} className="flex justify-between items-start border-b pb-4 last:border-0">
                  <div>
                    <h3 className="font-medium">{opp.title}</h3>
                    <p className="text-sm text-muted-foreground">{opp.description}</p>
                  </div>
                  <Badge>{opp.type}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
