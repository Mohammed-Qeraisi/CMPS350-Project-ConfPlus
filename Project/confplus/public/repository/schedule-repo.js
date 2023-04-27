const baseUrl = '/api/schedule'

class ScheduleRepo{
    async getSchedule(){
        const respone = await fetch(baseUrl)
        return await respone.json()
    }

    async addSchedule(schedule){
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(schedule),
          });
          return await response.json();
    }
}

export default new ScheduleRepo()