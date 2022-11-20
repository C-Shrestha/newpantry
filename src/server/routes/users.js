const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("Could not find user: " + err);
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.delete('/', async (req, res) => {
  await User.deleteOne({ email: req.body.email }).then((user) => {
    res.status(200).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  })
})

module.exports = router;