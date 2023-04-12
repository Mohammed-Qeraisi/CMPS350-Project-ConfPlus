import repo from "../users-repo";

export async function GET(request, { params }) {
  const { role } = params;
  const users = await repo.getUsersByRole(role);
  return Response.json(users);
}
