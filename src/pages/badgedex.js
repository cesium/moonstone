import React, {Component} from 'react';
import {Box, Text, Heading} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo";
import UserData from "../services/userData.js";
import BadgeDex from "../components/BadgeDex/index.js";

import "../index.css";

class BadgeDexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badges: [],
      error: ""
    };
  }

  componentDidMount() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_BADGES;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(api_endpoint, config)
      .then(res => this.handleBadges(res))
      .catch(error => this.handleError(error));
  }

  handleBadges(res) {
    if (res.data.hasOwnProperty("data")) {
      this.setState({badges: res.data.data});
      UserData.prototype.getId()
        .then(id => {
          const api_endpoint =
            process.env.REACT_APP_ENDPOINT
            + process.env.REACT_APP_API_ATTENDEES
            + id;
          let config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
          };
          axios.get(api_endpoint, config)
            .then(response => this.handleUserBadges(res.data.data, response))
            .catch(error => this.handleError(error));
        })
        .catch(e => this.handleError(e));
    }
  }

  handleUserBadges(badges, res) {
    if(res.data.hasOwnProperty("data")) {
      let collected = res.data.data.badges.map(b => b.id);
      badges.forEach(b => b.collected = collected.indexOf(b.id) !== -1);
      badges.sort((a, b) => a.id - b.id);
      this.setState({badges: badges, error: ""});
    }
  }

  handleError(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && (error.response.data.error === "unauthenticated"
        || error.response.data.error === "invalid_token"))
    {
      window.location.pathname = "/login";
    } else {
      this.setState({ error: "Network Error" });
    }
  }

  render() {
    return (
      <Box pad={{ horizontal: "medium", bottom: "large", top: "medium" }} gap="medium">
        <Heading alignSelf="center">BadgeDex</Heading>
        <BadgeDex badges={this.state.badges} />
        <Box pad="large">
          <Text color="status-critical">{this.state.error}</Text>
        </Box>
      </Box>
    );
  }
}

export default userInfo(BadgeDexPage);

