import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Text, Button, Heading, Anchor, Collapsible } from "grommet";
import { Apps, User } from "grommet-icons";

import "./index.css";

const PAGES = [
  {
    label: "Badges",
    href: "/badgedex"
  },
  {
    label: "Rank",
    href: "/rank"
  },
  {
    label: "Account",
    href: "/user"
  }
]

class Header extends Component {
  constructor(props) {
    super(props);
    this.onClickReferral = this.onClickReferral.bind(this);
  }
  state = {
    openMenu: true
  };

  onClickReferral(){
    window.location.pathname = "/referral";
  }

  render() {
    const { openMenu } = this.state;
    return (
      <Box gridArea="header" background="brand">
        <Box
          direction="row"
          justify="between"
          align="center"
          pad={{ horizontal: "medium", vertical: "small" }}
        >
          <Heading level="1">Moonstone</Heading>
          {this.props.size === "small" ? (
            <Button
              onClick={() => this.setState({ openMenu: !openMenu })}
              icon={<Apps color="light-1" />}
            />
          ) : null}
        </Box>
        <Collapsible direction="vertical" open={openMenu}>
          <Box align="center" pad={{ horizontal: "medium", vertical: "small" }}>
            {this.props.size === "small" ? (
              <QRCode renderAs="svg" value="http://seium.org" />
            ) : (
              <User color="light-1" size="xlarge" />
            )}
          </Box>
          {PAGES.map((page, i) => (
            <Box key={i} pad={{ horizontal: "medium", vertical: "small" }}>
              <Anchor
                label={
                  <Text color="white" size="large">
                    {page.label}
                  </Text>
                }
                href={page.href}
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
              label={<Text size="medium">Claim Badge</Text>}
              onClick={this.onClickReferral}
            />
          </Box>
        </Collapsible>
      </Box>
    );
  }
}

export default Header;

