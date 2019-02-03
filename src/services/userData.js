
import axios from "axios";

var state = {
  jwt: "",
  user: null,
  type: null,
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

  async getType() {
    await this.fetchUser();
    return state.type;
  }

  async fetchUser() {
    if(state.user === null || localStorage.getItem("jwt") !== state.jwt)
      await this.fetchUserForce();
  }

  async fetchUserForce() {
    state.jwt = localStorage.getItem("jwt");
    const auth = {
      headers: {
        Authorization: "Bearer " + state.jwt
      }
    };
    const api_endpoint_type =
      process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_USER_INFO;
    const type = await axios.get(api_endpoint_type, auth);

    console.log(type);

    state.type = type.data.type;
    if(state.type === "attendee"){
      const api_endpoint_attendee =
        process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_ATTENDEE;
      const user = await axios.get(api_endpoint_attendee, auth);
      state.user = user.data;
    } else if (state.type === "company") {
      state.user = {};
    } else {
      localStorage.removeItem("jwt");
    }
    state.subscriptions.forEach(f => f());
  }

  subscribeToStateChange(func) {
    state.subscriptions.push(func);
  }
}

export default UserData;
