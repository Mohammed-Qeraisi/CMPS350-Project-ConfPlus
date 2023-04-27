import fs from "fs-extra";
import path from "path";

class ScheduleRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), "app/json/schedule.json");
    }

    async getSchedule() {
        try {
            const schedule = await fs.readJSON(this.filePath);
            return schedule
        } catch (error) {
            console.log(error)
        }
    }

    async addSchedule(newSchedule) {
        try {
            const schedule = await this.getSchedule();
            schedule.push(newSchedule);
            await fs.writeJSON(this.filePath, schedule);
            return newSchedule;
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async getSession(id){
        try {
            const schedule = await this.getSchedule();
            const session = schedule.find(sessions => session.id === id)
            return session
        } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
        }
    }

    async updateSession(updatedSession){
        try {
            const schedule = await this.getSchedule();
      
            const index = sessions.findIndex(
              (session) => session.id === updatedSession.id
            );
      
            if (index >= 0) {
                schedule[index] = updatedSession;
              await fs.writeJson(this.filePath, schedule);
              return {
                successfully: `updated successfully ID:${updatedSession.id}`,
              };
            }
            return {
              errorMessage: `No paper found with this ID: ${updatedSession.id}`,
            };
          } catch (error) {
            return { errorMessage: error.name + " | " + error.message };
          }
    }
}

export default new ScheduleRepo();