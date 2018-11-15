import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Navbar, Footer } from '../components'
import {Grommet, grommet} from 'grommet';
import { metro } from "grommet-controls";
import { deepMerge } from "grommet/utils";

import './reset.css'
import './normalize.css'
import './index.css'

// const customTheme = deepMerge(metro, {
//   global: {
//     breakpoints: {
//       small: {
//         value: 300
//       },
//       medium: undefined,
//     }
//   }
// });

const Layout = props => (
  <Grommet theme={metro} full={true}>{props.children}</Grommet>
)

export default Layout
