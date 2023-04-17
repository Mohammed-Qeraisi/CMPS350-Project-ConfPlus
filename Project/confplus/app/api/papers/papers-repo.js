import fs from "fs-extra";
import { nanoid } from "nanoid";
import path from "path";

class PapersRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "app/json/papers.json");
  }

  async getPapers() {
    try {
      const papers = await fs.readJSON(this.filePath);
      return papers;
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async addPaper(paper) {
    try {
      paper.paperID = nanoid();
      const papers = await this.getPapers();
      papers.push(paper);
      await fs.writeJSON(this.filePath, papers);
      return paper;
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }
}

export default new PapersRepo();
