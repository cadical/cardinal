import prisma from "@/lib/prisma";

// GET single institution
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const institution = await prisma.institution.findUnique({
    where: { id: params.id },
    include: { documents: true },
  });

  return Response.json(institution);
}

// UPDATE institution
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await prisma.institution.update({
    where: { id: params.id },
    data: body,
  });

  return Response.json(updated);
}

// DELETE institution
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.institution.delete({
    where: { id: params.id },
  });

  return Response.json({ message: "Deleted successfully" });
}