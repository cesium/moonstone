import React, { Component } from "react";
import axios from "axios";
import ResponsiveLayout from "../components/ResponsiveLayout";

var state = {
  jwt: "",
  id: "",
  email: "",
  nickname: "",
  avatar: "",
};
export default WrappedComponent =>
  class userInfo extends Component {
    componentDidMount() {
      var token = localStorage.getItem("jwt");
      if(token !== null && state.jwt !== token) {
        this.getUser(token);
      }
    }

    onResponseInfo = response => {
      const { email, id, nickname, avatar } = response.data;
      state.email = email;
      state.id = id;
      state.nickname = nickname;
      state.avatar = avatar;
      this.forceUpdate();
    };

    getUser(token) {
      state.jwt = token;
      var api_endpoint =
        process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_ATTENDEE;
      let auth = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      axios
        .get(api_endpoint, auth)
        .then(this.onResponseInfo)
        .catch(error => console.error(error));
    }

    render() {
      return <ResponsiveLayout>
        <WrappedComponent user={state} match={this.props.match}/>
      </ResponsiveLayout>;
    }
  };

