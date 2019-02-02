import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Heading, Meter, Image } from "grommet";
import { Achievement } from "grommet-icons";
import "./index.css";
import UserData from '../../services/userData.js'

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: ""
    }
  }

  handleError(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && error.response.data.error === "unauthenticated")
    {
      window.location.pathname = "/login";
    }
    this.setState({ error: "Network Error" });
  }

  componentDidMount() {
    UserData.prototype.getUser()
      .then(user => this.setState({user: user, error: ""}))
      .catch(e => this.handleError(e));
  }

  render() {
    return (
      <Box full fill={true} gridArea="nav" background="light-1">
        <Box align="center" pad={{ top: "large", bottom: "medium" }}>
          {this.props.size !== "small" ? (
            <QRCode
              renderAs="svg"
              value={"https://intra.seium.org/user/" + this.state.user.id}
            />
          ) : (
            <Image src={this.state.user.avatar} />
          )}
        </Box>
        <Box align="center">
          <Heading magin="xlarge" level="2">
            {this.state.user.nickname}
          </Heading>
          <Heading level="3">{this.state.user.email}</Heading>
        </Box>
        <Box align="center" basis="xsmall" pad={{ vertical: "medium" }}>
          <Meter
            size="small"
            type="circle"
            values={[
              {
                color: "brand",
                label: "First",
                value: 20 // number of user badges
              },
              {
                color: "light-4",
                label: "Second",
                value: 80
              }
            ]}
          />
        </Box>
        <Box
          pad={{ horizontal: "medium", bottom: "medium" }}
          justify="center"
          direction="row"
        >
          {[...Array(10).keys()].map((i) => (
            <Box direction="row" basis="xxsmall" align="center">
              <Achievement />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

export default Account;

