const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.body.profilePicture
  });

  await newUser.findOne({ email: newUser.email }).then((user) => {
    if (user) {
      res.status(400).send("Email already exists");
    } else {
      newUser.save();
      res.status(200).send(newUser);
    }
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;