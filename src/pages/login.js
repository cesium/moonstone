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
    console.log(res);
    if (res.hasOwnProperty('jwt')) {
      this.setState({error: ''});
      localStorage.jwt = res.jwt;
      window.location.pathname = '/';
    } else {
      this.setState({error: res.error})
    }
  }

  getErrorText() {
    return this.state.error; // !== '' ? "Invalid email or password" : "";
  }

  login = () => {
    const api_endpoint = process.env.REACT_APP_ENDPOINT
                       + process.env.REACT_APP_API_AUTH_SIGN_IN;
    let data = JSON.stringify({
        email: this.state.email,
        password: this.state.password
    });
    let headers = {
        headers: {
            'crossDomain': true,
            'Content-Type': 'application/x-www-form-urlencoded',
    }};
    console.log(this.state);
    console.log(api_endpoint);
    axios.post(api_endpoint, data, headers)
         .then(res => this.handleLoginResponse(res))
         .catch(res => {console.log(res); this.setState({error: "Login error"});});
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

