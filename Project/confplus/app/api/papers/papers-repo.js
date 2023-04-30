import fs from "fs-extra";
import { nanoid } from "nanoid";
import path from "path";

class PapersRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "app/json/papers.json");
  }

  async getPapers(ReviewerID, acceptedPapers) {
    try {
      const papers = await fs.readJSON(this.filePath);

      if (ReviewerID) {
        const filteredPapers = papers
          .filter((paper) => {
            return paper.reviewersID.some(
              (reviewer) => reviewer.id === parseInt(ReviewerID)
            );
          })
          .map(({ paperID, paperTitle }) => ({ paperID, paperTitle }));
        return filteredPapers;
      } else if(acceptedPapers){
        const filteredPapers = papers.filter(paper => paper.isAccepted === true);
        return filteredPapers;
      }
      return papers;
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async getPaperByID(id) {
    try {
      const papers = await fs.readJSON(this.filePath);

      const paperByID = papers.find((paper) => paper.paperID === id);

      if (paperByID) {
        return paperByID;
      } else {
        return { errorMessage: `No paper found with this ID:${id}` };
      }
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async updatePaper(updatedPaper) {
    try {
      const papers = await fs.readJSON(this.filePath);

      const index = papers.findIndex(
        (paper) => paper.paperID === updatedPaper.paperID
      );

      if (index >= 0) {
        papers[index] = updatedPaper;
        await fs.writeJson(this.filePath, papers);
        return {
          successfully: `updated successfully ID:${updatedPaper.paperID}`,
        };
      }
      return {
        errorMessage: `No paper found with this ID: ${updatedPaper.paperID}`,
      };
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
