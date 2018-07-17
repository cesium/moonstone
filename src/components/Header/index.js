import React from "react";

import "./index.css"

import { Link } from 'react-router-dom';

const Header = () => (
      <div>
        <nav>
          <Link to='/'>Home</Link>
        </nav>
      </div>
);

export default Header;
