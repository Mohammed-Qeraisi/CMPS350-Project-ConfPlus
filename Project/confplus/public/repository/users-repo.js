const baseUrl = "/api/users";

class UsersRepo {
  async getUser(email, password) {
    const response = await fetch(
      `${baseUrl}?email=${email}&password=${password}`
    );
    return await response.json();
  }

  //   async deleteAccount(accountNo) {
  //     const response = await fetch(`${baseUrl}/${accountNo}`, {
  //       method: "DELETE",
  //     });
  //     return await response.json();
  //   }

  //   async addAccount(account) {
  //     const response = await fetch(`${baseUrl}`, {
  //       method: "POST",
  //       body: JSON.stringify(account),
  //       headers: { "Content-type": "application/json" },
  //     });
  //   }

  //   async updateAccount(account) {
  //     const response = await fetch(`${baseUrl}/${account.accountNo}`, {
  //       method: "PUT",
  //       body: JSON.stringify(account),
  //       headers: { "Content-type": "application/json" },
  //     });
  //   }

  //   async addTrans(trans) {
  //     const response = await fetch(`${baseUrl}/${trans.accountNo}/trans`, {
  //       method: "POST",
  //       body: JSON.stringify(trans),
  //       headers: { "Content-type": "application/json" },
  //     });
  //   }
}

export default new UsersRepo();
