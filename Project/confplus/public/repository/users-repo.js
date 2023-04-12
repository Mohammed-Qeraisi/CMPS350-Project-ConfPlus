const baseUrl = "/api/users";

class UsersRepo {
  async getUser(email, password) {
    const response = await fetch(
      `${baseUrl}?email=${email}&password=${password}`
    );
    return await response.json();
  }

  async getUserByRole(role) {
    const response = await fetch(`${baseUrl}/${role}`);
    return await response.json();
  }
}

export default new UsersRepo();
