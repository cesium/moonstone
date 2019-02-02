import React, {Component} from 'react';
import {Box, Image, Text, Heading, RoutedButton, InfiniteScroll} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo.js";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: ""
    };
  }

  // Check if is registered
  componentDidMount() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_IS_REGISTERED
      + this.props.match.params.id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(api_endpoint, config)
      .then(res => this.handleRegisterCheck(res))
      .catch(error => this.handleRegisterCheckError(error));
  }

  handleRegisterCheck(res) {
    if (res.data.hasOwnProperty("is_registered")) {
      if(res.data.is_registered) {
        this.getUser();
      } else {
        window.location.pathname = "/register/" + this.props.match.params.id;
      }
    }
  }

  handleRegisterCheckError(error) {
    this.setState({ error: "Network Error" });
    console.log(error);

  }

  // Get the user if is registered
  getUser() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_ATTENDEES
      + this.props.match.params.id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(api_endpoint, config)
      .then(res => this.handleUserResponse(res))
      .catch(error => this.handleErrorResponse(error));
  }

  handleUserResponse(res) {
    if (res.data.hasOwnProperty("data")) {
      this.setState({user: res.data.data, error: ""});
    }
  }

  handleErrorResponse(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && (error.response.data.error === "unauthenticated"
        || error.response.data.error === "invalid_token"))
    {
      window.location.pathname = "/login";
    }
    this.setState({ error: "Network Error" });
  }

  truncateName(name) {
    const maxLen = 15;
    return name.length > maxLen ? name.substring(0, maxLen) + "..." : name;
  }

  render() {
    return (
      <Box>
        {this.state.error === "" ?
            <Box pad={{ horizontal: "medium", bottom: "medium", top: "medium" }} gap="medium">
              <Heading level="1" alignSelf="center">{this.state.user.nickname}</Heading>
              <Box margin="small" align="center" gap="medium">
                <Image width="150em" src={this.state.user.avatar}/>
              </Box>
              <Heading level="2" alignSelf="center">Badges</Heading>
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
            :
            <Box pad="large">
              <Text color="status-critical" alignSelf="center">{this.state.error}</Text>
            </Box>
        }
      </Box>
    );
  }
}

export default userInfo(User);

