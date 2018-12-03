import React from 'react'

import {Grommet} from 'grommet';
import {metro} from "grommet-controls";

import './reset.css'
import './normalize.css'
import './index.css'

const Layout = props => (
  <Grommet theme={metro} full={true}>{props.children}</Grommet>
);

export default Layout
