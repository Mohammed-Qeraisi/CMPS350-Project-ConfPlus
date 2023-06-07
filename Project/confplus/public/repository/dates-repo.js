const baseUrl = "/api/dates";

class DatesRepo {
    async getDates() {
        const respone = await fetch(baseUrl);
        return await respone.json();
    }
}

export default new DatesRepo();