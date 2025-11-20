"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit2, Trash2 } from "lucide-react"

const initialServices = [
  {
    id: "svc_1",
    name: "Consultations",
    category: "CONSULTATIONS",
    description: "Expert medical consultations",
    isActive: true,
  },
  {
    id: "svc_2",
    name: "Pharmaceuticals",
    category: "PHARMACEUTICALS",
    description: "Latest drugs and equipment",
    isActive: true,
  },
  {
    id: "svc_3",
    name: "Surgical Equipment",
    category: "SURGICAL_EQUIPMENT",
    description: "Advanced surgical devices",
    isActive: true,
  },
  {
    id: "svc_4",
    name: "Diagnostic Procedures",
    category: "DIAGNOSTICS",
    description: "Radiological investigations",
    isActive: true,
  },
  {
    id: "svc_5",
    name: "Rehabilitative Services",
    category: "REHABILITATION",
    description: "Physical therapy",
    isActive: true,
  },
  {
    id: "svc_6",
    name: "Emergency Services",
    category: "EMERGENCY",
    description: "Quick response services",
    isActive: true,
  },
  { id: "svc_7", name: "Cosmetics", category: "COSMETICS", description: "Cosmetic services", isActive: true },
  { id: "svc_8", name: "Referrals", category: "REFERRALS", description: "Professional referrals", isActive: true },
]

const categories = [
  "CONSULTATIONS",
  "PHARMACEUTICALS",
  "SURGICAL_EQUIPMENT",
  "DIAGNOSTICS",
  "REHABILITATION",
  "EMERGENCY",
  "COSMETICS",
  "REFERRALS",
]

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  })

  const handleAddService = () => {
    setFormData({ name: "", category: "", description: "" })
    setEditingId(null)
    setIsOpen(true)
  }

  const handleEditService = (service: (typeof services)[0]) => {
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
    })
    setEditingId(service.id)
    setIsOpen(true)
  }

  const handleSave = () => {
    if (editingId) {
      setServices(services.map((s) => (s.id === editingId ? { ...s, ...formData } : s)))
    } else {
      setServices([
        ...services,
        {
          id: `svc_${Date.now()}`,
          ...formData,
          isActive: true,
        },
      ])
    }
    setIsOpen(false)
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleToggleStatus = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)))
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Manage healthcare services offered by Cadical Solutions</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddService} className="gap-2">
              <Plus size={20} />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Service Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Consultations"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description"
                  rows={4}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingId ? "Update Service" : "Create Service"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Service Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4 font-medium">{service.name}</td>
                    <td className="px-6 py-4 text-sm">{service.category}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-sm truncate">{service.description}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(service.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                          service.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEditService(service)} className="gap-1">
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(service.id)}
                          className="gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
