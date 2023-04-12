const baseUrl = '/api/papers';

class PapersRepo{
    async getPapers(){
        const respone = await fetch(baseUrl);
        return await respone.json();
    }
}

export default new PapersRepo();