import fs from "fs-extra";
import { nanoid } from "nanoid";
import path from "path";

class ScheduleRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "app/json/schedule.json");
  }

  async getSchedule() {
    try {
      const schedule = await fs.readJSON(this.filePath);
      return schedule;
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async addSchedule(newSchedule) {
    try {
      newSchedule.sessionID = nanoid();
      const schedule = await this.getSchedule();
      schedule.push(newSchedule);
      await fs.writeJSON(this.filePath, schedule);
      return newSchedule;
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async getSession(date) {
    try {
      const schedule = await this.getSchedule();
      const session = schedule.find((session) => session.date == date);

      if (!session) {
        return `${date}`
      }
      return session;
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async updateSession(updatedSession) {
    try {
      const schedule = await this.getSchedule();

      const index = schedule.findIndex(
        (session) => session.sessionID === updatedSession.sessionID
      );

      if (index >= 0) {
        schedule[index] = updatedSession;
        await fs.writeJson(this.filePath, schedule);
        return {
          successfully: `updated successfully ID:${updatedSession.sessionID}`,
        };
      }
      return {
        errorMessage: `No paper found with this ID: ${updatedSession.sessionID}`,
      };
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async deleteSession(id) {
    try {
      const schedule = await this.getSchedule();

      const index = schedule.findIndex((session) => session.sessionID === id);

      if (index < 0)
        return { errorMessage: `No session found with this ID: ${id}` };

        schedule.splice(index, 1);

      await fs.writeJSON(this.filePath, schedule);

      return { successMessage: "Deleted Successfully" };
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }
}

export default new ScheduleRepo();
