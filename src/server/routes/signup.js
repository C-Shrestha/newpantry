const express = require('express');
const router = express.Router();

const User = require('../models/user');
const { verifyEmail, sendConfirmationEmail } = require('../utils/emailUtils');
const { genToken } = require('../utils/jwtUtils');

router.post('/', async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).send('User already exists');
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        confirmToken: genToken({ email: req.body.email }, process.env.CONF_JWT_SECRET),
        valid: false
      });
      newUser.save().then((user) => {
        sendConfirmationEmail(newUser.email, genToken({ email: newUser.email }, process.env.CONF_JWT_SECRET));
        res.status(200).send("User created - please confirm new user's email address");
      }).catch((err) => {
        res.status(400).send("Failed to create user: " + err);
      });
    }
  }).catch((err) => {
    res.status(400).send("Could not search for user: " + err);
  });
});

module.exports = router;