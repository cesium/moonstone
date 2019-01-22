import React, {Component} from 'react';
import {Box, Image, Text, Heading, Anchor} from "grommet";
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
    }
    this.setState({ error: "Network Error" });
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

  render() {
    return (
      <Box
        pad={{ horizontal: "medium", bottom: "large", top: "medium" }}
      >
        <Heading alignSelf="center">BadgeDex</Heading>
        <Box
          pad={{ horizontal: "medium", bottom: "medium" }}
          justify="start"
          direction="row"
          wrap="true"
        >
          {
            this.state.badges.map((b, i) => (
              <Anchor key={i} href={"/badgedex/" + b.id}>
                <Box margin="small" align="center" border="all">
                  <Image width="150em" src={b.avatar} href={"/badgedex/" + b.id}/>
                  <Text truncate={true}>{b.description}</Text>
                </Box>
              </Anchor>
            ))
          }
          <Box pad="large">
            <Text color="status-critical">{this.state.error}</Text>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default userInfo(BadgeDex);

