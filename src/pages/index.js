import React, { Component } from "react";
import { Home } from "../components";
import QRCode from "qrcode.react";
import { Box, Text, Grid, Button, Heading } from "grommet";
import { Sidebar } from "grommet-controls";

export default class IndexPage extends Component {
  render() {
    return (
      <Grid
        fill
        rows={["full"]}
        columns={["1/4", "3/4"]}
        areas={[
          { name: "header", start: [0, 0], end: [0, 0] },
          { name: "nav", start: [1, 0], end: [1, 0] }
        ]}
      >
        <Box gridArea="header" background="neutral-4">
          <Box pad={{ horizontal: "medium", vertical: "small" }}>
            <Heading level="1">Moonstone</Heading>
          </Box>
          <Box center pad={{ horizontal: "medium", vertical: "small" }}>
            <QRCode renderAs="svg" value="http://seium.org" />
          </Box>
          {["Badges", "Rank", "Account"].map(name => (
            <Button key={name} hoverIndicator={{ background: "light-5" }}>
              <Box pad={{ horizontal: "medium", vertical: "small" }}>
                <Text size="large">{name}</Text>
              </Box>
            </Button>
          ))}
        </Box>
        <Box gridArea="nav" background="light-1" />
      </Grid>
    );
  }
}

