const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { authToken } = require('../utils/jwtUtils');

router.get('/', authToken, async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(200).send(user.pantryIngredients);
    } else {
      res.status(404).send("Invalid email");
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.post('/', authToken, async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      if (user.pantryIngredients.includes(req.body.ingredient)) {
        user.pantryIngredients.splice(user.pantryIngredients.indexOf(req.body.ingredient), 1);
      } else {
        user.pantryIngredients.push(req.body.ingredient);
      }

      user.save();
      res.status(200).send(user);
    } else {
      res.status(404).send("Invalid email");
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;