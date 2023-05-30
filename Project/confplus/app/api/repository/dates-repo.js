import path from "path";
import { promises as fs } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class DatesRepo {
  async getDates() {
    try {
      return await prisma.date.findMany();
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }
}
