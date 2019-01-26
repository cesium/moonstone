import React, {Component} from 'react';
import {Box, Image, Text, Heading, RoutedButton, InfiniteScroll} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo";

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
      const api_endpoint =
        process.env.REACT_APP_ENDPOINT
        + process.env.REACT_APP_API_ATTENDEES
        + this.props.user.id;
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      };
      axios.get(api_endpoint, config)
        .then(response => this.handleUserBadges(res.data.data, response))
        .catch(error => this.handleError(error));
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
      && error.response.data.error === "unauthenticated")
    {
      window.location.pathname = "/login";
    } else {
      this.setState({ error: "Network Error" });
    }
  }

  truncateName(name) {
    const maxLen = 15;
    return name.length > maxLen ? name.substring(0, maxLen) + "..." : name;
  }

  render() {
    return (
      <Box pad={{ horizontal: "medium", bottom: "large", top: "medium" }} gap="medium">
        <Heading alignSelf="center">BadgeDex</Heading>
        <Box
          pad={{ horizontal: "medium", bottom: "medium" }}
          justify="start"
          direction="row"
          wrap="true"
        >
          <InfiniteScroll items={this.state.badges} step={30} >
            {(b, i) => (
              <RoutedButton key={i} path={"/badgedex/" + b.id}>
                <Box
                  align="center"
                  width="small"
                >
                  <Text>{"#" + ('000' + b.id).slice(-3)}</Text>
                  <Image
                    style={{opacity: b.collected ? 1 : 0.2}}
                    width="150em"
                    src={b.avatar}
                  />
                  <Text>{this.truncateName(b.name)}</Text>
                </Box>
              </RoutedButton>
            )}
          </InfiniteScroll>
          <Box pad="large">
            <Text color="status-critical">{this.state.error}</Text>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default userInfo(BadgeDex);

