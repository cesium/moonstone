import React, { Component } from "react";
import { Account } from "../components";
import userInfo from "../containers/userInfo";

import "../index.css";

class IndexPage extends Component {
  render() {
    if(localStorage.getItem("jwt")){
      return <Account size={this.props.size} />;
    } else {
      window.location.pathname = "/login";
    }
  }
}
export default userInfo(IndexPage);

