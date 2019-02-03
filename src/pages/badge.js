import React, {Component} from 'react';
import {Box, Image, Text, Heading} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo";
import badge_missing from "../images/default/badge-missing.png";

import "../index.css";

class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badge: {},
      error: ""
    };
  }

  handleBadgesResponse(res) {
    if (res.data.hasOwnProperty("data")) {
      this.setState({badge: res.data.data, error: ""});
    }
  }

  handleErrorResponse(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && error.response.data.error === "unauthenticated")
    {
      window.location.pathname = "/login";
    }
    this.setState({ error: "Network Error" });
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_BADGES + "/" + id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(api_endpoint, config)
      .then(res => this.handleBadgesResponse(res))
      .catch(error => this.handleErrorResponse(error));
  }

  render() {
    const avatar = this.state.badge.avatar && this.state.badge.avatar.includes("missing") ?
      badge_missing : this.state.badge.avatar;
    return (
      <Box>
        {this.state.error === "" ?
            <Box pad={{ horizontal: "medium", bottom: "medium", top: "medium" }} gap="medium">
              <Heading level="1" alignSelf="center">Badge</Heading>
              <Heading level="2" alignSelf="center">{this.state.badge.name}</Heading>
              <Box margin="small" align="center" gap="medium">
                <Image height={this.props.size === "small" ? "187px" : "375px" } src={avatar}/>
                <Text>{this.state.badge.description}</Text>
              </Box>
            </Box>
            :
            <Box pad="large">
              <Text color="status-critical" alignSelf="center">{this.state.error}</Text>
            </Box>
        }
      </Box>);
  }
}
export default userInfo(Badge);

