import React, { Component } from "react";

import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import { Box, Text, Grid, Button, Heading, Anchor, ResponsiveContext, Distribution, 
  Meter, Collapsible} from "grommet";
import { Sidebar } from "grommet-controls";
import { User, Achievement, Apps} from "grommet-icons"

import "./index.css";

export default class Header extends Component {
  state = {
    openMenu: true
  };
  render() {
    const { openMenu } = this.state;
    return (
      <Box gridArea="header" background="brand">     
        <Box direction="row" justify="between" align="center" pad={{ horizontal: "medium", vertical: "small" }}>
          <Heading level="1">Moonstone</Heading>
          {this.props.size === "small" ? <Button
              onClick={() =>
                this.setState({ openMenu: !openMenu })
              }
              icon={<Apps color="light-1"/>}
            /> : null}
        </Box>
        <Collapsible direction="vertical" open={openMenu}>
          <Box align="center" pad={{ horizontal: "medium", vertical: "small" }}>
            {this.props.size === "small" ? 
              <QRCode renderAs="svg" value="http://seium.org" /> : 
              <User color="light-1" size="xlarge" />
            }
          </Box>
          {["Badges", "Rank", "Account"].map(name => (
            // <Button type="button" key={name} hoverIndicator={{ background: "neutral-1" }} >
            <Box pad={{ horizontal: "medium", vertical: "small" }}>
              <Anchor
                label={
                  <Text color="white" size="large">
                    {name}
                  </Text>
                }
              />
            </Box>
          ))}
          <Box
            alignContent="end"
            justify="end"
            pad={{ horizontal: "medium", vertical: "small", bottom: "medium" }}
          >
            <Button
              round="true"
              label={<Text size="medium">Request Badge</Text>}
              onClick={() => {}}
            />
          </Box>
        </Collapsible>
      </Box>
    );
  }
}
