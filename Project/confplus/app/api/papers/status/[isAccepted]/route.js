import repo from "../../papers-repo";

export async function GET(request, { params }) {
    try {
        const { isAccepted } = params;
        const papers = await repo.getPapersByStatus(isAccepted);
        return Response.json(papers);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
