/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Grommet, Box, Text, Image, Grid, Card,
} from 'grommet';
import './home.css';

const data = require('./LeagueDetails.json');

const leagueSelected = (league) => {
  window.location.href = `/Team/${league}`;
};
class Sport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LeaguesData: data,
    };
  }

  render() {
    const ListLeagues = this.state.LeaguesData.Leagues.map((leagues) => (
      <Card
        key={leagues.idLeague}
        justify="center"
        align="center"
        pad="small"
        border
        round
        gap="medium"
        width="medium"
        hoverIndicator={{
          background: {
            color: 'background-contrast',
          },
          elevation: 'medium',
        }}
        onClick={() => {
          leagueSelected(leagues.strLeague);
        }}
      >
        <Box height="small" width="xsmall">
          <Image
            alignSelf="center"
            fit="cover"
            src={leagues.strBadge}
          />
        </Box>
        <Text>{leagues.strLeague}</Text>
      </Card>
    ));
    return (
      <div>
        <Grommet>
          <Box alignSelf="center" pad="small">
            <Grid rows="small" columns={{ count: 'fit', size: 'small' }} gap="medium">
              {ListLeagues}
            </Grid>
          </Box>
        </Grommet>
      </div>
    );
  }
}

export default Sport;
