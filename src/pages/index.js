import React, { Component } from "react";
import { Account } from "../components";
import userInfo from "../containers/userInfo";

class IndexPage extends Component {
  render() {
    return (
      <Account size={this.props.size} user={this.props.user} />
    );
  }
}
export default userInfo(IndexPage);

