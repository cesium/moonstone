import React, { Component } from "react";

import { Box, Heading, RoutedButton, Image } from "grommet";
import "./index.css";
import logo from "../../pages/logo.png";

class Welcome extends Component {
  render() {
    return (
      <Box pad={{left:"small"}} background="light-1">
          <Image align="center" height="250px" fit="contain" src={logo} />
      </Box>
    );
  }
}

export default Welcome;
