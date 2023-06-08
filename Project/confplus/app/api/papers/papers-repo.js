// import fs from "fs-extra";
// import { nanoid } from "nanoid";
// import path from "path";

// class PapersRepo {
//     constructor() {
//         this.filePath = path.join(process.cwd(), "app/json/papers.json");
//     }

//     async getPapers(ReviewerID, acceptedPapers, userID) {
//         try {
//             const papers = await fs.readJSON(this.filePath);
//             if (ReviewerID) {
//                 const filteredPapers = papers
//                     .filter((paper) => {
//                         return paper.reviewersID.some(
//                             (reviewer) => reviewer.id === parseInt(ReviewerID)
//                         );
//                     })
//                     .map(({ paperID, paperTitle, reviewersID }) => ({
//                         paperID,
//                         paperTitle,
//                         evaluated: reviewersID.find(
//                             (reviewer) => reviewer.id === parseInt(ReviewerID)
//                         ).evaluated,
//                     }));
//                 return filteredPapers;
//             } else if (acceptedPapers) {
//                 const filteredPapers = papers.filter(
//                     (paper) => paper.isAccepted === true
//                 );
//                 return filteredPapers;
//             } else if (userID) {
//                 const filteredPapers = papers.filter(
//                     (paper) => paper.userID == userID
//                 );
//                 return filteredPapers;
//             }
//             return papers;
//         } catch (error) {
//             return { errorMessage: error.name + " | " + error.message };
//         }
//     }

//     async getPaperByID(id) {
//         try {
//             const papers = await fs.readJSON(this.filePath);

//             const paperByID = papers.find((paper) => paper.paperID === id);

//             if (paperByID) {
//                 return paperByID;
//             } else {
//                 return { errorMessage: `No paper found with this ID:${id}` };
//             }
//         } catch (error) {
//             return { errorMessage: error.name + " | " + error.message };
//         }
//     }

//     async updatePaper(updatedPaper) {
//         try {
//             const papers = await fs.readJSON(this.filePath);

//             const index = papers.findIndex(
//                 (paper) => paper.paperID === updatedPaper.paperID
//             );

//             if (index >= 0) {
//                 papers[index] = updatedPaper;
//                 await fs.writeJson(this.filePath, papers);
//                 return {
//                     successfully: `updated successfully ID:${updatedPaper.paperID}`,
//                 };
//             }
//             return {
//                 errorMessage: `No paper found with this ID: ${updatedPaper.paperID}`,
//             };
//         } catch (error) {
//             return { errorMessage: error.name + " | " + error.message };
//         }
//     }

//     async addPaper(paper) {
//         try {
//             paper.paperID = nanoid();
//             const papers = await this.getPapers();
//             papers.push(paper);
//             await fs.writeJSON(this.filePath, papers);
//             return {
//                 successfully:
//                     "Your paper has been successfully submitted. Thank you!",
//             };
//         } catch (error) {
//             return { errorMessage: error.name + " | " + error.message };
//         }
//     }
// }

// export default new PapersRepo();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PapersRepo {
    async getPapers() {
        try {
            return await prisma.papers.findMany();
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getPapersByReviewerID(id) {
        try {
            const papers = await prisma.ratings.findMany({
                where: {
                    userID: +id,
                },
                Papers: {
                    select: {
                        paperTitle: true,
                    },
                },
            });

            if (papers) {
                return papers;
            } else {
                return {
                    errorMessage: `There is no associated papers for reviewerID:${id}`,
                };
            }
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getPapersByStatus(isAccepted) {
        try {
            const papers = await prisma.papers.findMany({
                where: {
                    isAccepted,
                },
            });

            if (papers) {
                return papers;
            } else {
                return {
                    errorMessage: `There is no paper found with Status(isAccepted):${isAccepted}`,
                };
            }
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getPapersByUserID(id) {
        try {
            const papers = await prisma.papers.findMany({
                where: {
                    paperID: id,
                },
                select: {
                    isAccepted: true,
                    paperTitle: true,
                },
                include: {
                    Ratings: true,
                    Session: true,
                },
            });

            if (papers) {
                return papers;
            } else {
                return {
                    errorMessage: `There is no associated papers for userID:${id}`,
                };
            }
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getPaperByID(id) {
        try {
            const paper = await prisma.papers.findUnique({
                where: {
                    paperID: id,
                },
                include: {
                    Presenter: true,
                    Authors: true,
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

    async updateRatings(newRating) {
        try {
            const updatedRating = await prisma.ratings.update({
                where: {
                    ratingID: newRating.ratingID,
                },
                data: newRating,
            });

            if (updatedRating) {
                return {
                    successfully: `Updated successfully RatingID:${newRating.ratingID}`,
                };
            } else {
                return {
                    errorMessage: `No rating found with this ID:${newRating.ratingID}`,
                };
            }
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async addPaper(paper) {
        try {
            const newPresenter = await prisma.presenter.create({
                data: paper.presenter,
            });

            const newPaper = {
                paperTitle: paper.paperTitle,
                paperSummary: paper.paperSummary,
                paperPDF: paper.paperPDF,
                userID: paper.userID,
                presenterID: newPresenter.presenterID,
            };

            const addPaper = await prisma.papers.create({
                data: newPaper,
            });

            for (const author of paper.authors) {
                const addAuthor = await prisma.author.create({
                    data: { ...author, paperID: addPaper.paperID },
                });
            }

            for (const rating of paper.ratings) {
                const addRatings = await prisma.ratings.create({
                    data: { ...rating, paperID: addPaper.paperID },
                });
            }

            return {
                successfully:
                    "Your paper has been successfully submitted. Thank you!",
            };
        } catch (error) {
            console.log(error.message);
            return { errorMessage: error.name + " | " + error.message };
        }
    }
}

export default new PapersRepo();
