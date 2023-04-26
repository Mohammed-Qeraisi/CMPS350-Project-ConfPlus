import repo from "../papers-repo";

export async function GET(request, { params }) {
  const { id } = params;
  const paper = await repo.getPaperByID(id);
  return Response.json(paper);
}

export async function PUT(request) {
  try {
    const updatedPaper = await request.json();
    const response = await repo.updatePaper(updatedPaper);
    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
}
