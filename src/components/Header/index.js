import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Text, Button, Heading, RoutedButton, Collapsible, Image } from "grommet";
import { Apps } from "grommet-icons";

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
  },
  {
    label: "Claim Badge",
    href: "/referral"
  }
]

class Header extends Component {
  state = {
    openMenu: this.props.size !== "small"
  };

  render() {
    const { openMenu } = this.state;
    const loggedIn = localStorage.getItem("jwt") !== null;
    return (
      <Box gridArea="header" background="brand">
        <Box
          direction="row"
          justify="between"
          align="center"
          pad={{ horizontal: "medium", vertical: "small" }}
        >
          <RoutedButton path="/">
            <Heading level="1">Moonstone</Heading>
          </RoutedButton>
          {this.props.size === "small" && loggedIn ? (
            <Button
              onClick={() => this.setState({ openMenu: !openMenu })}
              icon={<Apps color="light-1" />}
            />
          ) : null}
        </Box>
        {this.props.size !== "small" || loggedIn ?
            <Collapsible direction="vertical" open={openMenu}>
              <Box align="center" pad={{ horizontal: "medium", vertical: "small" }}>
                {this.props.size === "small" ? (
                  <QRCode
                    renderAs="svg"
                    value={"http://intra.seium.org/user/" + this.props.user.id}
                  />
                ) : (
                  <Image src={loggedIn ? this.props.user.avatar : ""} />
                )}
              </Box>
              {PAGES.map((page, i) => (
                <Box key={i} pad={{ horizontal: "medium", vertical: "small" }}>
                  <RoutedButton path={page.href}>
                    <Text color="white" size="large">{page.label}</Text>
                  </RoutedButton>
                </Box>
              ))}
              {loggedIn ?
                  <Box
                    alignContent="end"
                    justify="end"
                    pad={{ horizontal: "medium", vertical: "small", bottom: "medium" }}
                  >
                    <RoutedButton
                      round="true"
                      label={<Text size="medium">Logout</Text>}
                      path="/login"
                      onClick={() => localStorage.removeItem("jwt")}
                    />
                  </Box>
                  : null}
                </Collapsible>
            : null}
          </Box>
    );
  }
}

export default Header;

