import React, { Component } from "react";
import axios from "axios";

let state = {
  email: ""
};
export default WrappedComponent =>
  class userInfo extends Component {
    componentDidMount() {
      this.getUser();
    }

    onResponseInfo = response => {
      const { email } = response.data;
      state = { email };
      this.forceUpdate();
    };

    getUser() {
      var token = localStorage.getItem("jwt");
      var api_endpoint =
        process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_USER_INFO;
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
      return <WrappedComponent email={state.email} />;
    }
  };
