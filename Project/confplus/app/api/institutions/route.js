import repo from "./institutions-repo";

export async function GET(request) {
    try {
        const institutions = await repo.getInstitutions();
        return Response.json(institutions);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
