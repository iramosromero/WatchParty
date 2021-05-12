/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Button, Grid, Grommet, RoutedButton, Text, Box,
} from 'grommet';
import { AddCircle } from 'grommet-icons';

const authFetch = require('./authFetch');

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localUsername: '',
      Fmsgs: [],
    };
  }

  componentDidMount() {
    authFetch('/users/find')
      .then((data) => this.setState({ localUsername: data }))
      .catch((error) => console.log(error));

    authFetch('/chat/getAllChatrooms')
      .then((data) => {
        console.log(data);
        this.setState({ Fmsgs: data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { Fmsgs, localUsername } = this.state;
    console.log(Fmsgs);
    const forumL = Fmsgs.map((Fmes, value) => (
      <Box key={value} border={{ color: 'accent-2', size: 'large' }} gap="medium">
        <Grid
          rows={['xxsmall', 'small', 'xxsmall']}
          areas={[
            ['title'],
            ['message'],
            ['button'],
          ]}
          gap="small"
        >
          <Box gridArea="title" background="brand">
            {Fmes.roomTitle}
          </Box>
          <Box gridArea="message" overflow="hidden">
            {Fmes.msg[0].msg}
          </Box>
          <Box gridArea="button" direction="row" background="accent-3">
            <Text>{localUsername}</Text>
            <Box width="small">
              <RoutedButton size="small" primary label="Read More" path={`/Forum/${Fmes._id}`} />
            </Box>
          </Box>
        </Grid>
      </Box>
    ));

    return (
      <Grommet>
        <Grid
          rows={['xxsmall', 'large']}
          areas={[
            ['main', 'main'],
            ['footer', 'footer'],
          ]}
        >
          <Box gridArea="main">
            <Button onClick={() => { window.location.href = '/addForum'; }}>
              <AddCircle />
            </Button>
          </Box>

          <Box gridArea="footer">
            {forumL}
          </Box>
        </Grid>
      </Grommet>
    );
  }
}

export default Forum;
