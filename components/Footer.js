import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Footer = () => (
  <Box>
    <Grid container justify="center">
      <Typography variant="overline">
        Icons
      </Typography>
    </Grid>
    <Grid container justify="center">
      <Typography variant="overline">
        {'Made with <3 by CeSIUM'}
      </Typography>
    </Grid>
  </Box>
);

export default Footer;
