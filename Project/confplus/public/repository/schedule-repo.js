const baseUrl = "/api/schedule";

class ScheduleRepo {
  async getSchedule() {
    const respone = await fetch(baseUrl);
    return await respone.json();
  }

  async getSessionByDate(date) {
    const response = await fetch(`${baseUrl}/${date}`)
    return await response.json();
  }

  async addSchedule(schedule) {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    });
    return await response.json();
  }

  async updateSession(updatedSessio) {
    const response = await fetch(`${baseUrl}`, {
      method: "PUT",
      body: JSON.stringify(updatedSessio),
      headers: { "Content-type": "application/json" },
    });
    return await response.json();
  }

  async deleteSession(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }
}

export default new ScheduleRepo();
