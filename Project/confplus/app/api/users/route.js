import repo from "./users-repo";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const email = searchParams.get("email");
        const password = searchParams.get("password");

        const user = await repo.getUser(email, password);

        return Response.json(user);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
