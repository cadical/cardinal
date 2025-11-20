"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit2, Save, X } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [clinician, setClinician] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/clinician/profile")
        const data = await response.json()
        setClinician(data)
        setFormData(data)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      }
    }

    fetchProfile()
  }, [])

  const handleSave = async () => {
    try {
      const response = await fetch("/api/clinician/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updated = await response.json()
        setClinician(updated)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  if (!clinician) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Professional Profile</h1>
          <p className="text-muted-foreground">Manage your professional information and availability</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit2 size={20} />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {clinician.firstName?.[0]}
                {clinician.lastName?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold">
                {clinician.firstName} {clinician.lastName}
              </h2>
              <p className="text-lg text-primary font-medium">{clinician.specialization}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant={clinician.verified ? "default" : "secondary"}>
                  {clinician.verified ? "✓ Verified" : "Pending Verification"}
                </Badge>
                <Badge variant={clinician.isAvailable ? "default" : "secondary"}>
                  {clinician.isAvailable ? "Available for Hire" : "Unavailable"}
                </Badge>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save size={20} />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-2">
                  <X size={20} />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              {isEditing ? (
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              ) : (
                <p className="text-foreground">{clinician.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              {isEditing ? (
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              ) : (
                <p className="text-foreground">{clinician.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Specialization</label>
              {isEditing ? (
                <Input
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                />
              ) : (
                <p className="text-foreground">{clinician.specialization}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">License Number</label>
              {isEditing ? (
                <Input
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  disabled
                />
              ) : (
                <p className="text-foreground">{clinician.licenseNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Years of Experience</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number.parseInt(e.target.value) })}
                />
              ) : (
                <p className="text-foreground">{clinician.yearsOfExperience} years</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Professional Bio</label>
            {isEditing ? (
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            ) : (
              <p className="text-foreground">{clinician.bio || "No bio added yet"}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <p className="text-foreground">{clinician.email}</p>
            <p className="text-xs text-muted-foreground">Contact email cannot be changed</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
