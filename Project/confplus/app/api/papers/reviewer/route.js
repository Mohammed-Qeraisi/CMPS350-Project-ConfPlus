import repo from "../papers-repo";

export async function PUT(request) {
    try {
        const updateRating = await request.json();
        const response = await repo.updateRatings(updateRating);
        return Response.json(response);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}