import repo from "./schedule-repo"

export async function GET(request, { params }) {
    const { id } = params
    const session = await repo.getSession(id);
    return Response.json(session);
}

export async function POST(request, { params }) {
    try {
        const updatedSession = await request.json();
        const response = await repo.updatedSession(updatedSession);
        return Response.json(response);
    } catch (error) {
        console.log(error);
        return Response.json(error);
    }
}