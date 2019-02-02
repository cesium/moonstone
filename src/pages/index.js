import React, { Component } from "react";
import { Account, Welcome } from "../components";
import userInfo from "../containers/userInfo";

import "../index.css";

class IndexPage extends Component {
  render() {
    if(localStorage.getItem("jwt")){
      return <Account size={this.props.size} />;
    } else {
      return <Welcome size={this.props.size} />
    }
  }
}
export default userInfo(IndexPage);

