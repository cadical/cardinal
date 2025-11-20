import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const opportunity = await prisma.opportunity.findUnique({
      where: { id },
    })

    if (!opportunity) {
      return NextResponse.json({ error: "Opportunity not found" }, { status: 404 })
    }

    return NextResponse.json(opportunity)
  } catch (error) {
    console.error("GET /api/opportunities/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()

    const opportunity = await prisma.opportunity.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        company: body.company,
        location: body.location,
        type: body.type,
        specialization: body.specialization,
        yearsRequired: body.yearsRequired,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(opportunity)
  } catch (error) {
    console.error("PUT /api/opportunities/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    await prisma.opportunity.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Opportunity deleted successfully" })
  } catch (error) {
    console.error("DELETE /api/opportunities/[id] error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
