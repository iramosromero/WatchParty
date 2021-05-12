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
      <Box border={{ color: 'accent-2', size: 'large' }} gap="medium">
        <Grid
          rows={['xxsmall', 'small', 'xxsmall', 'small', 'small']}
          areas={[
            ['title'],
            ['message'],
            ['button'],
            ['text'],
            ['comment'],
          ]}
          gap="small"
        >
          <Box gridArea="title" background="brand">
            {title}
          </Box>
          <Box gridArea="message" overflow="hidden">
            {msgs[0].msg}
          </Box>
          <Box gridArea="button" direction="row" background="accent-3">
            <Text>{owner}</Text>
          </Box>
          <Box style={{ background: 'linear-gradient(90deg, #964F4CFF 0%, #567572FF 100%)' }} gridArea="text" direction="row">
            <TextArea placeholder="comment" value={chatText} onChange={(e) => this.handleTextChange(e)} />
            <Button disabled={localUsername === '' || chatText === ''} onClick={() => this.handleButtonPress()}>
              send
              <Send />
            </Button>
          </Box>
          <Box id="scrollable" background="light-2" gridArea="comment" overflow="scroll">
            {msgList}
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default ForumPost;
