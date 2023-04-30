import repo from "../schedule-repo";

export async function GET(request, { params }) {
  const { id } = params;
  const session = await repo.getSession(id);
  return Response.json(session);
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    return Response.json(await repo.deleteSession(id));
  } catch (error) {
    return Response.json({ errorMessage: error.name + " | " + error.message });
  }
}