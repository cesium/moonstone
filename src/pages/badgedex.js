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

  handleBadgesResponse(res) {
    if (res.data.hasOwnProperty("data")) {
      this.setState({badges: res.data.data, error: ""});
    }
  }

  handleErrorResponse(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && error.response.data.error === "unauthenticated")
    {
      window.location.pathname = "/login";
    } else {
      this.setState({ error: "Network Error" });
    }
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
      .then(res => this.handleBadgesResponse(res))
      .catch(error => this.handleErrorResponse(error));
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
                <Box margin="small" align="center" width="small">
                  <Image width="150em" src={b.avatar} href={"/badgedex/" + b.id}/>
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

