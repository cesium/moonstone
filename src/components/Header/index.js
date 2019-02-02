import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Text, Button, Heading, RoutedButton, Collapsible, Image } from "grommet";
import { Apps } from "grommet-icons";
import { FaAlignJustify, FaUser, FaFlagCheckered, FaHeart, FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa';
import { GoListUnordered, GoDiffAdded } from 'react-icons/go'
import UserData from "../../services/userData.js"
import "./index.css";
import moonstone from "./moonstone-logo.png";
import attendee_missing from '../../images/default/avatar-missing.png';

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
    label: "Claim Badge",
    href: "/referral",
    fa: <GoDiffAdded />
  }
]

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: this.props.size !== "small",
      user: {}
    };
  }

  componentDidMount() {
    this.getUser();
    UserData.prototype.subscribeToStateChange(() => this.getUser());
  }

  getUser() {
    UserData.prototype.getUser()
      .then(user => this.setState({user: user}))
      .catch(e => {});
  }

  static hideAndShow(e) {
    e.preventDefault();
    const sideBar = document.getElementsByClassName('sideBar')[0];
    const show    = document.getElementsByClassName('sideBarLinkShow')[0];
    const hide    = document.getElementsByClassName('sideBarLinkHide')[0];

    if (sideBar.style.display === 'none') {
      sideBar.style.display = 'block';
      show.style.display = 'none';
      hide.style.display = 'block'
    } else {
      sideBar.style.display = 'none';
      show.style.display = 'block';
      hide.style.display = 'none'
    }
  }

  render() {
    const { openMenu } = this.state;
    const loggedIn = localStorage.getItem("jwt") !== null;
    let avatar = this.state.user.avatar && this.state.user.avatar.includes("missing") ?
      attendee_missing : this.state.user.avatar;
    return (
      <Box>
          <Box gridArea="header" onClick={Header.hideAndShow} background="brand" className="sideBarLinkShow">
            <Text><FaAngleDoubleRight /></Text>
          </Box>
          <Box gridArea="header" onClick={Header.hideAndShow} background="brand" className="sideBarLinkHide">
            <Text><FaAngleDoubleLeft /></Text>
          </Box>
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
                        value={"https://moonstone.seium.org/user/" + this.state.user.id}
                      />
                    ) : (
                      <Image src={loggedIn ? avatar : ""} />
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
                <Box>
                  <img className="logo" src={moonstone} alt="Moonstone"/>
                </Box>
                <Box className="copyright">
                  <p>Made with <FaHeart /> by <a href="http://cesium.di.uminho.pt">CeSIUM</a></p>
                </Box>
            </Box>
      </Box>
    );
  }
}

export default Header;

