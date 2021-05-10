/* eslint-disable global-require */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable dot-notation */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { Button, ButtonToolbar, Dropdown } from 'rsuite';
import {
  Select, Card, CardHeader, Grid, Box,
} from 'grommet';

import './home.css';
import thesportsdb from 'thesportsdb';
import TeamImg from './TeamImg';

const authFetch = require('./authFetch');

class Home extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
    const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const date = today.getFullYear() + '-' + month + '-' + day;
    console.log(date);
    this.state = {
      LatestScoreData: { events: [] },
      Sport: 'NBA',
      isDropdown: false,
      useless: '',
      today: date,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setValue = this.setValue.bind(this);
    this.theSportsDB = require('thesportsdb');
  }

  componentDidMount() {
    thesportsdb.setApiKey(40130162);
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/40130162/eventsday.php?d=${this.state.today}&l=English_Premier_League`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // this.setState({ LatestScoreData: data });
        console.log(data);
      });
    thesportsdb.getTeamDetailsById('133612')
      .then((data) => {
        console.log(data);
      });
  }

  setValue(option) {
    console.log(option);
    this.setState({ Sport: option });
    const sports = option;
    let hook = '';
    if (sports === 'NBA') {
      hook = 'l=NBA';
    } else if (sports === 'EPL') {
      hook = 'l=English_Premier_League';
    } else if (sports === 'NHL') {
      hook = 'l=NHL';
    } else if (sports === 'MLB') {
      hook = 'l=MLB';
    }
    if (sports !== 'Favorites') {
      const apiUrl = `https://www.thesportsdb.com/api/v1/json/40130162/eventsday.php?d=${this.state.today}&${hook}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ LatestScoreData: data });
        });
    } else {
      const teamThis = this;
      this.setState({ LatestScoreData: { events: [] } });
      authFetch('/team/myFavoriteTeams')
        .then((data) => {
          for (let i = 0; i < data.length; i += 1) {
            const apiUrl = `https://www.thesportsdb.com/api/v1/json/40130162/eventsnext.php?id=${data[i]}`;
            fetch(apiUrl)
              .then((response) => response.json())
              .then((favData) => {
                const favStorage = teamThis.state.LatestScoreData.events;
                favStorage.push(favData.events[0]);
                teamThis.setState({ LatestScoreData: { events: favStorage } });
              });
          }
        });
    }
  }

  toggleDropdown() {
    if (this.state.isDropdown === true) {
      this.setState({ isDropdown: false });
    } else {
      this.setState({ isDropdown: true });
    }
    console.log(this.state.isDropdown);
  }

  render() {
    console.log(JSON.stringify(this.state.LatestScoreData.events[0]));
    const ListItem = this.state.LatestScoreData.events.map((games) => (
      <Card key={games.idEvent} style={{ display: 'inline-block', margin: '2%' }} animation="fadeIn" height="small" width="medium" pad="small" background="light-1">
        <CardHeader justify="center" pad="small">{games.dateEvent}</CardHeader>
        <CardHeader justify="center" pad="small">
          {games.strStatus}
        </CardHeader>
        <Grid
          columns={['1/2', '1/2']}
          gap="small"
        >
          <TeamImg start="start" teamID={games.idAwayTeam} />
          <TeamImg end="end" teamID={games.idHomeTeam} />
        </Grid>
        <Grid
          columns={{
            count: 2,
            size: 'auto',
          }}
          gap="small"
        >
          <Box align="start">{games.strAwayTeam}</Box>
          <Box align="end">{games.strHomeTeam}</Box>
        </Grid>
        <Grid
          columns={{
            count: 2,
            size: 'auto',
          }}
          gap="small"
        >
          <Box>{games.intAwayScore}</Box>
          <Box align="end">{games.intHomeScore}</Box>
        </Grid>
      </Card>
    ));
    return (
      <div>
        <div>
          <div className="centered">
            <Select
              options={['Favorites', 'NBA', 'EPL', 'MLB', 'NHL']}
              value={this.state.Sport}
              onChange={({ option }) => this.setValue(option)}
            />
          </div>
          {ListItem}
        </div>
      </div>
    );
  }
}

export default Home;
