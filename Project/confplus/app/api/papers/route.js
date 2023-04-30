import repo from "./papers-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const ReviewerID = searchParams.get("ReviewerID");
  const acceptedPapers = searchParams.get('AcceptedPapers');
  const papers = await repo.getPapers(ReviewerID, acceptedPapers);

  return Response.json(papers);
}

export async function POST(request) {
  const paper = await request.json();
  const newPaper = await repo.addPaper(paper);
  return Response.json(newPaper);
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
