import React, { Component } from "react";
import { Box, Table, TableBody, TableCell, TableHeader, TableRow,
  Text, RoutedButton, Image } from "grommet";
import {Tabs, Tab} from 'grommet';
import axios from "axios";
import userInfo from "../containers/userInfo";
import UserData from "../services/userData.js";
import attendee_missing from "../images/default/avatar-missing.png";

const COLUMNS = ["Avatar", "Rank", "Name", "Badges"];

class AttendeeTable extends Component {

  render() {
    const id = this.props.state.id;
    const users = this.props.state.users.filter(e => this.props.learderboard ? !e.volunteer : e.volunteer);
    const rank = users.findIndex(user => user.id === id);
    let myUser;
    let showRank;
    if(rank > 0) {
      myUser = this.props.state.users[rank];
      if(rank > 9 && this.props.learderboard ? myUser.volunteer : !myUser.volunteer) {
        const avatar = myUser.avatar.includes("missing") ? attendee_missing : myUser.avatar;
        showRank = <TableRow key={rank}>
          <TableCell key={COLUMNS[0]} verticalAlign="middle">
            <Image style={{height: 25}} src={avatar} />
          </TableCell>
          <TableCell key={COLUMNS[1]}>
            <Text weight="bold">{rank+1}</Text>
          </TableCell>
          <TableCell key={COLUMNS[2]}>
            <RoutedButton path={"/user/" + myUser.id}>
              <Text weight="bold">{myUser.nickname}</Text>
            </RoutedButton>
          </TableCell>
          <TableCell key={COLUMNS[3]}>
            <Text weight="bold">{myUser.badges}</Text>
          </TableCell>
        </TableRow>;
      }
    }
    return (
      <Box>
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map(n => (
                <TableCell key={n} scope='col' border='bottom' >
                  <Text>{n}</Text>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 10).map((u, i) => {
              const weight = u.id === this.props.state.id ? "bold" : "normal";
              const avatar = u.avatar.includes("missing") ? attendee_missing : u.avatar;
              const fontSize = this.props.size === "small" ? "small" : "large";
              return (
                <TableRow key={i}>
                  <TableCell key={COLUMNS[0]} verticalAlign="middle">
                    <RoutedButton path={"/user/" + u.id}>
                      <Image style={{height: 25}} src={avatar} />
                    </RoutedButton>
                  </TableCell>
                  <TableCell key={COLUMNS[1]}>
                    <Text weight={weight} size={fontSize}>{i+1}</Text>
                  </TableCell>
                  <TableCell key={COLUMNS[2]}>
                    <RoutedButton path={"/user/" + u.id}>
                      <Text weight={weight} size={fontSize}>{u.nickname}</Text>
                    </RoutedButton>
                  </TableCell>
                  <TableCell key={COLUMNS[3]}>
                    <Text weight={weight} size={fontSize}>{u.badges}</Text>
                  </TableCell>
                </TableRow>
              );})}
              {showRank}
            </TableBody>
          </Table>
          <Box>
            <Text color="status-critical">{this.props.state.error}</Text>
          </Box>
        </Box>
    )
  }
}

class RankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: "",
      error: "",
    };
  }

  handleLeaderBoard(users) {
    if (users.data.hasOwnProperty("data")) {
      this.setState({users: users.data.data, error: ""});
    }
  }

  handleError(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && error.response.data.error === "unauthenticated")
    {
      window.location.pathname = "/login";
    }
    this.setState({ error: "Network Error" });
  }

  componentDidMount() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_LEADERBOARD
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(api_endpoint, config)
      .then(res => this.handleLeaderBoard(res))
      .catch(error => this.handleError(error));
    UserData.prototype.getId()
      .then(id => {
        this.setState({id: id});
      })
      .catch(error => this.handleError(error));
  }

  render() {
    return (
      <Box align="center" pad="medium">
        <Tabs>
          <Tab title="Leaderboard">
            <AttendeeTable state={this.state} learderboard={true} size={this.props.size}/>
          </Tab>
          <Tab title="Hall Of Fame">
            <AttendeeTable state={this.state} learderboard={false} size={this.props.size}/>
          </Tab>
        </Tabs>
      </Box>
    );
  }
}

export default userInfo(RankPage);

