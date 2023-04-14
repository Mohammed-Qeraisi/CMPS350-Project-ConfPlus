import repo from "./dates-repo"

export async function GET(request) {
  const papers = await repo.getDates();

  return Response.json(papers);
}