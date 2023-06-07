const baseUrl = "/api/institutions";

class InstitutionsRepo {
    async getInstitutions() {
        const respone = await fetch(baseUrl);
        return await respone.json();
    }
}

export default new InstitutionsRepo();
