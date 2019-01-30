import React, {Component} from 'react';
import {Box, Image, Text, Heading, RoutedButton, InfiniteScroll, FormField,
  Button, TextInput} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo.js";
import ImageUpload from "../components/ImageUpload/index.js";
import {Edit, Checkmark} from "grommet-icons";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: "",
      edit_username: false,
      new_username: "",
      edit_avatar: false
    };
    this.swapEditUsername = this.swapEditUsername.bind(this);
    this.swapEditAvatar = this.swapEditAvatar.bind(this);
  }

  handleUserResponse(res) {
    if (res.data.hasOwnProperty("data")) {
      this.setState({user: res.data.data, error: ""});
    }
  }

  handleErrorResponse(error) {
    if (error.response
      && error.response.data.hasOwnProperty("error")
      && (error.response.data.error === "unauthenticated"
        || error.response.data.error === "invalid_token"))
    {
      window.location.pathname = "/login";
    }
    this.setState({ error: "Network Error" });
  }

  swapEditUsername() {
    this.setState({edit_avatar: false, edit_username: !this.state.edit_username});
  }

  swapEditAvatar() {
    this.setState({edit_username: false, edit_avatar: !this.state.edit_avatar});
  }

  onChangeUsername(event) {
    this.setState({new_username: event.target.value});
  }

  editUsername(event) {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_ATTENDEES
      + this.props.user.id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.post(api_endpoint, config)
      .then(res => this.handleUserResponse(res))
      .catch(error => this.handleErrorResponse(error));
  }

  componentDidMount() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT
      + process.env.REACT_APP_API_ATTENDEES
      + this.props.user.id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(api_endpoint, config)
      .then(res => this.handleUserResponse(res))
      .catch(error => this.handleErrorResponse(error));
  }

  truncateName(name) {
    const maxLen = 15;
    return name.length > maxLen ? name.substring(0, maxLen) + "..." : name;
  }

  render() {
    const placeholder = "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.newdesignfile.com%2Fpostpic%2F2013%2F05%2Fgeneric-user-icon-windows_166129.png&f=1";
    return (
      <Box>
        {this.state.error === "" ?
            <Box pad={{ horizontal: "medium", bottom: "medium", top: "medium" }} gap="medium">
              {this.state.edit_username ?
                  <Box direction="row" justify="center">
                    <FormField>
                      <TextInput
                        size="xlarge"
                        placeholder={this.state.user.nickname}
                        onChange={this.updateNewUsername}
                      />
                    </FormField>
                    <Button
                      type="submit"
                      icon={<Edit />}
                      color="brand"
                      onClick={this.swapEditUsername}
                    />
                    <Button
                      icon={<Checkmark />}
                      onClick={this.editUsername}
                    />
                  </Box>
                  :
                  <Box justify="center" direction="row">
                    <Heading level="1" alignSelf="center">{this.state.user.nickname}</Heading>
                    <Button icon={<Edit />} border="" onClick={this.swapEditUsername} />
                  </Box>
              }
              <Box margin="small" align="center" gap="medium">
                <Image fit="contain" src={placeholder/*this.state.user.avatar*/}/>
                <ImageUpload
                  id={this.props.user.id}
                  success={s => console.log(s)}
                  error={e => console.log(e)}
                />
              </Box>
              <Heading level="2" alignSelf="center">Badges</Heading>
              <Box
                pad={{ horizontal: "medium", bottom: "medium" }}
                justify="start"
                direction="row"
                wrap={true}
              >
                <InfiniteScroll items={this.state.user.badges} step={30} >
                  {(b, i) => (
                    <RoutedButton key={i} path={"/badgedex/" + b.id}>
                      <Box align="center" width="small">
                        <Image width="150em" src={b.avatar}/>
                        <Text>{this.truncateName(b.name)}</Text>
                      </Box>
                    </RoutedButton>
                  )}
                </InfiniteScroll>
              </Box>
            </Box>
            :
            <Box pad="large">
              <Text color="status-critical" alignSelf="center">{this.state.error}</Text>
            </Box>
        }
      </Box>
    );
  }
}

export default userInfo(Profile);

