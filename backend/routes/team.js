// const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user.model');

router.get('/myFavoriteTeams', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    res.json(user.favoritedTeams);
  } else {
    res.status(401).send();
  }
});

router.put('/myFavoriteTeams', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    user.favoritedTeams.push(req.body.idTeam);
    await user.save();
    res.status(201).send();
  } else {
    res.status(401).send();
  }
});

router.delete('/myFavoriteTeams', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const { favoritedTeams } = user;
    const index = favoritedTeams.indexOf(req.body.idTeam);
    if (index !== -1) {
      favoritedTeams.splice(index, 1);
    }
    user.favoritedTeams = favoritedTeams;
    await user.save();
    res.status(201).send();
  } else {
    res.status(401).send();
  }
});

module.exports = router;
