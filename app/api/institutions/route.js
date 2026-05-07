let institutions = [];

export async function GET() {
  return Response.json(institutions);
}

export async function POST(req) {
  const body = await req.json();

  const newInstitution = {
    id: crypto.randomUUID(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  institutions.push(newInstitution);

  return Response.json(newInstitution, { status: 201 });
}