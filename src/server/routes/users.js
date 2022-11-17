const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  await User.find({ email: req.body.email }).then((users) => {
    res.status(200).send(users);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.delete('/', async (req, res) => {
  await User.deleteOne({ email: req.body.email }).then((user) => {
    res.status(200).send(user);
  }).catch((err) => {
    res.status(400).send("Could not find user");
  })
})

module.exports = router;