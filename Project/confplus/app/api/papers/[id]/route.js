import repo from "../papers-repo";

export async function GET(request, { params }) {
  const { id } = params;
  const paper = await repo.getPaperByID(id);
  return Response.json(paper);
}