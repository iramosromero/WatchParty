/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const config = require('config');
const router = require('express').Router();
const Chat = require('../models/chat.model');

router.get('/:chatroomID', async (req, res) => {
  let chatroom = req.params.chatroomID;
  if (chatroom === 'global') {
    chatroom = '6098f15c0fff456a1458073f';
  }
  Chat.findOne({ _id: chatroom })
    .then((data) => res.json(data))
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

router.post('/:chatroomID', async (req, res) => {
  let chatroom = req.params.chatroomID;
  if (chatroom === 'global') {
    chatroom = '6098f15c0fff456a1458073f';
  }
  Chat.findOne({ _id: chatroom })
    .then((data) => {
      data.msg.push(req.body);
      data.save()
        .then(() => {
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send();
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

// todo:create chatroom id

module.exports = router;
