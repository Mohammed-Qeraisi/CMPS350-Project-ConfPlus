import repo from "./schedule-repo"

export async function GET(request) {
    const schedule = await repo.getSchedule();
    return Response.json(schedule);
}

export async function POST(request) {
    const schedule = await request.json();
    const newSchedule = await repo.addSchedule(schedule);
    return Response.json(newSchedule);
}