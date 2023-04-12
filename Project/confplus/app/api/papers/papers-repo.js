import fs from "fs-extra";
import path from "path";

class PapersRepo{
    constructor(
    ){
        this.filePath = path.join(process.cwd(), "app/json/papers.json");
    }

    async getPapers(){
        const papers = await fs.readJSON(this.filePath);
        return papers;
    }
}

export default new PapersRepo();