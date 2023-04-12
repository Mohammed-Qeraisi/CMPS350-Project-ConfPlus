import repo from "./papers-repo"

export async function GET(request) {
  const papers = await repo.getPapers();

  return Response.json(papers);
}