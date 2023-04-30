import repo from "./dates-repo"

export async function GET(request) {
  const dates = await repo.getDates();

  return Response.json(dates);
}