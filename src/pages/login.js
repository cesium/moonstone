import React, {Component} from 'react';
import {Button, FormField, Text, TextInput} from "grommet";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value});
  };

  onChangePassword = event => {
    this.setState({password: event.target.value});
  };

  handleLoginResponse(res) {
    if (res.data.hasOwnProperty('jwt')) {
      this.setState({error: ''});
      localStorage.jwt = res.data.jwt;
      window.location.pathname = '/';
    } else {
      this.setState({error: "Login error"})
    }
  }

  handleErrorResponse(res) {
    if (res.response) {
      this.setState({error: "Invalid email or password"})
    } else {
      this.setState({error: "Login error"})
    }
  }

  getErrorText() {
    return this.state.error;
  }

  login = () => {
    const api_endpoint = process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_AUTH_SIGN_IN;
    axios.post(api_endpoint, {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => this.handleLoginResponse(res))
      .catch(res => this.handleErrorResponse(res));
  };

  render() {
    return <div>
      <FormField label="Email">
        <TextInput
          onChange={e => this.onChangeEmail(e)}
        />
      </FormField>

      <FormField label="Password">
        <TextInput type="password"
                   onChange={e => this.onChangePassword(e)}
        />
      </FormField>

      <Button
        type="submit"
        label="Login"
        primary
        onClick={() => this.login()}
      />

      <br/><br/>
      <Text color='status-critical'>
        {this.getErrorText()}
      </Text>

    </div>;
  }
}

