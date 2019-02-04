import React, { Component } from "react";

import { Box, RoutedButton, Image, Text } from "grommet";
import badge_missing from "../../images/default/badge-missing.png";

class BadgeDex extends Component {
  render() {
    return (
      <Box
          pad={{ horizontal: "medium", bottom: "medium" }}
          justify="center"
          direction="row"
          wrap={true}
      >
        {this.props.badges.map((b, i) => {
          const avatar = b.avatar.includes("missing") ? badge_missing : b.avatar;
          const collected = b.collected || this.props.allCollected;
          return (
            <RoutedButton key={i} path={"/badgedex/" + b.id}>
              <Box
                align="center"
                width="small"
                margin="small"
              >
                <Image
                  style={{opacity: collected ? 1 : 0.2}}
                  width="150em"
                  src={avatar}
                />
                <Box direction="collumn" gap="xsmall">
                <Text
                  color={collected ? "dark-4" : "light-4" }
                >
                  {"#" + ('000' + b.id).slice(-3)}
                </Text>
                {b.type === 0 ? <Text color="accent-1">Joke</Text> : null}
                {b.type === 1 ? <Text color="accent-1">Secret</Text> : null}
                </Box>
                <Text
                  color={collected ? "" : "light-4" }
                  textAlign="center"
                >
                  {b.name}
                </Text>
              </Box>
            </RoutedButton>
          );})}
        </Box>
    );
  }
}

export default BadgeDex;

