/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Button, Grid, Box, TextInput, TextArea, Text,
} from 'grommet';

const authFetch = require('./authFetch');

class ForumAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Ftitle: '',
      Ftext: '',
      localUsername: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    authFetch('/users/find')
      .then((data) => this.setState({ localUsername: data }))
      .catch((error) => console.log(error));
  }

  handleTitleChange(e) {
    console.log('TITLE: ' + e.target.value);
    this.setState({ Ftitle: e.target.value });
  }

  handleTextChange(e) {
    console.log('TEXT: ' + e.target.value);
    this.setState({ Ftext: e.target.value });
  }

  handleSubmit() {
    const { Ftitle, Ftext, localUsername } = this.state;
    authFetch('/chat/', 'POST', { roomTitle: Ftitle, msg: [{ msg: Ftext, sentAt: new Date(), sentBy: localUsername }], owner: localUsername })
      .then((data) => { window.location.href = `/Forum/${data}`; })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { Ftitle, Ftext } = this.state;
    console.log(Ftitle);
    console.log(Ftext);
    return (
      <Box>
        <Box border={{ color: '#964F4C', size: 'medium' }} elevation="xlarge" margin="small" gap="medium">
          <Grid
            rows={['xxsmall', 'medium']}
            areas={[
              ['title'],
              ['message'],
            ]}
            gap="none"
          >
            <Box
              border={{
                color: '#964F4C',
                size: 'medium',
                style: 'dashed',
                side: 'bottom',
              }}
              gridArea="title"
            >
              <TextInput placeholder="title" onChange={(e) => this.handleTitleChange(e)} />
            </Box>
            <Box gridArea="message" overflow="scroll">
              <TextArea resize="vertical" size="medium" placeholder="text" onChange={(e) => this.handleTextChange(e)} />
            </Box>
          </Grid>
        </Box>
        <Box>
          <Box pad="small" direction="row" alignSelf="center" gap="small">
            <Button primary color="#567572" onClick={() => this.handleSubmit()}>
              <Box pad="small" direction="column" alignSelf="center" gap="small">
                <Text color="white"> Submit </Text>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ForumAdd;
