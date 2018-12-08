import React, { Component } from "react";
import axios from "axios";
import ResponsiveLayout from "../components/ResponsiveLayout";

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

    getAuthorization(){
      return {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      };
    }

    getUser() {
      var api_endpoint =
        process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_USER_INFO;
      let auth = this.getAuthorization();
      axios
        .get(api_endpoint, auth)
        .then(this.onResponseInfo)
        .catch(error => console.error(error));
    }

    render() {
      return <ResponsiveLayout>
        <WrappedComponent
          email={state.email}
          getAuthorization={this.getAuthorization}
        />
      </ResponsiveLayout>;
    }
  };

