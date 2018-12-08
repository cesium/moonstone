import React, {Component} from 'react';
import {Text, Button, FormField, TextInput, Box} from "grommet";
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
      error: ''
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
      this.setState({error: ''});
      localStorage.jwt = res.jwt;
      window.location.pathname = '/';
    } else {
      this.setState({error: "Register error"})
    }
  }

  handleErrorResponse(error) {
    console.log(error)
    if (error.response) { // status code outside 2XX
      if(error.response.data.hasOwnProperty('error')){
        this.setState({error: error.response.data.error});
      }else if(error.response.data.hasOwnProperty('errors')){
        this.setState({error: "Invalid token"});
      }else{
        this.setState({error: "Register error"});
      }
    } else if (error.request) {
      this.setState({error: "Network Error"});
    }
  }

  getErrorText() {
    return this.state.error;
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
      .catch(error => this.handleErrorResponse(error));
  };

  render() {
    return (
      <Box
        justify="center"
        align="center"
        pad="xlarge"
        gap="medium"
      >

      <Box alignSelf="center">
        <FormField label="Email">
          <TextInput
              size='xlarge'
              placeholder='foo@bar.com'
            onChange={e => this.onChangeEmail(e)}
          />
        </FormField>

        <FormField label="Username">
          <TextInput
            size='xlarge'
            placeholder='foo'
            onChange={e => this.onChangeNickname(e)}
          />
        </FormField>

        <FormField label="Password">
          <TextInput type="password"
            size='xlarge'
            placeholder='********'
            onChange={e => this.onChangePassword(e)}
          />
        </FormField>

        <FormField label="Confirm password">
          <TextInput type="password"
            size='xlarge'
            placeholder='********'
            onChange={e => this.onChangeConfirmPassword(e)}
          />
        </FormField>

        <Button
          type="submit"
          label="Register"
          color='brand'
          primary='true'
          onClick={this.register}
        />
      </Box>

      <Box>
        <Text color='status-critical'>{this.getErrorText()}</Text>
      </Box>
    </Box>
    );
  }
}

