import repo from "./schedule-repo";

export async function GET(request) {
  const schedule = await repo.getSchedule();
  return Response.json(schedule);
}

export async function POST(request) {
  const schedule = await request.json();
  const newSchedule = await repo.addSchedule(schedule);
  return Response.json(newSchedule);
}

export async function PUT(request) {
  try {
    const updatedSession = await request.json();
    const response = await repo.updateSession(updatedSession);
    return Response.json(response);
  } catch (error) {
    return Response.json(error);
  }
}
