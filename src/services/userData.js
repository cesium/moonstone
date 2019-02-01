
import axios from "axios";

var state = {
  jwt: "",
  user: null,
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
    if(localStorage.getItem("jwt") === null) return false;
    if(state.user !== null && localStorage.getItem("jwt") === state.jwt) return true;
    await this.fetchUserForce();
  }

  onResponseInfo(response)  {
    state.user = response.data;
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
}

export default UserData;
