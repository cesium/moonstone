import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Navbar, Footer } from '../components'
import {Grommet, grommet} from 'grommet';

import './reset.css'
import './normalize.css'
import './index.css'

const Layout = props => (
  <Grommet theme={grommet} full>{props.children}</Grommet>
)

export default Layout
