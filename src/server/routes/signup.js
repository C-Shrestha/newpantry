const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bodyParser = require('body-parser').json();

router.post('/', bodyParser, async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture
  }); 

  await newUser.save().then(() => {
    res.status(200).send(newUser);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;