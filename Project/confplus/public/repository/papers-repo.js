const baseUrl = "/api/papers";

class PapersRepo {
    async getPapers() {
        const respone = await fetch(baseUrl);
        return await respone.json();
    }

    async getPapersByReviewerID(ReviewerID) {
        const response = await fetch(`${baseUrl}?ReviewerID=${ReviewerID}`);
        return await response.json();
    }

    async getPapersByUserID(userID) {
        const response = await fetch(`${baseUrl}?UserID=${userID}`);
        return await response.json();
    }

    async getAcceptedPapers() {
        const response = await fetch(`${baseUrl}?AcceptedPapers=true`);
        return await response.json();
    }

    async getPaperByID(id) {
        const response = await fetch(`${baseUrl}/${id}`);
        return await response.json();
    }

    async updatePaper(updatedPaper) {
        const response = await fetch(`${baseUrl}`, {
            method: "PUT",
            body: JSON.stringify(updatedPaper),
            headers: { "Content-type": "application/json" },
        });
        return await response.json();
    }

    async addPaper(paper) {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paper),
        });
        return await response.json();
    }
}

export default new PapersRepo();
