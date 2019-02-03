import React, { Component } from "react";
import {Box, Image} from "grommet";
import {Login} from "../components";
import logo from "../pages/logo.png";

var state = {
  isLogin: true
};

class LoginPage extends Component {
  openLogin() {
    state.isLogin = !state.isLogin;
  }

  render() {
    return (
      <Box fill="vertical" margin={{ horizontal: "medium" }}>
        <Image align="center" fit="contain" src={logo} />
        <Login />
      </Box>
    );
  }
}

export default LoginPage;
