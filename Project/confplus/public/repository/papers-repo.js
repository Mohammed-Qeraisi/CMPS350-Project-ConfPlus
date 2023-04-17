const baseUrl = "/api/papers";

class PapersRepo {
  async getPapers() {
    const respone = await fetch(baseUrl);
    return await respone.json();
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
