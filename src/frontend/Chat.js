/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Grommet, TextArea, Button, Box, Grid, Text,
} from 'grommet';
import { Send } from 'grommet-icons';

const authFetch = require('./authFetch');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatText: '',
      localUsername: '',
      msgs: [],
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
  }

  handleTextChange(e) {
    this.setState({ chatText: e.target.value });
  }

  handleButtonPress() {
    const { chatText, localUsername } = this.state;
    authFetch('/chat/post/global', 'POST', { msg: chatText, sentBy: localUsername, sentAt: new Date() })
      .then((data) => {
        this.setState({ msgs: data.msg, chatText: '' });
        document.getElementById('scrollable').scrollTop = document.getElementById('scrollable').scrollHeight;
      })
      .catch((error) => console.log(error));
  }

  updateMessages() {
    const { msgs } = this.state;
    authFetch('/chat/get/global')
      .then((data) => {
        if (msgs.length === 0
          || msgs[msgs.length - 1].sentAt !== data.msg[data.msg.length - 1].sentAt) {
          this.setState({ msgs: data.msg, chatText: '' });
          document.getElementById('scrollable').scrollTop = document.getElementById('scrollable').scrollHeight;
        }
      });
  }

  render() {
    const { chatText, localUsername, msgs } = this.state;
    console.log(msgs);
    const msgList = msgs.map((mes, index) => (
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
    console.log(chatText);
    return (
      <Grommet>
        <Grid
          rows={['600px', 'xsmall']}
          areas={[
            ['main', 'main'],
            ['footer', 'footer'],
          ]}
        >

          <Box pad="small" id="scrollable" background="light-2" gridArea="main" overflow="scroll">
            {msgList}
          </Box>

          <Box style={{ background: 'linear-gradient(90deg, #964F4CFF 0%, #567572FF 100%)' }} gridArea="footer" direction="row">
            <TextArea placeholder="What's up?" value={chatText} onChange={(e) => this.handleTextChange(e)} />
            <Button style={{ padding: '2px' }} disabled={localUsername === '' || chatText === ''} onClick={() => this.handleButtonPress()}>
              <Text color="white">send</Text>
              <Send color="white" />
            </Button>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}

export default Chat;
