// import fs from "fs-extra";
// import path from "path";

// class DatesRepo {
//     constructor() {
//         this.filePath = path.join(
//             process.cwd(),
//             "app/json/conference-dates.json"
//         );
//     }

//     async getDates() {
//         try {
//             const dates = await fs.readJSON(this.filePath);
//             return dates;
//         } catch (error) {
//             return { errorMessage: error.name + " | " + error.message };
//         }
//     }
// }

// export default new DatesRepo();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DatesRepo {
    async getDates() {
        try {
            return await prisma.dates.findMany();
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }
}

export default new DatesRepo();
