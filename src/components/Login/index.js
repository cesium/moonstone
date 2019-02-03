import React, { Component } from "react";

import { Box, Button, FormField, Text, TextInput } from "grommet";
import axios from "axios";

import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
    this.login = this.login.bind(this);
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleLoginResponse(res) {
    if (res.data.hasOwnProperty("jwt")) {
      this.setState({ error: "" });
      localStorage.jwt = res.data.jwt;
      window.location.pathname = "/";
    } else {
      this.setState({ error: "Login error" });
    }
  }

  handleErrorResponse(res) {
    if (res.response) {
      this.setState({ error: "Invalid email or password" });
    } else {
      this.setState({ error: "Login error" });
    }
  }

  getErrorText() {
    return this.state.error;
  }

  login() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_AUTH_SIGN_IN;
    axios
      .post(api_endpoint, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => this.handleLoginResponse(res))
      .catch(res => this.handleErrorResponse(res));
  }

  render() {
    return (
      <Box gridArea="nav">
        <Box alignSelf="center">
          <FormField label="Email">
            <TextInput
              type="email"
              placeholder="foo@bar.com"
              size="xlarge"
              onChange={e => this.onChangeEmail(e)}
            />
          </FormField>

          <FormField label="Password">
            <TextInput
              type="password"
              placeholder="********"
              size="xlarge"
              onChange={e => this.onChangePassword(e)}
            />
          </FormField>

          <Button
            type="submit"
            label="Login"
            color="brand"
            primary="true"
            margin={{ top: "small" }}
            onClick={this.login}
          />
        </Box>

        <Box align="center" margin="medium">
          <Text color="status-critical">{this.getErrorText()}</Text>
        </Box>
      </Box>
    );
  }
}

export default Login;

