/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Grid, Box, Text, Button, TextArea,
} from 'grommet';
import { Send } from 'grommet-icons';

const authFetch = require('./authFetch');

const queryString = window.location.pathname.split('/').pop();

class ForumPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatText: '',
      localUsername: '',
      owner: '',
      title: '',
      msgs: [{ msg: 'loading...', sentBy: '', sentAt: '' }],
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  componentDidMount() {
    setInterval(this.updateMessages, 1000);
    authFetch('/users/find')
      .then((data) => this.setState({ localUsername: data }))
      .catch((error) => console.log(error));

    authFetch(`/chat/get/${queryString}`)
      .then((data) => {
        console.log(data.roomTitle);
        this.setState({ msgs: data.msg, title: data.roomTitle, owner: data.owner });
      })
      .catch((error) => console.log(error));
  }

  handleTextChange(e) {
    this.setState({ chatText: e.target.value });
  }

  handleButtonPress() {
    const { chatText, localUsername } = this.state;
    authFetch(`/chat/post/${queryString}`, 'POST', { msg: chatText, sentBy: localUsername, sentAt: new Date() })
      .then((data) => {
        this.setState({ msgs: data.msg, chatText: '' });
        document.getElementById('scrollable').scrollTop = document.getElementById('scrollable').scrollHeight;
      })
      .catch((error) => console.log(error));
  }

  updateMessages() {
    const { msgs } = this.state;
    authFetch(`/chat/get/${queryString}`)
      .then((data) => {
        console.log(data.msg);
        if (msgs.length === 0
          || msgs[msgs.length - 1].sentAt !== data.msg[data.msg.length - 1].sentAt) {
          this.setState({ msgs: data.msg, chatText: '' });
          document.getElementById('scrollable').scrollTop = document.getElementById('scrollable').scrollHeight;
        }
      });
  }

  render() {
    const {
      title, localUsername, msgs, chatText, owner,
    } = this.state;
    console.log(msgs);
    const msgList = msgs.slice(1).map((mes, index) => (
      <div key={index} style={{ marginBottom: 15 }}>
        <div>
          {(new Date(mes.sentAt)).toLocaleString()}
        </div>
        <div>
          {mes.sentBy}
        </div>
        <div>
          {mes.msg}
        </div>
      </div>
    ));
    return (
      <Box>
        <Box animation="fadeIn" border={{ color: '#964F4C', size: 'medium' }} margin="small" gap="none">
          <Grid
            rows={['xxsmall', 'auto', 'xxsmall']}
            areas={[
              ['title'],
              ['message'],
              ['button'],
            ]}
          >
            <Box gridArea="title" background="#567572" pad="small">
              <h1>
                {title}
              </h1>
            </Box>
            <Box style={{ minHeight: '200px' }} gridArea="message" overflow="hidden">
              {msgs[0].msg}
            </Box>
            <Box gridArea="button" direction="column" background="#567572">
              <Text style={{ paddingBottom: '3px', paddingLeft: '5px' }}>{'Author: ' + owner}</Text>
            </Box>
          </Grid>
        </Box>
        <Box margin="small" border={{ color: '#567572', size: 'medium' }}>
          <Box style={{ background: 'linear-gradient(90deg, #964F4CFF 0%, #567572FF 100%)' }} direction="row">
            <TextArea placeholder="comment" value={chatText} onChange={(e) => this.handleTextChange(e)} />
            <Button color="#964F4CFF" primary disabled={localUsername === '' || chatText === ''} onClick={() => this.handleButtonPress()}>
              <Text color="white">send</Text>
              <Send color="white" />
            </Button>
          </Box>
          <Box height="medium" id="scrollable" background="light-2" overflow="scroll">
            {msgList}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ForumPost;
