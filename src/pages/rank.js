import React, { Component } from "react";
import { Box, Table, TableBody, TableCell, TableHeader, TableRow,
  Text } from "grommet";
import axios from "axios";

const COLUMNS = ["Rank", "Name", "Badges"];

class RankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  handleLeaderBoard(users) {
    if (users.data.hasOwnProperty("data")) {
      this.setState({users: users.data.data});
    }
  }

  handleError(error) {
    window.location.pathname = "/login";
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
            {this.state.users.map((u, i) => (
              <TableRow key={i}>
                <TableCell key={COLUMNS[0]}>
                  <Text>{i}</Text>
                </TableCell>
                <TableCell key={COLUMNS[1]}>
                  <Text>{u.nickname}</Text>
                </TableCell>
                <TableCell key={COLUMNS[2]}>
                  <Text>{u.badges.length}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default RankPage;

