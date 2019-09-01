import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <Box>
    <Header />
      {children}
    <Footer />
  </Box>
  );

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
