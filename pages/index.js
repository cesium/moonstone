import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';

const Index = () => (
  <Layout>
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1">
          moonstone v2
        </Typography>
      </Box>
    </Container>
  </Layout>
  );

export default Index;
