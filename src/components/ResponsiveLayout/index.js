import React, { Component } from "react";

import Header from "../Header";
import { Box, Grid, ResponsiveContext } from "grommet";

import "./index.css";

class ResponsiveLayout extends Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size =>
          size !== "small" ? (
            <Grid
              fill
              rows={["full"]}
              columns={["1/4", "3/4"]}
              areas={[
                { name: "header", start: [0, 0], end: [0, 0] },
                { name: "nav", start: [1, 0], end: [1, 0] }
              ]}
            >
              <Header size={size} />
              {React.Children.map(this.props.children, child =>
                React.cloneElement(child, {
                  size: size
                })
              )}
            </Grid>
          ) : (
            <Box>
              <Header size={size} />
              {React.Children.map(this.props.children, child =>
                React.cloneElement(child, {
                  size: size
                })
              )}
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    );
  }
}

export default ResponsiveLayout;
