import React, { Component } from "react";
import { Box, Table, TableBody, TableCell, TableHeader, TableRow,
  Text, Heading, RoutedButton, Image } from "grommet";
import axios from "axios";
import userInfo from "../containers/userInfo";

const COLUMNS = ["Avatar", "Rank", "Name", "Badges"];

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
  }

  render() {
    var id = this.props.user.id ;
    var rank = this.state.users.findIndex(user => user.id === id);
    var myUser = this.state.users[rank];
    let showRank;
    if(rank > 9) {
      showRank = <TableRow key={rank}>
        <TableCell key={COLUMNS[0]} verticalAlign="middle">
          <Image style={{height: 25}} src={myUser.avatar} />
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
    return (
      <Box className="content" align="center" pad="medium">
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
                {this.state.users.slice(0, 10).map((u, i) => {
                  let weight = u.id === this.props.user.id ? "bold" : "normal";
                  return (
                    <TableRow key={i}>
                      <TableCell key={COLUMNS[0]} verticalAlign="middle">
                        <Image style={{height: 25}} src={u.avatar} />
                      </TableCell>
                      <TableCell key={COLUMNS[1]}>
                        <Text weight={weight}>{i+1}</Text>
                      </TableCell>
                      <TableCell key={COLUMNS[2]}>
                        <RoutedButton path={"/user/" + u.id}>
                          <Text weight={weight}>{u.nickname}</Text>
                        </RoutedButton>
                      </TableCell>
                      <TableCell key={COLUMNS[3]}>
                        <Text weight={weight}>{u.badges}</Text>
                      </TableCell>
                    </TableRow>
                  );})}
                  {showRank}
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

