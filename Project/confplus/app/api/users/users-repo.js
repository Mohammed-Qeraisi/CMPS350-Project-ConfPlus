// import fs from "fs-extra";
// import path from "path";

// class UsersRepo {
//   constructor() {
//     this.filePath = path.join(process.cwd(), "app/json/users.json");
//   }
//   async getUser(email, password) {
//     try {
//       const users = await fs.readJSON(this.filePath);

//       const user = users.find(
//         (user) => user.email === email && user.password === password
//       );

//       if (!user) {
//         return { errorMessage: "Invalid email or password" };
//       }

//       return user;
//     } catch (error) {
//       return { errorMessage: error.name + " | " + error.message };
//     }
//   }

//   async getUsersByRole(role) {
//     try {
//       const users = await fs.readJson(this.filePath);

//       if(role === 'nonAuthorUsers'){
//         return users.filter(user => user.role !== 'author');
//       }

//       const usersByRole = users.filter((user) => user.role === role);

//       if (usersByRole) {
//         return usersByRole;
//       } else {
//         return { errorMessage: "No user found with this associated role!" };
//       }
//     } catch (error) {
//       return { errorMessage: error.name + " | " + error.message };
//     }
//   }
// }

// export default new UsersRepo();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UsersRepo {
    async getUser(email, password) {
        try {
            const user = await prisma.Users.findFirst({
                where: {
                    email: email,
                    password: password,
                },
            });

            if (!user) {
                return { errorMessage: "Invalid email or password" };
            }

            return user;
        } catch (error) {
            console.log(error.message);
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getUsersByRole(role) {
        try {
            const usersByRole = await prisma.Users.findMany({
                where: {
                    role,
                },
            });

            if (usersByRole.length > 0) {
                return usersByRole;
            } else {
                return {
                    errorMessage: "No user found with this associated role!",
                };
            }
        } catch (error) {
            console.log(error.message);
            return { errorMessage: error.name + " | " + error.message };
        }
    }
}

export default new UsersRepo();
