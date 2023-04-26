import repo from "./papers-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const ReviewerID = searchParams.get("ReviewerID");

  const papers = await repo.getPapers(ReviewerID);

  return Response.json(papers);
}

export async function POST(request) {
  const paper = await request.json();
  const newPaper = await repo.addPaper(paper);
  return Response.json(newPaper);
}