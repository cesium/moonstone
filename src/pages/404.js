import React, { Component } from 'react';
import { Box, Image, Heading, RoutedButton, Paragraph } from "grommet";
import mascote from "../images/mascot.png";

class NoMatch extends Component {
  render() {
    return (
      <Box fill={true} align="center" pad={{ top: "large", horizontal: "medium" }} gap="large" width="medium" >
        <Heading level="1" size="xlarge" color="dark-4">Oops!</Heading>
        <Heading level="3">Error code: 404</Heading>
        <Paragraph margin="none">
          Mistakes are the portals of discovery. But we'd rather you use our <RoutedButton path="/"><Heading color="brand" level="4">homepage</Heading></RoutedButton>.
        </Paragraph>
        <Box>
          <Image src={mascote} width="auto" height="auto" fit="contain" />
        </Box>
      </Box>
    );
  }
}

export default NoMatch;

