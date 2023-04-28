import repo from "./institutions-repo";

export async function GET(request) {
  const institutions = await repo.getInstitutions();
  return Response.json(institutions);
}
