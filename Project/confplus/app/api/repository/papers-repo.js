import path from "path";
import { promises as fs } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class PapersRepo {
  
    // async getPapers(ReviewerID, acceptedPapers, userID) {
    //     try {
    //         const papers = await fs.readJSON(this.filePath);

    //         if (ReviewerID) {
    //             const filteredPapers = papers
    //                 .filter((paper) => {
    //                     return paper.reviewersID.some(
    //                         (reviewer) => reviewer.id === parseInt(ReviewerID)
    //                     );
    //                 })
    //                 .map(({ paperID, paperTitle, reviewersID }) => ({
    //                     paperID,
    //                     paperTitle,
    //                     evaluated: reviewersID.find(
    //                         (reviewer) => reviewer.id === parseInt(ReviewerID)
    //                     ).evaluated,
    //                 }));
    //             return filteredPapers;
    //         } else if (acceptedPapers) {
    //             const filteredPapers = papers.filter(
    //                 (paper) => paper.isAccepted === true
    //             );
    //             return filteredPapers;
    //         } else if (userID) {
    //             const filteredPapers = papers.filter(
    //                 (paper) => paper.userID === userID
    //             );
    //             return filteredPapers;
    //         }
    //         return papers;
    //     } catch (error) {
    //         return { errorMessage: error.name + " | " + error.message };
    //     }
    // }

  async getPaperByID(id) {
    try {
      const paper = await prisma.paper.findUnique({
        where: {
          paperID: id,
        },
      });

      if (paper) {
        return paper;
      } else {
        return { errorMessage: `No paper found with this ID:${id}` };
      }
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async updatePaper(updatedPaper) {
    try {
      const existingPaper = await prisma.paper.findUnique({
        where: {
          paperID: updatedPaper.paperID,
        },
      });

      if (existingPaper) {
        await prisma.paper.update({
          /*to not forget I checked the id again because maybe 
            after assigning the paper to existingPaper object mmaybe someone deleted the paper 
            so I need to check again*/
          where: {
            paperID: updatedPaper.paperID,
          },
          data: updatedPaper,
        });

        return {
          successfully: `Updated successfully ID:${updatedPaper.paperID}`,
        };
      } else {
        return {
          errorMessage: `No paper found with this ID: ${updatedPaper.paperID}`,
        };
      }
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async addPaper(paper) {
    try {
      await prisma.paper.create({
        data: paper,
      });

      return {
        successfully: "Your paper has been successfully submitted. Thank you!",
      };
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }
}
