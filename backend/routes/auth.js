/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user.model');

router.post('/signin', async (req, res) => {
  console.log(req.body.password);
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).send('Incorrect email or password.');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).send('Incorrect email or password');
  }
  const token = jwt.sign({ _id: user.id }, config.get('PrivateKey'));
  res.send(token);
});

module.exports = router;
