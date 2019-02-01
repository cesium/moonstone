import React, {Component} from 'react';
import {Box, Button, FormField, Text, TextInput} from "grommet";
import axios from 'axios';
import userInfo from "../containers/userInfo";

class ReferralPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      response: "",
      hasErrors: false
    };
    this.requestCode = this.requestCode.bind(this);
  }

  onChangeCode(event) {
    this.setState({code: event.target.value});
  }

  handleCodeRequest(res) {
    if (res.data.hasOwnProperty("referral")) {
      this.setState({response: res.data.referral, hasErrors: false});
    } else {
      this.setState({response: "Error", hasErrors: true});
    }
  }

  handleErrorResponse(error) {
    if (error.hasOwnProperty("response")) {
      if (error.response.data.hasOwnProperty("referral")) {
        this.setState({response: error.response.data.referral});
      } else if (error.response.data.hasOwnProperty("errors")
        && error.response.data.errors.hasOwnProperty("unique_attendee_badge")){
        this.setState({response: error.response.data.errors.unique_attendee_badge[0]});
      } else {
        this.setState({response: "Error"});
      }
    }else {
      this.setState({response: "Error"});
    }
    this.setState({hasErrors: true});
  }

  requestCode() {
    const api_endpoint =
      process.env.REACT_APP_ENDPOINT + process.env.REACT_APP_API_REFERRALS + this.state.code;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(api_endpoint, config)
      .then(res => this.handleCodeRequest(res))
      .catch(error => this.handleErrorResponse(error));
  }

  render() {
    return (
      <Box className="content"
        justify="center"
        align="center"
        pad="xlarge"
        gap="medium"
      >
        <Box alignSelf='center'>
          <FormField label="Referral Code">
            <TextInput
              size='xlarge'
              onChange={e => this.onChangeCode(e)}
            />
          </FormField>

          <Button
            type="submit"
            label='Claim'
            color='brand'
            primary
            onClick={this.requestCode}
          />
        </Box>

        <Box>
          {this.state.hasErrors ?
              (<Text color='status-critical'>{this.state.response}</Text>)
              :
              (<Text color='status-ok'>{this.state.response}</Text>)
          }
        </Box>
      </Box>
    );
  }
}

export default userInfo(ReferralPage);

