import path from "path";
import { promises as fs } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class InstitutionsRepo {
  async getInstitutions() {
    try {
      return await prisma.institution.findMany();
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }
}
