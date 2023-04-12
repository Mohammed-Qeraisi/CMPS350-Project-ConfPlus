import fs from "fs-extra";
import path from "path";

class UsersRepo {
  constructor() {
    this.filePath = path.join(process.cwd(), "app/json/users.json");
  }

  async getUser(email, password) {
    try {
      const users = await fs.readJSON(this.filePath);

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        return { errorMessage: "Invalid email or password" };
      }

      return user;
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }

  async getUsersByRole(role) {
    try {
      const users = await fs.readJson(this.filePath);

      const usersByRole = users.filter((user) => user.role === role);

      if (usersByRole) {
        return usersByRole;
      } else {
        return { errorMessage: "No user found with this associated role!" };
      }
    } catch (error) {
      return { errorMessage: error.name + " | " + error.message };
    }
  }
}

export default new UsersRepo();
