import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Navbar, Footer } from '../components'

import './reset.css'
import './normalize.css'
import './index.css'

const Layout = props => (
  <div className="Layout">
    <Helmet
      // title={'title'}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
    </Helmet>
    <nav className="Layout-navbar">
      {/* <Navbar /> */}
    </nav>
    <div className="Layout-body">{props.children}</div>
    <footer className="Layout-footer">
      {/* <Footer/> */}
    </footer>
  </div>
)

export default Layout
