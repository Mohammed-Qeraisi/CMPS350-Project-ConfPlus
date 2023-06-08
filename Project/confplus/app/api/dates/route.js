import repo from "./dates-repo";

export async function GET(request) {
    try {
        const dates = await repo.getDates();
        return Response.json(dates);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
