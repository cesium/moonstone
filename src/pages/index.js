import React, { Component } from "react";
import { Home, Header } from "../components";
import QRCode from "qrcode.react";
import { Box, Text, Grid, Button, Heading, Anchor, ResponsiveContext, Distribution, 
  Meter} from "grommet";
import { Sidebar } from "grommet-controls";
import userInfo from '../containers/userInfo'
import { User, Achievement } from "grommet-icons"

class IndexPage extends Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
      {size => (
        (size !== "small" ?
          <Grid
              fill rows={["full"]} columns={["1/4", "3/4"]} 
              areas={[
                { name: "header", start: [0, 0], end: [0, 0] },
                { name: "nav", start: [1, 0], end: [1, 0] }
              ]} 
          >
            <Header size={size} />
            <Home size={size} email={this.props.email}/> 
          </Grid>
          : 
          <Box>
            <Header size={size}/>
            <Home size={size} email={this.props.email}/> 
          </Box>
        ) 
      )}
      </ResponsiveContext.Consumer>
    );
  }
}
export default userInfo(IndexPage)