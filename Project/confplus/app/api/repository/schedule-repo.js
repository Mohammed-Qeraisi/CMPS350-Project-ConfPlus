import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class ScheduleRepo {
    async getSchedule() {
        try {
            return await prisma.schedule.findMany();
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async addSchedule(newSchedule) {
        try {
            await prisma.schedule.create({
                data: newSchedule,
            });
            return {
                successfully: "Schedule has been successfully added.",
            };
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getSession(date) {
        try {
            const session = await prisma.schedule.findUnique({
                where: {
                    date: date,
                },
            });

            if (!session) {
                return `${date}`;
            }
            return session;
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async updateSession(updatedSession) {
        try {
            const existingSession = await prisma.schedule.findUnique({
                where: {
                    sessionID: updatedSession.sessionID,
                },
            });

            if (existingSession) {
                await prisma.schedule.update({
                    where: {
                        sessionID: updatedSession.sessionID,
                    },
                    data: updatedSession,
                });

                return {
                    successfully: `Updated successfully ID:${updatedSession.sessionID}`,
                };
            } else {
                return {
                    errorMessage: `No session found with this ID: ${updatedSession.sessionID}`,
                };
            }
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async deleteSession(id) {
        try {
            const existingSession = await prisma.schedule.findUnique({
                where: {
                    sessionID: id,
                },
            });
            if (existingSession) {
                await prisma.schedule.delete({
                    where: {
                        sessionID: id,
                    },
                });

                return { successMessage: "Deleted Successfully" };
            } else {
                return { errorMessage: `No session found with this ID: ${id}` };
            }
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }
}
