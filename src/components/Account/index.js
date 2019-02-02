import React, { Component } from 'react';
import {Box, Image, Text, Heading, RoutedButton, InfiniteScroll, FormField,
  Button, TextInput} from "grommet";
import axios from 'axios';
import {Edit, Checkmark} from "grommet-icons";
import QRCode from "qrcode.react";
import "./index.css";
import UserData from '../../services/userData.js'
import FormData from 'form-data';
import attendee_missing from '../../images/default/avatar-missing.png';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: "",
      edit_username: false,
      new_username: "",
      edit_avatar: false,
      avatar_error: ""
    };
    this.swapEditUsername = this.swapEditUsername.bind(this);
    this.swapEditAvatar = this.swapEditAvatar.bind(this);
    this.editUsername = this.editUsername.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.reloadUser = this.reloadUser.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    UserData.prototype.getUser()
      .then(user => this.setState({user: user, error: ""}))
      .catch(e => this.handleError(e));
  }

  handleError(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && (error.response.data.error === "unauthenticated"
        || error.response.data.error === "invalid_token"))
    {
      window.location.pathname = "/login";
    }
    this.setState({ error: "Network Error" });
  }

  swapEditUsername() {
    this.setState({edit_avatar: false, edit_username: !this.state.edit_username});
  }

  swapEditAvatar() {
    this.setState({edit_username: false, edit_avatar: !this.state.edit_avatar});
  }

  onChangeUsername(event) {
    this.setState({new_username: event.target.value});
  }

  reloadUser() {
    this.setState({edit_username: false, edit_avatar: false});
    UserData.prototype.fetchUserForce()
      .then(() => this.getUser())
      .catch(e => this.handleError(e));
  }

  editUsername(event) {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_ATTENDEES
      + this.state.user.id;
    let headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    let data = {
      attendee: {
        nickname: this.state.new_username
      }
    };
    axios.put(api_endpoint, data, headers)
      .then(this.reloadUser)
      .catch(this.reloadUser);
  }

  handleImageChange(event) {
    if(event.target.files[0].size > 1000000) {
      this.setState({avatar_error: "Image too large, maximum file size: 1Mb"});
      return;
    }
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_ATTENDEES
      + this.state.user.id;
    let form = new FormData();
    form.append('attendee[avatar]', event.target.files[0]);
    let headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
    axios.put(
      api_endpoint,
      form,
      {headers: headers},
      {transformRequest: (data, request) => data}
    )
      .then(this.reloadUser)
      .catch(this.reloadUser);
  }

  truncateName(name) {
    const maxLen = 15;
    return name.length > maxLen ? name.substring(0, maxLen) + "..." : name;
  }

  render() {
    let avatar = this.state.user.avatar && this.state.user.avatar.includes("missing") ?
      attendee_missing : this.state.user.avatar;
    return (
      <Box
        full fill={true}
        gridArea="nav"
        background="light-1"
        gap="medium"
        pad={{ top: "large", bottom: "medium" }}
      >
        <Box align="center" gap="medium">
          {this.props.size !== "small" ? (
            <QRCode
              renderAs="svg"
              value={"https://moonstone.seium.org/user/" + this.state.user.id}
            />
          ) : (
            <Image width="150em" src={avatar}/>
          )}
          {this.state.edit_username ?
              <Box direction="row" justify="center">
                <FormField>
                  <TextInput
                    size="xlarge"
                    placeholder={this.state.user.nickname}
                    onChange={this.onChangeUsername}
                  />
                </FormField>
                <Button icon={<Edit />} onClick={this.swapEditUsername}/>
                <Button type="submit" icon={<Checkmark />} onClick={this.editUsername}/>
              </Box>
              :
              <Box direction="row">
                <Heading magin="xlarge" level="2">{this.state.user.nickname}</Heading>
                <Button icon={<Edit />} onClick={this.swapEditUsername} />
              </Box>
          }
          <Heading level="3">{this.state.user.email}</Heading>
          {this.state.edit_avatar ?
              <Box direction="row" justify="center">
                <input type="file" onChange={event => this.handleImageChange(event)} />
                <Button icon={<Edit />} border="" onClick={this.swapEditAvatar} />
              </Box>
              :
              <Button icon={<Edit />} label="Avatar" plain={true} onClick={this.swapEditAvatar}/>
          }
          <Text color="status-critical">{this.state.avatar_error}</Text>
        </Box>
        <Box
          pad={{ horizontal: "medium", bottom: "medium" }}
          justify="start"
          direction="row"
          wrap={true}
        >
          <InfiniteScroll items={this.state.user.badges} step={30} >
            {(b, i) => (
              <RoutedButton key={i} path={"/badgedex/" + b.id}>
                <Box align="center" width="small">
                  <Image width="150em" src={b.avatar}/>
                  <Text>{this.truncateName(b.name)}</Text>
                </Box>
              </RoutedButton>
            )}
          </InfiniteScroll>
        </Box>
      </Box>
    );
  }
}

export default Account;

