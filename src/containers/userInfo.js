import React, { Component } from "react";
import ResponsiveLayout from "../components/ResponsiveLayout";

export default WrappedComponent =>
  class userInfo extends Component {
    render() {
      return <ResponsiveLayout ><WrappedComponent match={this.props.match}/></ResponsiveLayout>;
    }
  };

