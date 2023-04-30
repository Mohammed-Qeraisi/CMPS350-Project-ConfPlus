import repo from "./locations-repo"

export async function GET(request) {
  const locations = await repo.getLocations();

  return Response.json(locations);
}