import React, { Component } from "react";

import { Header, Footer } from "../../components";

import "./index.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>SEI 2019</h1>
        <Footer />
      </div>
    );
  }
}
