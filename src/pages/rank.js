import React, { Component } from "react";
import { Box, Table, TableBody, TableCell, TableHeader, TableRow,
  Text, Heading } from "grommet";
import axios from "axios";
import userInfo from "../containers/userInfo";

const COLUMNS = ["Rank", "Name", "Badges"];

class RankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: ""
    };
  }

  handleLeaderBoard(users) {
    console.log(this.props);
    if (users.data.hasOwnProperty("data")) {
      let board = users.data.data.map((u, i) => (
        <TableRow key={i}>
          <TableCell key={COLUMNS[0]}>
            <Text weight={u.id === this.props.id ? "bold" : "normal"}>{i}</Text>
          </TableCell>
          <TableCell key={COLUMNS[1]}>
            <Text weight={u.id === this.props.id ? "bold" : "normal"}>{u.nickname}</Text>
          </TableCell>
          <TableCell key={COLUMNS[2]}>
            <Text weight={u.id === this.props.id ? "bold" : "normal"}>{u.badges.length}</Text>
          </TableCell>
        </TableRow>
      ));
      this.setState({users: board});
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
  }

  render() {
    return (
      <Box align="center" pad="medium">
        <Heading>Leaderboard</Heading>
        <Box justify="center" align="center" pad="xlarge" gap="medium">
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
              {this.state.users}
            </TableBody>
          </Table>
          <Box>
            <Text color="status-critical">{this.state.error}</Text>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default userInfo(RankPage);

