import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Heading, Meter } from "grommet";
import { User, Achievement } from "grommet-icons";
import "./index.css";

class Account extends Component {
  render() {
    return (
      <Box full fill={true} gridArea="nav" background="light-1">
        <Box align="center" pad={{ top: "large", bottom: "medium" }}>
          {this.props.size !== "small" ? (
            <QRCode renderAs="svg" value="http://seium.org" />
          ) : (
            <User color="brand" size="xlarge" />
          )}
        </Box>
        <Box align="center">
          <Heading magin="xlarge" level="2">
            Username
          </Heading>
          <Heading level="3">{this.props.user.email}</Heading>
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
          {[...Array(10).keys()].map(() => (
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

