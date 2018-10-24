import React, {Component} from 'react';
import {Button, FormField, Text, TextInput} from "grommet";
import request from "superagent/lib/client";

const api_endpoint = '';

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

  handle_login_response(res) {
    if (res.hasOwnProperty('jwt')) {
      this.setState({error: ''});
      localStorage.jwt = res.jwt;
      window.location.pathname = '/';
    } else {
      this.setState({error: res.error})
    }
  }

  getErrorText() {
    return this.state.error !== '' ? "Invalid email or password" : "";
  }

  login = () => {
    /* TODO fix CORS and test this */
    request
      .post(api_endpoint)
      .send({email: this.state.email, password: this.state.password})
      .then(res => this.handle_login_response(res));
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
