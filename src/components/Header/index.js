import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Text, RoutedButton, Collapsible, Image, Button } from "grommet";
import { Menu, Logout, Archive, Trophy, User, AddCircle } from 'grommet-icons';

import UserData from "../../services/userData.js"
import "./index.css";
import attendee_missing from '../../images/default/avatar-missing.png';

const PAGES = [
  {
    label: "Badges",
    href: "/badgedex",
    fa: <Archive color='white'/>
  },
  {
    label: "Rank",
    href: "/rank",
    fa: <Trophy color='white'/>
  },
  {
    label: "Account",
    href: "/user",
    fa: <User color='white'/>
  },
  {
    label: "Claim Badge",
    href: "/referral",
    fa: <AddCircle color='white'/>
  }
];

class HorizontalCollapsible extends Component {
  state = {
    openNotification: false
  };

  render() {
    const { openNotification } = this.state;

    return (
      <Box fill>
        <Box
          as="header"
          direction="row"
          align="center"
          pad={{ vertical: "small", horizontal: "medium" }}
          justify="between"
          background={{image: "url(https://seium.org/assets/backgrounds/light-stuff.png)"}}
          elevation="large"
          style={{ zIndex: "1000" }}
        >
          <Button href="/">
            <Image width="100" height="50" src={require('./moonstone-logo.png')} />
          </Button>
          <Button
            onClick={() => this.setState({ openNotification: !openNotification })}
            icon={<Menu color='white'/>}
          />
        </Box>
        <Box flex direction="row">
          <Collapsible className="fullHeight" direction="vertical" open={openNotification}>
            <Box
              className="fullHeight"
              width="xlarge"
              background={{image: "url(https://seium.org/assets/backgrounds/light-stuff.png)"}}
              pad="small"
              elevation="small"
            >
              {this.props.content}
            </Box>
          </Collapsible>
        </Box>
      </Box>
    );
  }
}

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

  render() {
    const loggedIn = localStorage.getItem("jwt") !== null;
    var avatar = "";
    if(loggedIn) {
      avatar = this.state.user.avatar && this.state.user.avatar.includes("missing") ?
        attendee_missing : this.state.user.avatar;
    }

    const content = (
      <Box>
          <Box align="center" pad={{ horizontal: "medium", bottom: "large" }}>
            {this.props.size === "small" ? (
              <Box pad={{top: "large"}} >
                <QRCode
                  renderAs="svg"
                  value={"https://intra.seium.org/user/" + this.props.user.id}
                />
              </Box>
            ) : (
              <Box>
                <Button href="/" pad={{bottom: "large" }}>
                  <Image width="150" height="80" src={require('./moonstone-logo.png')} />
                </Button>
                <Button>
                  <Image width="150" height="150" src={loggedIn ? avatar : ""} />
                </Button>
              </Box>
            )}
          </Box>
          {PAGES.map((page, i) => (
            <Box key={i} pad={{ horizontal: "large", bottom: "large" }}>
              <RoutedButton path={page.href}>
                <Text color="white" size="large">{page.fa} {page.label}</Text>
              </RoutedButton>
            </Box>
          ))}
          {loggedIn ?
            <Box
              alignContent="end"
              justify="end"
              pad={{ horizontal: "large" }}
            >
              <RoutedButton
                path="/login"
                onClick={() => localStorage.removeItem("jwt")}
              >
                <Text color="white" size="large"><Logout color='white'/> Logout</Text>
              </RoutedButton>
            </Box>
            : null}
      </Box>
    );

    return (
      <Box>
          {this.props.size === "small" ?
            <HorizontalCollapsible content={content} className="fullHeight"/>
          :
            <Box gridArea="header" className="sideBar">
              {content}
            </Box>
          }
      </Box>
    );
  }
}

export default Header;

