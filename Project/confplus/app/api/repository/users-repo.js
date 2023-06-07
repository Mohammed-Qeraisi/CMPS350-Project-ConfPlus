import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class UsersRepo {
    async getUser(email, password) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                    password,
                },
            });

            if (!user) {
                return { errorMessage: "Invalid email or password" };
            }

            return user;
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getUsersByRole(role) {
        try {
            let usersByRole;
            if (role === "nonAuthorUsers") {
                usersByRole = await prisma.user.findMany({
                    where: {
                        role: {
                            not: "author",
                        },
                    },
                });
            } else {
                usersByRole = await prisma.user.findMany({
                    where: {
                        role,
                    },
                });
            }

            if (usersByRole.length > 0) {
                return usersByRole;
            } else {
                return {
                    errorMessage: "No user found with this associated role!",
                };
            }
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }
}
