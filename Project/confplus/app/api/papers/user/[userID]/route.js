import repo from "../../papers-repo";

export async function GET(request, { params }) {
    try {
        const { userID } = params;
        const papers = await repo.getPapersByUserID(userID);
        return Response.json(papers);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}