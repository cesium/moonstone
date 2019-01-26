import React, { Component } from "react";
import { Box, Table, TableBody, TableCell, TableHeader, TableRow,
  Text, Heading, RoutedButton, InfiniteScroll } from "grommet";
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
    if (users.data.hasOwnProperty("data")) {
      var user_v =
        [...Array(100).keys()].map((i) => {return {id: i, nickname: i, badges: [...Array(i).keys()]}});
      // this.setState({users: users.data.data});
      this.setState({users: user_v, error: ""});
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
        <Box>
          <Heading>Leaderboard</Heading>
        </Box>
        <Box justify="center" align="center" pad="xlarge">
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
              <InfiniteScroll items={this.state.users} step={20}>
                {(u, i) => (
                  <TableRow key={i}>
                    <TableCell key={COLUMNS[0]}>
                      <Text weight={u.id === this.props.id ? "bold" : "normal"}>{i}</Text>
                    </TableCell>
                    <TableCell key={COLUMNS[1]}>
                      <RoutedButton path={"/user/" + u.id}>
                        <Text weight={u.id === this.props.id ? "bold" : "normal"}>{u.nickname}</Text>
                      </RoutedButton>
                    </TableCell>
                    <TableCell key={COLUMNS[2]}>
                      <Text weight={u.id === this.props.id ? "bold" : "normal"}>{u.badges.length}</Text>
                    </TableCell>
                  </TableRow>
                )}
              </InfiniteScroll>
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

