/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Box, Image } from 'grommet';

class TeamImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamDetails: [],
    };
  }

  componentDidMount() {
    console.log(this.props.start);
    console.log(this.props.end);
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/40130162/lookupteam.php?id=${this.props.teamID}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ teamDetails: data.teams[0] });
        console.log(data);
      });
  }

  render() {
    const team = this.state.teamDetails;
    return (
      <Box align={this.props.start ? this.props.start : this.props.end} justify="end" height="xxsmall" width="small">
        <Image
          alignSelf={this.props.start ? this.props.start : this.props.end}
          fit="contain"
          src={team.strTeamBadge}
        />
      </Box>
    );
  }
}

export default TeamImg;
