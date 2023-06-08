import repo from "../../papers-repo";

export async function GET(request, { params }) {
    try {
        const { reviewerID } = params;
        const papers = await repo.getPapersByReviewerID(reviewerID);
        return Response.json(papers);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
