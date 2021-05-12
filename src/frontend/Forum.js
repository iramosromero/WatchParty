/* eslint-disable prefer-template */
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
      Fmsgs: [],
    };
  }

  componentDidMount() {
    authFetch('/chat/getAllChatrooms')
      .then((data) => {
        console.log(data);
        this.setState({ Fmsgs: data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { Fmsgs } = this.state;
    console.log(Fmsgs);
    const forumL = Fmsgs.map((Fmes, value) => (
      <Box key={value} border={{ color: '#964F4C', size: 'medium' }} elevation="xlarge" margin="small" gap="medium">
        <Grid
          rows={['xxsmall', 'xsmall', 'xxsmall']}
          areas={[
            ['title'],
            ['message'],
            ['button'],
          ]}
          gap="small"
        >
          <Box gridArea="title" background="#567572" pad="small">
            <h1>
              {Fmes.roomTitle}
            </h1>
          </Box>
          <Box gridArea="message" overflow="hidden" flex="shrink" style={{ paddingRight: '5px', paddingLeft: '5px' }}>
            {Fmes.msg[0].msg}
          </Box>
          <Box gridArea="button" direction="column" background="#964F4C" flex="shrink">
            <Box elevation="medium" width="small" background="accent-1" margin="small" alignSelf="end">
              <RoutedButton color="white" alignSelf="center" primary path={`/Forum/${Fmes._id}`}>
                <Box direction="row" align="center">
                  <Text style={{ padding: '5px' }} color="#964F4C">Read More</Text>
                </Box>
              </RoutedButton>
            </Box>
            <Text color="white" style={{ paddingBottom: '5px', paddingLeft: '5px' }}>{'Author: ' + Fmes.msg[0].sentBy}</Text>
          </Box>
        </Grid>
      </Box>
    ));

    return (
      <Grommet>
        <Grid
          rows={['xxsmall', 'auto']}
          areas={[
            ['main', 'main'],
            ['footer', 'footer'],
          ]}
        >
          <Box gridArea="main">
            <Button style={{ marginTop: '5px' }} color="#195F8A" alignSelf="center" size="small" onClick={() => { window.location.href = '/addForum'; }}>
              <Box pad="small" direction="row" align="center" gap="small">
                <AddCircle color="#567572" />
                <Text color="#567572"> New Post </Text>
              </Box>
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
