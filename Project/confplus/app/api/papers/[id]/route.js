import repo from "../papers-repo";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const paper = await repo.getPaperByID(id);
        return Response.json(paper);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
