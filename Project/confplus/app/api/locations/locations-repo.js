import fs from "fs-extra";
import path from "path";

class LocationsRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), "app/json/locations.json");
    }

    async getLocations() {
        const Locations = await fs.readJSON(this.filePath);
        return Locations;
    }
}

export default new LocationsRepo();

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

//  class LocationsRepo {
//   async getLocations() {
//     try {
//       return await prisma.location.findMany();
//     } catch (error) {
//       return { errorMessage: error.name + " | " + error.message };
//     }
//   }
// }

// export default new LocationsRepo();
