/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import {
  Grommet, Box, Grid,
} from 'grommet';
import React, { Component } from 'react';

import TeamListItem from './TeamListItem';
// import { useParams } from 'react-router-dom';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = { teamData: { teams: [] }, favoritedTeams: [] };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    let { league } = this.props.match.params;
    // const hook = ''
    // if(league === 'NBA')
    // {
    //     hook = 4387;
    if (league === 'English Premier League') {
      league = 'English_Premier_League';
    }
    // {
    //     hook = 4328;
    // } else if(league === 'MLB')
    // {
    //     hook = 4424;
    // } else if(league === 'NHL')
    // {
    //     hook = 4380;
    // }
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/40130162/search_all_teams.php?l=${league}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ teamData: data });
      });
  }

  handleFavorite(idTeam) {
    const { favoritedTeams } = this.state;
    const index = favoritedTeams.indexOf(idTeam);
    const isFavorite = index !== -1;
    if (isFavorite) {
      favoritedTeams.splice(index, 1);
    } else {
      favoritedTeams.push(idTeam);
    }
    this.setState({ favoritedTeams });
  }

  render() {
    const ListTeams = this.state.teamData.teams.map((teams) => (
      <TeamListItem
        key={teams.idTeam}
        idTeam={teams.idTeam}
        imgSrc={teams.strTeamBadge}
        team={teams.strTeam}
        isFavorited={this.state.favoritedTeams.includes(teams.idTeam)}
        onFavoriteToggle={() => this.handleFavorite(teams.idTeam)}
      />
    ));
    return (
      <Grommet>
        <Box alignSelf="center" pad="small">
          <Grid rows="small" columns={{ count: 'fit', size: 'small' }} gap="medium">
            { ListTeams }
          </Grid>
        </Box>
      </Grommet>
    );
  }
}

export default Team;
