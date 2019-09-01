import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const StyledTypography = styled(Typography)({
  color: 'black',
  flexGrow: 1,
});

const StyledBox = styled(Box)({
  flexGrow: 1,
});

const StyledToolBar = styled(Toolbar)({
  background: 'transparent',
  shadowBox: 'none',
});


const Entry = ({ name }) => (
  <StyledTypography variant="h6">
    {name}
  </StyledTypography>
  );

const NavBar = () => (
  <StyledBox>
    <StyledToolBar>
      <Entry name="Test1" />
      <Grid
          container
          direction="row-reverse"
          justify="flex-start"
          alignItems="center"
          spacing={1}
      >
        <Grid item>
          <Entry name="Test2" />
        </Grid>
        <Grid item>
          <Entry name="Test3" />
        </Grid>
      </Grid>
    </StyledToolBar>
  </StyledBox>
  );

Entry.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavBar;
