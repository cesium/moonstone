import React, {Component} from 'react';
import {Box, Image, Heading, RoutedButton} from "grommet";
import meme from "../images/404.jpg";

class NoMatch extends Component {
  render() {
    return (
      <Box fill={true} align="center" pad={{top: "large", horizontal: "medium"}} gap="large" width="medium" >
        <Heading textAlign="center" level="1">404, go <RoutedButton path="/"><Heading color="brand">home</Heading></RoutedButton> you're drunk!</Heading>
        <Box>
          <Image src={meme} width="auto" height="auto" fit="contain"/>
        </Box>
      </Box>);
  }
}

export default NoMatch;

