
import axios from "axios";

var state = {
  jwt: "",
  user: null,
  subscriptions: [],
}

class UserData {
  async getId() {
    await this.fetchUser();
    return state.user.id;
  }

  async getEmail() {
    await this.fetchUser();
    return state.user.email;
  }

  async getNickname() {
    await this.fetchUser();
    return state.user.nickname;
  }

  async getAvatar() {
    await this.fetchUser();
    return state.user.avatar;
  }

  async getUser() {
    await this.fetchUser();
    return state.user;
  }

  async fetchUser() {
    if(localStorage.getItem("jwt") === null) throw {response: {data: {error: "unauthenticated"}}};
    if(state.user === null || localStorage.getItem("jwt") !== state.jwt)
      await this.fetchUserForce();
  }

  onResponseInfo(response)  {
    state.user = response.data;
    state.subscriptions.forEach(f => f());
  };

  async fetchUserForce() {
    state.jwt = localStorage.getItem("jwt");
    var api_endpoint =
      process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_ATTENDEE;
    let auth = {
      headers: {
        Authorization: "Bearer " + state.jwt
      }
    };
    this.onResponseInfo(await axios.get(api_endpoint, auth));
  }

  subscribeToStateChange(func) {
    state.subscriptions.push(func);
  }
}

export default UserData;
