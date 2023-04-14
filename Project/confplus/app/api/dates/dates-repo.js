import fs from "fs-extra";
import path from "path";

class DatesRepo{
    constructor(
    ){
        this.filePath = path.join(process.cwd(), "app/json/conference-dates.json");
    }

    async getDates(){
        const dates = await fs.readJSON(this.filePath);
        return dates;
    }
}

export default new DatesRepo();