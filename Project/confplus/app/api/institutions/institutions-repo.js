import fs from "fs-extra";
import path from "path";

class InstitutionsRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), "app/json/institutions.json");
    }

    async getInstitutions() {
        try {
            const institutions = await fs.readJSON(this.filePath);
            return institutions;
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }
}

export default new InstitutionsRepo();

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// class InstitutionsRepo {
//     async getInstitutions() {
//         try {
//             return await prisma.institution.findMany();
//         } catch (error) {
//             return { errorMessage: error.name + " | " + error.message };
//         }
//     }
// }

// export default new InstitutionsRepo();
