import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const specialization = searchParams.get("specialization")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const where = {
      isActive: true,
      ...(specialization && { specialization }),
    }

    const opportunities = await prisma.opportunity.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { postedDate: "desc" },
    })

    const total = await prisma.opportunity.count({ where })

    return NextResponse.json({
      data: opportunities,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error("GET /api/opportunities error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { title, description, company, location, type, specialization, yearsRequired, expiryDate } = body

    if (!title || !description || !company || !location || !specialization) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        company,
        location,
        type: type || "Full-time",
        specialization,
        yearsRequired: yearsRequired || 0,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        isActive: true,
      },
    })

    return NextResponse.json(opportunity, { status: 201 })
  } catch (error) {
    console.error("POST /api/opportunities error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
