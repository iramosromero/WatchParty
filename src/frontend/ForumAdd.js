/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Button, Grid, Box, TextInput, TextArea,
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
      <Box height="90%" width="90%">
        <Grid
          rows={['xsmall', 'xlarge', 'xsmall']}
          areas={[
            ['title'],
            ['message'],
            ['button'],
          ]}
          gap="small"
        >
          <Box gridArea="title">
            <TextInput placeholder="title" onChange={(e) => this.handleTitleChange(e)} />
          </Box>
          <Box gridArea="message" overflow="scroll">
            <TextArea placeholder="text" onChange={(e) => this.handleTextChange(e)} />
          </Box>
          <Box gridArea="button" direction="row">
            <Button onClick={() => this.handleSubmit()}> Submit </Button>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default ForumAdd;
