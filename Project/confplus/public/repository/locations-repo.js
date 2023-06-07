const baseUrl = "/api/locations";

class LocationsRepo {
    async getLocations() {
        const respone = await fetch(baseUrl);
        return await respone.json();
    }
}

export default new LocationsRepo();
