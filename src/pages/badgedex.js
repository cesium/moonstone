import React, {Component} from 'react';
import {Box, Image, Text, Heading, RoutedButton, InfiniteScroll} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo";
import UserData from "../services/userData.js";
import badge_missing from "../images/default/badge-missing.png";

import "../index.css";

class BadgeDex extends Component {
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
        <Box
          pad={{ horizontal: "medium", bottom: "medium" }}
          justify="center"
          direction="row"
          wrap={true}
        >
          {this.state.badges.map((b, i) => {
            const avatar = b.avatar.includes("missing") ? badge_missing : b.avatar;
            return (
              <RoutedButton key={i} path={"/badgedex/" + b.id}>
                <Box
                  align="center"
                  width="small"
                  margin="small"
                >
                  <Image
                    style={{opacity: b.collected ? 1 : 0.2}}
                    width="150em"
                    src={avatar}
                  />
                  <Text
                    color={b.collected ? "dark-4" : "light-4" }
                  >
                    {"#" + ('000' + b.id).slice(-3)}
                  </Text>
                  <Text
                    color={b.collected ? "" : "light-4" }
                    textAlign="center"
                  >
                    {b.name}
                  </Text>
                </Box>
              </RoutedButton>
            );})}
            <Box pad="large">
              <Text color="status-critical">{this.state.error}</Text>
            </Box>
          </Box>
        </Box>
    );
  }
}

export default userInfo(BadgeDex);

