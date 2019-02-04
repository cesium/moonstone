import React, { Component } from "react";

import QRCode from "qrcode.react";
import { Box, Text, RoutedButton, Collapsible, Image, Button } from "grommet";
import { Menu, Logout, Archive, Trophy, AddCircle, User } from 'grommet-icons';

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
    label: "Claim Badge",
    href: "/referral",
    fa: <AddCircle color='white'/>
  }
];

class HorizontalCollapsible extends Component {
  state = {
    openNotification: false,
  };

  render() {
    const { openNotification } = this.state;
    const loggedIn = localStorage.getItem("jwt") !== null;
    return (
      <Box fill>
        <Box
          as="header"
          direction="row"
          align="center"
          pad={{ vertical: "small", horizontal: "medium" }}
          justify="between"
          elevation="large"
          style={{ zIndex: "1000" }}
          className="seiBackground"
        >
          <Button href="/">
            <Image width="100" height="50" src={require('./moonstone-logo.png')} />
          </Button>
          {loggedIn ?
              <Button
                onClick={() => this.setState({ openNotification: !openNotification })}
                icon={<Menu color='white'/>}
              />
              :
              null
          }
        </Box>
        <Box flex direction="row">
          <Collapsible className="fullHeight" direction="vertical" open={openNotification}>
            <Box
              className="fullHeight seiBackground"
              width="xlarge"
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
      user: {},
      userType: "",
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
    UserData.prototype.getType()
      .then(type => this.setState({userType: type, error: ""}))
      .catch(e => {});
  }

  renderEntries(paddingBottom) {
    return (
      <Box>
        {PAGES.map((page, i) => (
          <Box align={paddingBottom === "large" ? "center" : "start"} key={i} pad={{horizontal: "large", bottom: paddingBottom}}>
            <RoutedButton path={page.href}>
              <Text color="white" size="large">{page.fa} {page.label}</Text>
            </RoutedButton>
          </Box>
        ))}
      </Box>
    )
  }

  render() {
    var content;
    if(this.state.userType && this.state.userType === "attendee"){
      let avatar = this.state.user && this.state.user.avatar && this.state.user.avatar.includes("missing") ?
        attendee_missing : this.state.user.avatar;
      content = (
        <Box>
          <Box pad={{ horizontal: "small", bottom: "medium" }}>
            {this.props.size === "small" ? (
              <Box align="center" pad={{vertical: "large"}} >
                <QRCode
                  renderAs="svg"
                  value={process.env.REACT_APP_BASE_URL + "user/" + this.state.user.id}
                />
              </Box>
            ) : (
              <Box align="center">
                <RoutedButton path={"/"} pad={{ bottom: "medium" }}>
                  <Image width="250" height="130" src={require('./moonstone-logo.png')} />
                </RoutedButton>
                {/* <RoutedButton path={"/user/" + this.state.user.id} > */}
                  <Box >
                    <Image height="200em" className="avatar" src={avatar}/>
                  </Box>
                {/* </RoutedButton> */}
              </Box>
            )}
          </Box>
          {this.props.size === "small" ?
            <Box>
              <Box align="center" pad={{ horizontal: "large", bottom: "large" }}>
                <RoutedButton path={"/user/" + this.state.user.id}>
                  <Text color="white" size="large"><User color='white' /> Account</Text>
                </RoutedButton>
              </Box>
              {this.renderEntries("large")}

            </Box>
            :
            <Box>
              <Box align="" pad={{ horizontal: "large", bottom: "xsmall" }}>
                <RoutedButton path={"/user/" + this.state.user.id}>
                  <Text color="white" size="large"><User color='white' /> Account</Text>
                </RoutedButton>
              </Box>
              {this.renderEntries("xsmall")}
            </Box>
          }
          <Box
            alignContent="end"
            justify="end"
            pad={{ horizontal: "large" }}
            align={this.props.size === "small" ? "center" : "start"}
          >
            <RoutedButton
              path="/login"
              onClick={() => localStorage.removeItem("jwt")}
            >
              <Text color="white" size="large"><Logout color='white'/> Logout</Text>
            </RoutedButton>
          </Box>
        </Box>
      );
    } else {
      content = (
        <Box>
          <Box pad={{ horizontal: "small", bottom: "medium" }}>
            {this.props.size === "small" ? (
              <Box pad={{top: "large"}} >
                <QRCode
                  renderAs="svg"
                  value={process.env.REACT_APP_BASE_URL + "user/" + this.state.user.id}
                />
              </Box>
            ) : (
              <Box align="center">
                <RoutedButton path={"/"} pad={{ bottom: "medium" }}>
                  <Image width="250" height="130" src={require('./moonstone-logo.png')} />
                </RoutedButton>
              </Box>
            )}
          </Box>
          <Box
            alignContent="end"
            justify="end"
            pad={{ horizontal: "large" }}
            align={this.props.size === "small" ? "center" : "start"}
          >
            <RoutedButton
              path="/login"
              onClick={() => localStorage.removeItem("jwt")}
            >
              <Text color="white" size="large"><Logout color='white'/> Logout</Text>
            </RoutedButton>
          </Box>
        </Box>
      );
    }

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

