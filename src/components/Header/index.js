import React, { Component } from "react";

import { Link } from 'react-router-dom';

import "./index.css";

export default class Header extends Component {
  render() {
    return (
      <div>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </div>
    );
  }
}
