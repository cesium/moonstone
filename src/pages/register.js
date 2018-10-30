import React, {Component} from 'react';
import {Text, Button, FormField, TextInput} from "grommet";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      password: '',
      password_confirmation: '',
      id: '',
      errors: {}
    };
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value});
  };

  onChangeNickname = event => {
    this.setState({nickname: event.target.value});
  };

  onChangePassword = event => {
    this.setState({password: event.target.value});
  };
  onChangeConfirmPassword = event => {
    this.setState({password_confirmation: event.target.value});
  };

  handleRegisterResponse(res) {
    if (res.data.hasOwnProperty('jwt')) {
      this.setState({errors: {}});
      localStorage.jwt = res.jwt;
      window.location.pathname = '/';
    } else {
      this.setState({errors: {"detail": "Register error"}})
    }
  }

  handleErrorResponse(res) {
    if (res.response) {
      console.log(res.response);
    } else if (res.request) {
      console.log(res.request);
    }
  }

  getErrorText() {
    let text = "";
    if (this.state.errors.hasOwnProperty('email')) {
      switch (this.state.errors.email[0]) {
        case 'has invalid format':
          text = "Invalid email";
          break;
        case 'has already been taken':
          text = "Email taken";
          break;
        default:
          break;
      }
    } else if (this.state.errors.hasOwnProperty('password_confirmation')) {
      text = "Passwords do not match";
    } else if (this.state.errors.hasOwnProperty('detail')) {
      text = "Bad request";
    } else {
      text = this.state.errors;
    }
    return text;
  }

  componentDidMount() {
    this.setState({id: this.props.match.params.id});
  }

  register = () => {
    const api_endpoint = process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_AUTH_SIGN_UP;
    let data = {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        attendee: {
          id: this.state.id,
          nickname: this.state.nickname
        }
      }
    };
    axios.post(api_endpoint, data)
      .then(res => this.handleRegisterResponse(res))
      .catch(res => this.handleErrorResponse(res));
  };

  render() {
    return (
      <div>
        <FormField label="Email">
          <TextInput
            onChange={e => this.onChangeEmail(e)}
          />
        </FormField>

        <FormField label="Username">
          <TextInput
            onChange={e => this.onChangeNickname(e)}
          />
        </FormField>

        <FormField label="Password">
          <TextInput type="password"
                     onChange={e => this.onChangePassword(e)}
          />
        </FormField>

        <FormField label="Confirm password">
          <TextInput type="password"
                     onChange={e => this.onChangeConfirmPassword(e)}
          />
        </FormField>

        <Button
          type="submit"
          label="Register"
          primary
          onClick={() => this.register()}
        />
        <br/><br/>
        <Text color='status-critical'>
          cenas
        </Text>

      </div>
    );
  }
}

