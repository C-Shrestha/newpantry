const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { authToken } = require('../utils/authJWT');

router.get('/', authToken, async(req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(200).send(user.favoriteRecipes);
    } else {
      res.status(400).send("Invalid email");
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.post('/', authToken, async(req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user.favoriteRecipes.includes(req.body.favorite)) {
      user.favoriteRecipes.splice(user.favoriteRecipes.indexOf(req.body.favorite), 1);
    } else {
      user.favoriteRecipes.push(req.body.favorite);
    }

    user.save();
    res.status(200).send(user.favoriteRecipes);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;