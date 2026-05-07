let institutions = global.institutions || [];

export async function GET(_, { params }) {
  const item = institutions.find(i => i.id === params.id);
  return Response.json(item || null);
}

export async function PUT(req, { params }) {
  const body = await req.json();

  institutions = institutions.map(i =>
    i.id === params.id ? { ...i, ...body } : i
  );

  return Response.json({ success: true });
}

export async function DELETE(_, { params }) {
  institutions = institutions.filter(i => i.id !== params.id);

  return Response.json({ success: true });
}