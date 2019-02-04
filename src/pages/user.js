import React, { Component } from 'react';
import { Box, Image, Text, Heading, TextInput } from 'grommet';
import axios from 'axios';
import userInfo from '../containers/userInfo.js';
import attendee_missing from '../images/default/avatar-missing.png';
import BadgeDex from '../components/BadgeDex/index.js';
import UserData from '../services/userData.js';
import debounce from 'lodash/debounce';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      filteredBadges: [],
      error: ''
    };
    this.filterBadges = debounce(this.filterBadges, 500);
  }

  // Check if is registered
  componentDidMount() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT +
      process.env.REACT_APP_API_IS_REGISTERED +
      this.props.match.params.id;
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios
      .get(api_endpoint, config)
      .then(res => this.handleRegisterCheck(res))
      .catch(error => this.handleRegisterCheckError(error));
  }

  handleRegisterCheck(res) {
    if (res.data.hasOwnProperty('is_registered')) {
      if (res.data.is_registered) {
        this.getUser();
      } else {
        UserData.prototype
          .getType()
          .then(type => {
            if (type === 'attendee') {
              window.location.pathname =
                '/register/' + this.props.match.params.id;
            } else {
              this.setState({ error: 'User not registered' });
            }
          })
          .catch(() => {});
      }
    }
  }

  handleRegisterCheckError(error) {
    this.setState({ error: 'Network Error' });
  }

  // Get the user if is registered
  getUser() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT +
      process.env.REACT_APP_API_ATTENDEES +
      this.props.match.params.id;
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios
      .get(api_endpoint, config)
      .then(res => this.handleUserResponse(res))
      .catch(error => this.handleErrorResponse(error));
  }

  handleUserResponse(res) {
    if (res.data.hasOwnProperty('data')) {
      const user = res.data.data;
      this.setState({
        user,
        filteredBadges: user.badges,
        error: ''
      });
    }
  }

  handleErrorResponse(error) {
    if (error.response && error.response.data.hasOwnProperty('error')) {
      if (
        error.response.data.error === 'invalid_token' ||
        error.response.data.error === 'unauthenticated'
      ) {
        window.location.pathname = '/login';
      } else if (error.response.data.error === 'Internal Server Error') {
        // lmao 500
      }
    } else {
      this.setState({ error: 'Network Error' });
    }
  }

  filterBadges(value, badges) {
    const filteredBadges = badges.filter(e =>
      e.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ filteredBadges });
  }

  render() {
    const avatar =
      this.state.user.avatar && this.state.user.avatar.includes('missing')
        ? attendee_missing
        : this.state.user.avatar;
    return (
      <Box>
        {this.state.error === '' ? (
          <Box
            align="center"
            pad={{ horizontal: 'medium', bottom: 'medium', top: 'medium' }}
            gap="medium"
          >
            <Heading level="1" alignSelf="center">
              {this.state.user.nickname}
            </Heading>
            <Image width="300em" src={avatar} />
            <Heading level="2" alignSelf="center">
              Badges
            </Heading>
            <TextInput
              ref="search"
              placeholder="Search badge name..."
              onChange={() => {
                this.filterBadges(
                  this.refs.search.value,
                  this.state.user.badges
                );
              }}
            />
            {this.state.filteredBadges.length > 0 ? (
              <BadgeDex
                badges={this.state.filteredBadges}
                allCollected={true}
              />
            ) : (
              <Box pad="large">
                <Text color="#333" alignSelf="center">
                  No badges found...
                </Text>
              </Box>
            )}
          </Box>
        ) : (
          <Box pad="large">
            <Text color="status-critical" alignSelf="center">
              {this.state.error}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
}

export default userInfo(User);
