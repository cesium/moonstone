import React, {Component} from 'react';
import {Box, Image, Text, Heading, RoutedButton} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo";
import badge_missing from "../images/default/badge-missing.png";
import attendee_missing from "../images/default/avatar-missing.png";

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
    if(this.state.error === ""){
      return (
        <Box
          pad={{ horizontal: "medium", bottom: "medium", top: "medium" }}
          gap="medium"
          align="center"
        >
          <Heading level="1">Badge</Heading>
          <Heading level="2" textAlign="center">{this.state.badge.name}</Heading>
          <Box flex={false} >
            <Image height={this.props.size === "small" ? "187px" : "375px" } src={avatar}/>
          </Box>
          <Text textAlign="center">{this.state.badge.description}</Text>
          <Heading level="2">Owners</Heading>
          <Box direction="collumn" wrap={true} justify="center">
            {this.state.badge.attendees ? this.state.badge.attendees
                .filter(u => !u.volunteer && u.nickname).map((u, i) =>
                  <RoutedButton key={i} path={"/user/" + u.id} >
                    <Box
                      gap="small"
                      margin="small"
                      align="center"
                      style={{height: "11em", width: "11em"}}
                    >
                      <Box height="11em" justify="center">
                        <Image
                          src={u.avatar.includes("missing") ? attendee_missing : u.avatar}
                          style={{maxHeight: "8em", maxWidth: "15em"}}
                        />
                      </Box>
                      <Text>{u.nickname}</Text>
                    </Box>
                  </RoutedButton>
                )
                :
                null
            }
          </Box>
        </Box>
      );
    } else {
      return (
        <Box pad="large" align="center">
          <Text color="status-critical" textAlign="center">{this.state.error}</Text>
        </Box>
      );
    }
  }
}
export default userInfo(Badge);

