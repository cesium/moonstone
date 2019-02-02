import React, { Component } from "react";
import {Box} from "grommet";
import {Login, Welcome} from "../components";

var state = {
  isLogin: true
};

class LoginPage extends Component {
  openLogin() {
    state.isLogin = !state.isLogin;
  }

  render() {
    return (
      <Box background="light-1" fill="vertical">
        <Box
          margin={{ left: "medium", right:"medium", top: "medium", bottom: "small" }}
        >
          <Welcome size="small" openLogin={this.openLogin} />
          <Login />
        </Box>
      </Box>
    );
  }
}

export default LoginPage;
