/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/find', async (req, res) => {
  const token = await jwt.verify(req.headers['x-auth-token'], config.get('PrivateKey'));
  const user = await User.findOne({ _id: token });
  if (user) {
    res.json(user.firstname);
  } else {
    res.status(401).send();
  }
});

router.route('/add').post(async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  // Check if this user already exisits
  let user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (user) {
    return res.status(400).send('That user already exisits!');
  }
  user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save()
    .then(() => res.json('User has been added! '))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
