/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const Chat = require('../models/chat.model');

const global = '6098f15c0fff456a1458073f';

router.get('/get/:chatroomID', async (req, res) => {
  let chatroom = req.params.chatroomID;
  if (chatroom === 'global') {
    chatroom = global;
  }
  Chat.findOne({ _id: chatroom })
    .then((data) => res.json(data))
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

router.get('/getAllChatrooms', async (req, res) => {
  Chat.find({})
    .then((data) => {
      const filteredData = data.filter((ch) => ch._id.toString() !== global);
      res.json(filteredData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

router.post('/post/:chatroomID', async (req, res) => {
  let chatroom = req.params.chatroomID;
  if (chatroom === 'global') {
    chatroom = global;
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

router.post('/', async (req, res) => {
  Chat.create(req.body)
    .then((data) => res.json(data._id))
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

// todo:create chatroom id

module.exports = router;
