import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class LocationsRepo {
    async getLocations() {
        try {
            return await prisma.location.findMany();
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }
}
