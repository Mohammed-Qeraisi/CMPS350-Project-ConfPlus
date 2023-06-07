import repo from "./locations-repo";

export async function GET(request) {
    try {
        const locations = await repo.getLocations();
        return Response.json(locations);
    } catch (error) {
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
