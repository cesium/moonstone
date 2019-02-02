import React, { Component } from "react";

import { Box, Heading, RoutedButton, Image } from "grommet";
import "./index.css";

class Welcome extends Component {
  render() {
    return (
      <Box full fill={true} gridArea="nav" background="light-1">
        <Box align="center" height="medium" pad={{ top: "large", bottom: "medium" }}>
          <Image
            height="small"
            src="https://scontent.fopo3-2.fna.fbcdn.net/v/t1.0-9/49686335_917603701762688_6880891607986470912_n.jpg?_nc_cat=102&_nc_ht=scontent.fopo3-2.fna&oh=762c4a2f6da3b09bb5579cb29e0128bb&oe=5CBD39F9"/>
        </Box>
        <Box align="center" gap="small">
          <Heading magin="xlarge" level="2">
            Welcome to Moonstone!
          </Heading>
          <Heading level="3">
            Already have an account?
          </Heading>
          <RoutedButton path="/login">
            <Heading color="brand" level="3">
              Login
            </Heading>
          </RoutedButton>
        </Box>
      </Box>
    );
  }
}

export default Welcome;

