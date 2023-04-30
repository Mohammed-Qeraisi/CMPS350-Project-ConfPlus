import fs from "fs-extra";
import path from "path";

class LocationsRepo{
    constructor(
    ){
        this.filePath = path.join(process.cwd(), "app/json/locations.json");
    }

    async getLocations(){
        const Locations = await fs.readJSON(this.filePath);
        return Locations;
    }
}

export default new LocationsRepo();