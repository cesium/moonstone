import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Text, Button, Heading, RoutedButton, Collapsible, Image } from "grommet";
import { Apps } from "grommet-icons";
import { FaAlignJustify, FaUser, FaFlagCheckered } from 'react-icons/fa';
import { GoListUnordered, GoDiffAdded } from 'react-icons/go'

import "./index.css";

const PAGES = [
  {
    label: "Badges",
    href: "/badgedex",
    fa: <GoListUnordered />
  },
  {
    label: "Rank",
    href: "/rank",
    fa: <FaFlagCheckered />
  },
  {
    label: "Account",
    href: "/user",
    fa: <FaUser />
  },
  {
    label: "Claim Badge",
    href: "/referral",
    fa: <GoDiffAdded />
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
      <Box gridArea="header" background="brand" className="sideBar">
        <Box
          direction="row"
          justify="between"
          align="center"
          pad={{ horizontal: "medium", vertical: "small" }}
        >
          <RoutedButton path="/">
            <Text className="sideBarHome"><FaAlignJustify /> Home</Text>
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
                    value={"https://intra.seium.org/user/" + this.props.user.id}
                  />
                ) : (
                  <Image src={loggedIn ? this.props.user.avatar : ""} />
                )}
              </Box>
              {PAGES.map((page, i) => (
                <Box className="textDiv" key={i} pad={{ horizontal: "medium", vertical: "small" }}>
                  <RoutedButton path={page.href}>
                    <Text color="white" size="large">{page.fa} {page.label}</Text>
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

