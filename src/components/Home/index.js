import React, {Component} from "react";
import {Box, Heading, Meter} from "grommet";
import {User, Achievement} from "grommet-icons"
import "./index.css";


export default class Home extends Component {
  render() {
    return (
      <Box full fill={true} gridArea="nav" background="light-1">
        <Box align="center" pad={{top: "large", bottom: "medium"}}>
          <User color="brand" size="xlarge"/>
        </Box>
        <Box align="center">
          <Heading magin="xlarge" level="2">
            Username
          </Heading>
          <Heading level="3">{this.props.email}</Heading>
        </Box>
        <Box align="center" basis="xsmall" pad={{vertical: "medium"}}>
          <Meter
            size="small"
            type="circle"
            values={[
              {
                color: "brand",
                label: "First",
                value: 20 // number of user badges
              },
              {
                color: "light-4",
                label: "Second",
                value: 80
              }
            ]}
          />
        </Box>
        <Box
          pad={{horizontal: "medium", bottom: "medium"}}
          justify="center"
          direction="row"
        >
          {[...Array(10).keys()].map(() => (
            <Box direction="row" basis="xxsmall" align="center">
              <Achievement/>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}
